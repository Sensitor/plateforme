/**
 * Categorical palette for the dark chart surface (#191d25), validated with the
 * dataviz palette validator (lightness band, chroma, CVD separation, contrast).
 * Slots are assigned in fixed order, never cycled. Charts using slots 7-8 must
 * keep the legend + 2px gaps (secondary encoding) because that pair sits in the
 * CVD warn band.
 */
export const CATEGORICAL = ["#6283f0", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9", "#0ca30c", "#e66767"] as const;

export const CHART = {
  line: "#7896ff",
  grid: "#252b36",
  axis: "#697184",
  surface: "#191d25",
  positive: "#45b997",
  negative: "#e36b75",
} as const;
