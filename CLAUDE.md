# SENSITOR: working rules

## Writing style (applies to UI text, research content, docs, comments and commit messages)
- Never use em dashes or en dashes (the long dashes). Use commas, colons, periods or parentheses instead. Use a plain hyphen for numeric ranges (2015-2022).
- Missing values in tables are shown as `n/a`.

## Languages (English and French)
- Every interface string lives in the dictionaries: `src/i18n/dictionaries/en/*.ts` and the matching `fr/*.ts`. Never hard-code UI text in a component; add the key in both languages (`tests/i18n.test.ts` checks that French has exactly the English keys).
- Server Components read text with `await getT()` (`@/i18n/server`), Client Components with `useT()` (`@/i18n/client`). Use `Link` from `@/i18n/link` and `useRouter`/`usePathname` from `@/i18n/navigation`, so visitors stay in their language.
- English is served at unprefixed URLs, French under `/fr` (pages live in `src/app/[locale]`). Research dossiers and Academy lessons are still written in English; French pages say so.
- Financial figures keep en-US formatting in both languages; dates follow the language (`formatDate(iso, locale)`).

## Data integrity
- Never present demo or invented data as real market data. Every live figure shows its provider and timestamp.
- Research dossiers never contain live market numbers (prices, market caps, TVL); `tests/content.test.ts` enforces it.
- Every claim is typed fact / interpretation / hypothesis; facts link to sources.

## Brand
- Logo: the slanted two-stroke "S" from the brand mockup (`src/components/shell/logo.tsx`). Default variant "chart": the top stroke ends in an arrowhead (approved by the founder); variant "classic" keeps the original tip. Do not redesign without the founder's approval.
- Fonts: Instrument Serif for display headlines (`.serif-display`), Geist for UI, Geist Mono for figures (`.num`).
- Colours: core indigo `#7896FF` and violet `#9C83E8`, plus the sector / Academy / pillar palettes in `src/lib/brand.ts`. Colour always comes with a text label.

## Checks before committing
`npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.
