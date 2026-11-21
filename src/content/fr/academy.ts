import type { ConceptText, DeepText } from "@/lib/academy/localized";
import { DEEP_1, TEXT_1 } from "./academy-1";
import { DEEP_2, TEXT_2 } from "./academy-2";
import { DEEP_3, TEXT_3 } from "./academy-3";

/**
 * Leçons Academy traduites en français. Une leçon absente ici s'affiche en
 * anglais, avec la mention « contenu en anglais ». Les 10 leçons
 * « Par où commencer » sont traduites.
 */
export const CONCEPT_TEXT_FR: Partial<Record<string, ConceptText>> = { ...TEXT_1, ...TEXT_2, ...TEXT_3 };
export const CONCEPT_DEEP_FR: Partial<Record<string, DeepText>> = { ...DEEP_1, ...DEEP_2, ...DEEP_3 };
