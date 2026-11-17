# SENSITOR: working rules

## Writing style (applies to UI text, research content, docs, comments and commit messages)
- Never use em dashes or en dashes (the long dashes). Use commas, colons, periods or parentheses instead. Use a plain hyphen for numeric ranges (2015-2022).
- Missing values in tables are shown as `n/a`.

## Data integrity
- Never present demo or invented data as real market data. Every live figure shows its provider and timestamp.
- Research dossiers never contain live market numbers (prices, market caps, TVL); `tests/content.test.ts` enforces it.
- Every claim is typed fact / interpretation / hypothesis; facts link to sources.

## Brand
- Logo: the slanted two-stroke "S" from the brand mockup (`src/components/shell/logo.tsx`). Do not redesign without the founder's approval.
- Fonts: Instrument Serif for display headlines (`.serif-display`), Geist for UI, Geist Mono for figures (`.num`).
- Colours: core indigo `#7896FF` and violet `#9C83E8`, plus the sector / Academy / pillar palettes in `src/lib/brand.ts`. Colour always comes with a text label.

## Checks before committing
`npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.
