import type { Metadata } from "next";
import { CircleUser, KeyRound, Lock } from "lucide-react";
import { PageHeader } from "@/components/ui/section-heading";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Account" title="My Account" description="You are browsing Sensitor in guest mode." />
      <Card>
        <CardBody className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2a3150] to-[#3b2f5e] text-fg-2">
              <CircleUser className="size-6" aria-hidden />
            </span>
            <div>
              <div className="font-medium text-fg">Guest</div>
              <div className="text-[13px] text-muted">
                Plan: <Badge tone="neutral">Free</Badge>
              </div>
            </div>
          </div>
          <ButtonLink href="/pricing" variant="secondary">
            View plans
          </ButtonLink>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Sign-in" icon={<KeyRound className="size-4" />} action={<Badge tone="outline">Not enabled in this deployment</Badge>} />
        <CardBody className="space-y-3 text-[13.5px] leading-relaxed text-fg-2">
          <p>
            Account creation is part of the MVP plan and will use Supabase Auth (email magic link, then OAuth). It is not enabled yet in this deployment, so there is no
            sign-in form here, nothing on this page collects personal data.
          </p>
          <p className="text-muted">Once enabled, your watchlist will sync across devices and Pro features will unlock with your subscription.</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Privacy & security commitments" icon={<Lock className="size-4" />} />
        <CardBody>
          <ul className="space-y-2 text-[13.5px] text-fg-2">
            <li>• Sensitor will never ask for your seed phrase or private keys.</li>
            <li>• Sensitor will never execute transactions on your behalf.</li>
            <li>• Private data (watchlists, portfolios) is isolated per user with row-level security.</li>
            <li>• Exchange connections, when offered, will be read-only.</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
