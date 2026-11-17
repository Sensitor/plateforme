import Link from "next/link";
import { LogoMark } from "@/components/shell/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <LogoMark className="size-10" />
      <p className="num mt-6 text-sm text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-fg">This page does not exist</h1>
      <p className="mt-2 max-w-sm text-[14px] text-muted">The project or page you are looking for is not in the Sensitor library yet.</p>
      <div className="mt-6 flex gap-3 text-[14px]">
        <Link href="/overview" className="rounded-lg bg-accent px-4 py-2 font-semibold text-[#0d1020]">Overview</Link>
        <Link href="/explore" className="rounded-lg border border-line-strong px-4 py-2 text-fg">Explore projects</Link>
      </div>
    </div>
  );
}
