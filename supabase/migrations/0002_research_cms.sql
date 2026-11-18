-- =====================================================================
-- SENSITOR, research CMS data model (optional, Phase 2+)
-- Not required by the current app: research content still lives in
-- src/content. Apply when moving dossiers to an editorial back-office.
-- The private user tables below duplicate concepts from 0001_app.sql and
-- are kept for reference only; do not apply this file as is on top of 0001.
--
-- Two strictly separated domains:
--   1. PUBLIC research & market data  → readable by everyone, writable only
--      by the service role (editorial back-office / ingestion jobs).
--   2. PRIVATE user data               → Row Level Security: a user can only
--      ever read or write their own rows.
--
-- In the MVP, research content lives in versioned TypeScript files
-- (src/content). These tables are the target for Phase 2, when content moves
-- to an editorial CMS backed by Postgres. Market data is never stored as
-- "truth": snapshots keep provider + timestamp provenance.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
create type plan_tier as enum ('free', 'pro', 'research_club');
create type subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'incomplete');
create type claim_kind as enum ('fact', 'interpretation', 'hypothesis');
create type confidence_level as enum ('high', 'medium', 'low');
create type risk_level as enum ('lower', 'moderate', 'elevated', 'high');
create type editorial_status as enum ('draft', 'in_review', 'reviewed', 'archived');
create type source_type as enum ('primary', 'documentation', 'data', 'research', 'governance');
create type relationship_type as enum ('built_on', 'uses_oracle', 'competitor', 'dependency', 'partnership', 'ecosystem');
create type transaction_side as enum ('buy', 'sell', 'transfer_in', 'transfer_out', 'reward', 'fee');

-- ---------------------------------------------------------------------
-- Reference data (public)
-- ---------------------------------------------------------------------
create table sectors (
  id text primary key,                 -- e.g. 'layer-1', 'defi'
  label text not null,
  description text not null default ''
);

create table blockchains (
  id text primary key,                 -- e.g. 'ethereum'
  label text not null
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  ticker text not null,
  one_liner text not null default '',
  sector_id text not null references sectors(id),
  launched_on date,
  maturity text not null check (maturity in ('established', 'growth', 'early')),
  risk_level risk_level not null,
  accent_color text,
  logo_path text,
  website_url text,
  whitepaper_url text,
  docs_url text,
  github_url text,
  explorer_url text,
  coingecko_id text unique,
  coinpaprika_id text,
  llama_protocol text,
  llama_chain text,
  llama_fees text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_blockchains (
  project_id uuid references projects(id) on delete cascade,
  blockchain_id text references blockchains(id),
  is_primary boolean not null default false,
  primary key (project_id, blockchain_id)
);

-- Tradable assets (a project can have several, e.g. stETH vs LDO)
create table assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  symbol text not null,
  name text not null,
  coingecko_id text unique,
  max_supply numeric,
  created_at timestamptz not null default now()
);

create table protocol_relationships (
  id uuid primary key default gen_random_uuid(),
  from_project_id uuid not null references projects(id) on delete cascade,
  to_project_id uuid not null references projects(id) on delete cascade,
  kind relationship_type not null,
  note text,
  source_id uuid,                      -- references research_sources(id), set after insert
  verified boolean not null default false,
  unique (from_project_id, to_project_id, kind)
);

-- ---------------------------------------------------------------------
-- Research (public, editorially controlled)
-- ---------------------------------------------------------------------
create table research_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  version text not null,
  status editorial_status not null default 'draft',
  summary text not null,
  author text not null,
  reviewer text,
  access_tier plan_tier not null default 'free',   -- gating for Pro / Research Club content
  published_at timestamptz,
  last_updated date not null,
  body jsonb not null,                 -- structured dossier (sections A-I), see src/lib/research/types.ts
  created_at timestamptz not null default now(),
  unique (project_id, version)
);

create table research_sources (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references research_reports(id) on delete cascade,
  key text not null,                   -- stable id referenced from claims
  title text not null,
  publisher text not null,
  url text not null check (url like 'https://%'),
  type source_type not null,
  published text,
  last_checked date not null,
  supports text not null,
  reliability confidence_level not null,
  limitations text,
  unique (report_id, key)
);

alter table protocol_relationships
  add constraint protocol_relationships_source_fk foreign key (source_id) references research_sources(id) on delete set null;

create table research_claims (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references research_reports(id) on delete cascade,
  section text not null,               -- 'overview.problem', 'risks.regulatory', ...
  position int not null,
  kind claim_kind not null,
  text text not null,
  source_keys text[] not null default '{}'
);

create table framework_assessments (
  report_id uuid not null references research_reports(id) on delete cascade,
  pillar text not null check (pillar in ('technology','tokenomics','adoption','financials','governance','competition','risk')),
  rating smallint check (rating between 1 and 5),   -- null = not rated
  confidence confidence_level not null,
  summary text not null,
  data_used text[] not null default '{}',
  limitations text not null,
  source_keys text[] not null default '{}',
  primary key (report_id, pillar)
);

create table tokenomics_metrics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  label text not null,                 -- allocation bucket or schedule item
  pct numeric check (pct >= 0 and pct <= 100),
  note text,
  source_id uuid references research_sources(id) on delete set null
);

