import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { buildSearchIndex } from "@/lib/search-index";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = buildSearchIndex();
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-[#0d1020]">
        Skip to content
      </a>
      <Sidebar />
      <div className="lg:pl-[248px]">
        <Topbar searchIndex={searchIndex} />
        <main id="main" className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 md:px-6 lg:px-8 lg:pt-8">
          {children}
        </main>
        <footer className="mx-auto max-w-[1440px] border-t border-line px-4 py-6 text-[12px] leading-relaxed text-subtle md:px-6 lg:px-8">
          SENSITOR provides research and educational content only. Nothing on this platform is investment advice or a
          recommendation to buy or sell any asset. Market data is supplied by third parties (CoinGecko, CoinPaprika,
          DefiLlama, Alternative.me) and may be delayed or incomplete.
        </footer>
      </div>
    </div>
  );
}
