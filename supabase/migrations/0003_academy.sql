-- =====================================================================
-- SENSITOR, Academy progress synced to the account
--
-- Apply once in the Supabase SQL editor, after 0001_app.sql.
-- Safe to re-run: objects are created only if missing.
-- One row per lesson whose quiz the user has taken, holding the best result.
-- Until this file is applied, progress simply stays in the browser.
-- =====================================================================

create table if not exists public.academy_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  concept_slug text not null check (concept_slug ~ '^[a-z0-9-]{1,80}$'),
  score smallint not null check (score >= 0),
  total smallint not null check (total between 1 and 20),
  achieved_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, concept_slug),
  check (score <= total)
);

alter table public.academy_progress enable row level security;
drop policy if exists "academy: own rows" on public.academy_progress;
create policy "academy: own rows" on public.academy_progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- A result never goes down: two devices can sync in any order, the best score wins.
create or replace function public.academy_keep_best() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.score::numeric / new.total < old.score::numeric / old.total
     or (new.score::numeric / new.total = old.score::numeric / old.total and new.score <= old.score) then
    return old;
  end if;
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists academy_keep_best on public.academy_progress;
create trigger academy_keep_best before update on public.academy_progress
  for each row execute function public.academy_keep_best();

-- Privileges (explicit, as in 0001). Row Level Security still filters every row.
revoke all on public.academy_progress from anon;
grant all on public.academy_progress to service_role;
grant select, insert, update, delete on public.academy_progress to authenticated;
