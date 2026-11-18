import type { Locale } from "./evaluate";

export interface EmailItem {
  title: string;
  body: string;
  link: string;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const COPY = {
  en: {
    open: "Open in Sensitor",
    intro: (n: number) => (n === 1 ? "One of your alerts has triggered." : `${n} of your alerts have triggered.`),
    rearm: "Triggered alerts pause automatically. You can re-arm them from your Alerts page.",
    footer: "Informative alert only. Sensitor does not provide investment advice.",
    manage: "Turn off alert emails",
  },
  fr: {
    open: "Ouvrir dans Sensitor",
    intro: (n: number) => (n === 1 ? "Une de vos alertes s'est déclenchée." : `${n} de vos alertes se sont déclenchées.`),
    rearm: "Une alerte déclenchée se met en pause. Vous pouvez la réactiver depuis la page Alertes.",
    footer: "Alerte informative uniquement. Sensitor ne fournit pas de conseil en investissement.",
    manage: "Désactiver les e-mails d'alerte",
  },
} as const;

/** Email-client-safe HTML (tables + inline styles) and a plain-text twin. */
export function renderAlertEmail(items: EmailItem[], siteUrl: string, locale: Locale = "en", opts: { banner?: string } = {}) {
  const c = COPY[locale];
  const subject = items.length === 1 ? items[0].title : `${c.intro(items.length)} ${items.map((i) => i.title.split(" ")[0]).join(", ")}`;
  const rows = items
    .map(
      (i) => `
        <tr><td style="padding:18px 0;border-top:1px solid #E6E8EF">
          <div style="font:600 17px/1.35 Georgia,'Times New Roman',serif;color:#14161C">${esc(i.title)}</div>
          <div style="margin-top:6px;font:400 14px/1.55 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#4A5161">${esc(i.body)}</div>
          <a href="${esc(i.link)}" style="display:inline-block;margin-top:12px;font:600 13px/1 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#4F6BE8;text-decoration:none">${c.open} &rarr;</a>
        </td></tr>`,
    )
    .join("");
  const banner = opts.banner
    ? `<tr><td style="padding:10px 14px;background:#FFF6E0;border-radius:8px;font:500 12.5px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#7A5A00">${esc(opts.banner)}</td></tr><tr><td style="height:16px"></td></tr>`
    : "";
  const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#F3F4F8">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F8;padding:32px 12px"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td style="padding:0 4px 14px">
      <span style="display:inline-block;width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,#7896FF,#9C83E8);vertical-align:middle"></span>
      <span style="margin-left:8px;font:700 13px/26px -apple-system,Segoe UI,Helvetica,Arial,sans-serif;letter-spacing:.18em;color:#14161C;vertical-align:middle">SENSITOR</span>
    </td></tr>
    <tr><td style="background:#FFFFFF;border:1px solid #E6E8EF;border-radius:14px;padding:26px 26px 10px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${banner}
        <tr><td style="padding-bottom:14px;font:500 12px/1.4 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#6F7BF0">${c.intro(items.length)}</td></tr>
        ${rows}
        <tr><td style="padding:14px 0 16px;border-top:1px solid #E6E8EF;font:400 12.5px/1.55 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#7A8091">${c.rearm}</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:16px 6px;font:400 11.5px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#8A90A0">
      ${c.footer}<br><a href="${esc(siteUrl)}/account" style="color:#5C6FD6">${c.manage}</a>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
  const text = [opts.banner ?? "", c.intro(items.length), "", ...items.flatMap((i) => [i.title, i.body, i.link, ""]), c.rearm, "", c.footer, `${c.manage}: ${siteUrl}/account`]
    .filter((l, idx) => l !== "" || idx > 0)
    .join("\n");
  return { subject, html, text };
}
