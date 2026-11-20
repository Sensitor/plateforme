import { common, meta, nav, shell } from "./core";
import { labels } from "./labels";

export const en = { meta, common, nav, shell, labels };

export type Dictionary = typeof en;
