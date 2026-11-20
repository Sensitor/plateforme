import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/section-heading";
import { AccountPanel } from "@/components/account/account-panel";
import { academyCatalog } from "@/lib/academy/catalog";
import { getT } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("account", "/account");
}

export default async function AccountPage() {
  const dict = await getT();
  const t = dict.account;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Suspense>
        <AccountPanel catalog={academyCatalog(dict)} />
      </Suspense>
    </div>
  );
}
