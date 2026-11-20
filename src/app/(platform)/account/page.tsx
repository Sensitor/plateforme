import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/section-heading";
import { AccountPanel } from "@/components/account/account-panel";
import { academyCatalog } from "@/lib/academy/catalog";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Account" title="My Account" description="Your profile, preferences and sign-in settings." />
      <Suspense>
        <AccountPanel catalog={academyCatalog()} />
      </Suspense>
    </div>
  );
}
