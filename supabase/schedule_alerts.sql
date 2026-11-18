-- =====================================================================
-- SENSITOR: run the alert checker every 5 minutes from Supabase
-- Optional. Use it if your host cannot run frequent cron jobs (for
-- example the Vercel Hobby plan, limited to one run per day).
--
-- Before running in the SQL editor, replace the two placeholders:
--   REPLACE_WITH_CRON_SECRET  the same value as the CRON_SECRET env var
--   REPLACE_WITH_SITE_URL     e.g. https://sensitor.example.com
-- Both values are stored encrypted in Supabase Vault, not in this file.
-- Run it once. To change a value later, use vault.update_secret().
-- =====================================================================

create extension if not exists pg_cron;
create extension if not exists pg_net;

select vault.create_secret('REPLACE_WITH_CRON_SECRET', 'sensitor_cron_secret');
select vault.create_secret('REPLACE_WITH_SITE_URL/api/cron/alerts', 'sensitor_alerts_url');

-- Re-running cron.schedule with the same name replaces the job.
select cron.schedule(
  'sensitor-alerts',
  '*/5 * * * *',
  $job$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'sensitor_alerts_url'),
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
-- Responses:    select status_code, content from net._http_response order by created desc limit 10;
-- Stop:         select cron.unschedule('sensitor-alerts');
