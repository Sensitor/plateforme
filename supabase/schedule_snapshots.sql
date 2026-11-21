-- =====================================================================
-- SENSITOR: take the daily market snapshot from Supabase (optional)
-- vercel.json already schedules /api/cron/snapshots once a day on Vercel.
-- Use this file only if you prefer Supabase pg_cron, or host elsewhere.
--
-- Before running in the SQL editor, replace the placeholders below:
--   REPLACE_WITH_CRON_SECRET  the same value as the CRON_SECRET env var
--   REPLACE_WITH_SITE_URL     e.g. https://sensitor.example.com
-- If you already ran schedule_alerts.sql, the cron secret is reused.
-- Values are stored encrypted in Supabase Vault, not in this file.
-- =====================================================================

create extension if not exists pg_cron;
create extension if not exists pg_net;

do $$
begin
  if not exists (select 1 from vault.secrets where name = 'sensitor_cron_secret') then
    perform vault.create_secret('REPLACE_WITH_CRON_SECRET', 'sensitor_cron_secret');
  end if;
  if not exists (select 1 from vault.secrets where name = 'sensitor_snapshots_url') then
    perform vault.create_secret('REPLACE_WITH_SITE_URL/api/cron/snapshots', 'sensitor_snapshots_url');
  end if;
end $$;

-- Every day at 23:40 UTC. Re-running cron.schedule with the same name replaces the job.
select cron.schedule(
  'sensitor-snapshots',
  '40 23 * * *',
  $job$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'sensitor_snapshots_url'),
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'sensitor_cron_secret'),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 25000
  );
  $job$
);

-- Check runs:   select * from cron.job_run_details order by start_time desc limit 10;
-- Data:         select day, total_market_cap_usd, sources from public.market_daily order by day desc limit 7;
-- Stop:         select cron.unschedule('sensitor-snapshots');
