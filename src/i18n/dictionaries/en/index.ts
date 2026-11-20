import { common, meta, nav, shell } from "./core";
import { labels } from "./labels";
import { landing, plans, ui } from "./landing";
import { account, login } from "./auth";
import { academy } from "./academy";
import { overview, watchlistUi } from "./overview";
import { markets } from "./markets";
import { explore } from "./explore";
import { dossier } from "./dossier";
import { compare, copilot, graph, research, settings, soon, watchlistPage } from "./pages";
import { methodology } from "./methodology";

export const en = { meta, common, nav, shell, labels, ui, landing, plans, login, account, academy, overview, watchlistUi, markets, explore, dossier, soon, settings, watchlistPage, research, methodology, compare, graph, copilot };

export type Dictionary = typeof en;
