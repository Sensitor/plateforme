-- =====================================================================
-- SENSITOR, daily market snapshots
--
-- Apply once in the Supabase SQL editor (independent of 0002). Safe to re-run.
-- One row per UTC day for the market as a whole, and one row per covered
-- asset and day. Written by /api/cron/snapshots with the secret key; read by
-- the site with the public key to draw history that free provider plans do
-- not offer (total market cap). Every row keeps its providers and the exact
-- observation time, so charts always show where a figure came from.
-- =====================================================================

create table if not exists public.market_daily (
  day date primary key,
  observed_at timestamptz not null,
  total_market_cap_usd numeric,
  total_volume_usd numeric,
  btc_dominance numeric,
  eth_dominance numeric,
  defi_tvl_usd numeric,
  stablecoin_supply_usd numeric,
  fear_greed smallint check (fear_greed between 0 and 100),
  fear_greed_label text,
  -- Provider per field group, e.g. {"global":"CoinGecko","defi":"DefiLlama","sentiment":"Alternative.me"}
  sources jsonb not null default '{}'::jsonb
);

create table if not exists public.asset_daily (
  day date not null,
  slug text not null check (slug ~ '^[a-z0-9-]{1,80}$'),
  observed_at timestamptz not null,
  price_usd numeric,
  market_cap_usd numeric,
  fdv_usd numeric,
  volume_24h_usd numeric,
  change_24h_pct numeric,
  tvl_usd numeric,
  quote_source text,
  tvl_source text,
  primary key (day, slug)
);
create index if not exists asset_daily_slug_day on public.asset_daily (slug, day desc);

-- Public market data: anyone may read, only the service role (which bypasses RLS) may write.
alter table public.market_daily enable row level security;
alter table public.asset_daily enable row level security;
drop policy if exists "market_daily: public read" on public.market_daily;
create policy "market_daily: public read" on public.market_daily for select using (true);
drop policy if exists "asset_daily: public read" on public.asset_daily;
create policy "asset_daily: public read" on public.asset_daily for select using (true);
