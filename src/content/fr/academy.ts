import type { ConceptText, DeepText } from "@/lib/academy/localized";
import { DEEP_1, TEXT_1 } from "./academy-1";
import { DEEP_2, TEXT_2 } from "./academy-2";
import { DEEP_3, TEXT_3 } from "./academy-3";
import { DEEP_4, TEXT_4 } from "./academy-4";
import { DEEP_5, TEXT_5 } from "./academy-5";
import { DEEP_6, TEXT_6 } from "./academy-6";
import { DEEP_7, TEXT_7 } from "./academy-7";
import { DEEP_8, TEXT_8 } from "./academy-8";
import { DEEP_9, TEXT_9 } from "./academy-9";
import { DEEP_10, TEXT_10 } from "./academy-10";
import { DEEP_11, TEXT_11 } from "./academy-11";
import { DEEP_12, TEXT_12 } from "./academy-12";
import { DEEP_13, TEXT_13 } from "./academy-13";
import { DEEP_14, TEXT_14 } from "./academy-14";

/**
 * Leçons Academy traduites en français : les 32 leçons, mêmes faits et même
 * structure que la version anglaise. Une leçon absente ici s'afficherait en
 * anglais, avec la mention « contenu en anglais ».
 */
export const CONCEPT_TEXT_FR: Partial<Record<string, ConceptText>> = { ...TEXT_1, ...TEXT_2, ...TEXT_3, ...TEXT_4, ...TEXT_5, ...TEXT_6, ...TEXT_7, ...TEXT_8, ...TEXT_9, ...TEXT_10, ...TEXT_11, ...TEXT_12, ...TEXT_13, ...TEXT_14 };
export const CONCEPT_DEEP_FR: Partial<Record<string, DeepText>> = { ...DEEP_1, ...DEEP_2, ...DEEP_3, ...DEEP_4, ...DEEP_5, ...DEEP_6, ...DEEP_7, ...DEEP_8, ...DEEP_9, ...DEEP_10, ...DEEP_11, ...DEEP_12, ...DEEP_13, ...DEEP_14 };
