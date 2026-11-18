-- =====================================================================
-- SENSITOR, application schema (apply this file in the Supabase SQL editor)
--
-- Everything a signed-in user owns lives here, protected by Row Level
-- Security: a user can only read and write their own rows. Research content
-- and market data are not stored in the database in this version.
-- Safe to re-run: objects are created only if missing.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Profiles (one per auth user, created automatically on sign-up)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 80),
  tier text not null default 'free' check (tier in ('free', 'pro', 'research_club')),
  locale text not null default 'en' check (locale in ('en', 'fr')),
  email_alerts boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles for select using (id = auth.uid());
drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- Users may change their preferences, never their subscription tier
-- (tier is written by the billing webhook with the service role).
revoke update on public.profiles from authenticated;
grant update (display_name, locale, email_alerts) on public.profiles to authenticated;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users created before this migration
insert into public.profiles (id) select id from auth.users on conflict (id) do nothing;

create or replace function public.current_tier() returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select tier from public.profiles where id = auth.uid()), 'free');
$$;

-- ---------------------------------------------------------------------
-- Watchlist
-- ---------------------------------------------------------------------
create table if not exists public.watchlist_items (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_slug text not null check (project_slug ~ '^[a-z0-9-]{1,64}$'),
  added_at timestamptz not null default now(),
  primary key (user_id, project_slug)
);

alter table public.watchlist_items enable row level security;
drop policy if exists "watchlist: own rows" on public.watchlist_items;
create policy "watchlist: own rows" on public.watchlist_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Free plan: 10 projects
create or replace function public.enforce_watchlist_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select tier from public.profiles where id = new.user_id) = 'free'
     and (select count(*) from public.watchlist_items where user_id = new.user_id) >= 10 then
    raise exception 'Free plan watchlists are limited to 10 projects' using errcode = 'P0001';
  end if;
  return new;
end;
$$;
drop trigger if exists watchlist_limit on public.watchlist_items;
create trigger watchlist_limit before insert on public.watchlist_items
  for each row execute function public.enforce_watchlist_limit();

-- ---------------------------------------------------------------------
-- Portfolio ledger (never any key, seed phrase or exchange credential)
-- ---------------------------------------------------------------------
create table if not exists public.portfolio_transactions (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  trade_date date not null,
  asset text not null check (asset ~ '^[a-z0-9-]{1,64}$'),
  side text not null check (side in ('buy', 'sell')),
  quantity numeric not null check (quantity > 0),
  price numeric not null check (price >= 0),
  fee numeric not null default 0 check (fee >= 0),
  created_at timestamptz not null default now()
);
create index if not exists portfolio_transactions_user_idx on public.portfolio_transactions (user_id, trade_date);

alter table public.portfolio_transactions enable row level security;
drop policy if exists "portfolio: own rows" on public.portfolio_transactions;
create policy "portfolio: own rows" on public.portfolio_transactions for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- Price alerts and notifications
-- ---------------------------------------------------------------------
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_slug text not null check (project_slug ~ '^[a-z0-9-]{1,64}$'),
  kind text not null check (kind in ('price_above', 'price_below', 'move_24h')),
  threshold numeric not null check (threshold > 0),
  active boolean not null default true,
  triggered_at timestamptz,
  triggered_value numeric,
  created_at timestamptz not null default now()
);
create index if not exists alerts_active_idx on public.alerts (active) where active;

alter table public.alerts enable row level security;
drop policy if exists "alerts: own rows" on public.alerts;
create policy "alerts: own rows" on public.alerts for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.enforce_alert_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.alerts where user_id = new.user_id and active) >= case when public.current_tier() = 'free' then 5 else 50 end then
    raise exception 'Active alert limit reached for your plan' using errcode = 'P0001';
  end if;
  return new;
end;
$$;
drop trigger if exists alert_limit on public.alerts;
create trigger alert_limit before insert on public.alerts
  for each row execute function public.enforce_alert_limit();

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text not null,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;
drop policy if exists "notifications: read own" on public.notifications;
create policy "notifications: read own" on public.notifications for select using (user_id = auth.uid());
drop policy if exists "notifications: mark own read" on public.notifications;
create policy "notifications: mark own read" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "notifications: delete own" on public.notifications;
create policy "notifications: delete own" on public.notifications for delete using (user_id = auth.uid());
-- Inserts come from the alerts job (service role) only.
revoke insert, update on public.notifications from authenticated;
grant update (read_at) on public.notifications to authenticated;

-- ---------------------------------------------------------------------
-- Research Copilot usage (daily quotas)
-- ---------------------------------------------------------------------
create table if not exists public.copilot_usage (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mode text not null check (mode in ('learn', 'analyze', 'compare')),
  created_at timestamptz not null default now()
);
create index if not exists copilot_usage_user_idx on public.copilot_usage (user_id, created_at desc);

alter table public.copilot_usage enable row level security;
drop policy if exists "copilot: read own" on public.copilot_usage;
create policy "copilot: read own" on public.copilot_usage for select using (user_id = auth.uid());
drop policy if exists "copilot: insert own" on public.copilot_usage;
create policy "copilot: insert own" on public.copilot_usage for insert with check (user_id = auth.uid());

create or replace function public.copilot_usage_today() returns integer
language sql stable security definer set search_path = public as $$
  select count(*)::int from public.copilot_usage
  where user_id = auth.uid() and created_at >= date_trunc('day', now() at time zone 'utc') at time zone 'utc';
$$;