-- ---------------------------------------------------------------------
-- Market & on-chain snapshots (public, written by ingestion jobs)
-- ---------------------------------------------------------------------
create table market_snapshots (
  id bigint generated always as identity primary key,
  asset_id uuid references assets(id) on delete cascade,  -- null = global market
  observed_at timestamptz not null,
  provider text not null,              -- 'coingecko' | 'coinpaprika' | 'defillama' ...
  price_usd numeric,
  market_cap_usd numeric,
  fdv_usd numeric,
  volume_24h_usd numeric,
  circulating_supply numeric,
  total_market_cap_usd numeric,        -- for global rows
  btc_dominance numeric,
  unique (asset_id, provider, observed_at)
);
create index on market_snapshots (asset_id, observed_at desc);

create table onchain_metrics (
  id bigint generated always as identity primary key,
  project_id uuid not null references projects(id) on delete cascade,
  metric text not null,                -- 'tvl', 'fees_24h', 'revenue_24h', 'active_addresses'...
  value numeric not null,
  observed_at timestamptz not null,
  provider text not null,
  unique (project_id, metric, provider, observed_at)
);
create index on onchain_metrics (project_id, metric, observed_at desc);

-- ---------------------------------------------------------------------
-- Academy (public content)
-- ---------------------------------------------------------------------
create table academy_courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  access_tier plan_tier not null default 'free',
  position int not null default 0
);

create table academy_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references academy_courses(id) on delete cascade,
  slug text not null,
  title text not null,
  body jsonb not null,
  position int not null,
  concept_slugs text[] not null default '{}',  -- "Learn by Research" links
  unique (course_id, slug)
);

-- ---------------------------------------------------------------------
-- Private user data (RLS)
-- ---------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier plan_tier not null default 'free',
  status subscription_status not null,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table watchlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Watchlist',
  created_at timestamptz not null default now()
);

create table watchlist_items (
  watchlist_id uuid not null references watchlists(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (watchlist_id, project_id)
);

create table portfolio_positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_id uuid not null references assets(id),
  quantity numeric not null check (quantity >= 0),
  average_cost_usd numeric check (average_cost_usd >= 0),
  updated_at timestamptz not null default now(),
  unique (user_id, asset_id)
);

create table portfolio_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_id uuid not null references assets(id),
  side transaction_side not null,
  quantity numeric not null check (quantity > 0),
  price_usd numeric,
  fee_usd numeric,
  executed_at timestamptz not null,
  import_batch text,                   -- CSV import id
  note text
);

-- Read-only exchange / wallet connections. NEVER store private keys or seed phrases.
create table wallet_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('address', 'exchange_readonly')),
  label text,
  chain text,
  address text,                        -- public address only
  vault_secret_id uuid,                -- read-only API key reference in Supabase Vault (encrypted), never plaintext
  created_at timestamptz not null default now()
);

create table user_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references academy_lessons(id) on delete cascade,
  completed_at timestamptz,
  quiz_score smallint,
  primary key (user_id, lesson_id)
);

create table community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  sector_id text references sectors(id),
  parent_id uuid references community_posts(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 10000),
  created_at timestamptz not null default now(),
  hidden boolean not null default false
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  kind text not null check (kind in ('price_above', 'price_below', 'research_update', 'unlock', 'governance')),
  threshold numeric,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------

-- Public tables: read for everyone (anon + authenticated); writes only via service role
-- (the service role bypasses RLS, so no write policy is defined).
do $$
declare t text;
begin
  foreach t in array array[
    'sectors','blockchains','projects','project_blockchains','assets','protocol_relationships',
    'research_sources','research_claims','framework_assessments','tokenomics_metrics',
    'market_snapshots','onchain_metrics','academy_courses'
  ] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "public read" on %I for select using (true)', t);
  end loop;
end $$;

-- Research reports & lessons: published content only, gated by subscription tier.
create or replace function public.current_tier() returns plan_tier
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select tier from subscriptions
      where user_id = auth.uid() and status in ('active', 'trialing')
      order by created_at desc limit 1),
    'free'::plan_tier)
$$;

create or replace function public.tier_rank(t plan_tier) returns int
language sql immutable as $$
  select case t when 'free' then 0 when 'pro' then 1 when 'research_club' then 2 end
$$;

alter table research_reports enable row level security;
create policy "published reports by tier" on research_reports for select
  using (status in ('draft', 'reviewed') and published_at is not null
         and tier_rank(access_tier) <= tier_rank(current_tier()));

alter table academy_lessons enable row level security;
create policy "lessons by tier" on academy_lessons for select
  using (exists (select 1 from academy_courses c where c.id = course_id
                 and tier_rank(c.access_tier) <= tier_rank(current_tier())));

-- Private tables: owner-only access.
alter table profiles enable row level security;
create policy "own profile" on profiles for all using (id = auth.uid()) with check (id = auth.uid());

alter table subscriptions enable row level security;
create policy "read own subscription" on subscriptions for select using (user_id = auth.uid());
-- (subscriptions are written by the Stripe webhook using the service role)

do $$
declare t text;
begin
  foreach t in array array['watchlists','portfolio_positions','portfolio_transactions','wallet_connections','user_progress','notifications','alerts'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "owner all" on %I for all using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;

alter table watchlist_items enable row level security;
create policy "owner items" on watchlist_items for all
  using (exists (select 1 from watchlists w where w.id = watchlist_id and w.user_id = auth.uid()))
  with check (exists (select 1 from watchlists w where w.id = watchlist_id and w.user_id = auth.uid()));

alter table community_posts enable row level security;
create policy "read visible posts (paid tiers)" on community_posts for select
  using (not hidden and tier_rank(current_tier()) >= 1);
create policy "write own posts" on community_posts for insert with check (author_id = auth.uid());
create policy "edit own posts" on community_posts for update using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "delete own posts" on community_posts for delete using (author_id = auth.uid());
