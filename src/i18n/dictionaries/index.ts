import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { fr } from "./fr";

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
