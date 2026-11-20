import { common, meta, nav, shell } from "./core";
import { labels } from "./labels";
import { landing, plans, ui } from "./landing";
import { account, login } from "./auth";
import { academy } from "./academy";
import { overview, watchlistUi } from "./overview";

export const en = { meta, common, nav, shell, labels, ui, landing, plans, login, account, academy, overview, watchlistUi };

export type Dictionary = typeof en;
