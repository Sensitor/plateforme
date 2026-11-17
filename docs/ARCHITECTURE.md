# Architecture

## Stack

- **Next.js 16.4** (App Router, Turbopack) avec **Cache Components** activé (`cacheComponents: true`) et Partial Prefetching.
- **TypeScript** strict, **Tailwind CSS v4** (tokens dans `src/app/globals.css`), **Geist / Geist Mono**.
- **Recharts** pour les graphiques interactifs, SVG maison pour sparklines/jauges.
- **SWR** côté client pour le changement d'intervalle des graphiques (`/api/history`).
- **Vitest** pour les tests.

## Rendu et cache

| Contenu | Stratégie |
|---|---|
| Dossiers de recherche, concepts, pages statiques | Pré-rendus au build (`generateStaticParams`), servis comme HTML statique |
| Données de marché | Sections dynamiques en `<Suspense>` ; `await connection()` les exclut du build (le build ne dépend jamais du réseau) |
| Appels fournisseurs | Fonctions `"use cache"` avec `cacheLife` court (revalidate 60-240 s) : un appel CoinGecko/minute au plus, partagé entre visiteurs |
| Graphiques (changement d'intervalle) | Route `GET /api/history?asset=&range=` limitée à l'univers couvert (pas de proxy ouvert) |

## Couche données (`src/lib/market`)

```
providers/coingecko.ts    primaire : prix, cap, FDV, offre, sparklines, top 100 (breadth), global, historique cap totale (Pro)
providers/coinpaprika.ts  repli : un seul appel bulk (/v1/tickers, < 2 Mo) pour rester dans le quota gratuit
providers/defillama.ts    TVL protocole/chaîne, fees/revenue, stablecoins, historique de prix (coins API)
providers/fear-greed.ts   Alternative.me
service.ts                orchestration, repli, cache ; renvoie toujours DataResult<T> { status, data, source, asOf, note }
```

Aucune fonction du service ne lève d'exception : en cas d'échec, `status: "unavailable"` et un message explicite.

## Modèle de recherche (`src/lib/research/types.ts`)

- `Claim { kind: fact | interpretation | hypothesis, text, sources[] }`
- `ResearchSource { title, publisher, url, type, published, accessed, supports, reliability, limitations }`
- `PillarAssessment` × 7 (`technology, tokenomics, adoption, financials, governance, competition, risk`) avec note 1-5 ou `null`, confiance, données utilisées, limites, sources.
- `Tokenomics` : modèle d'offre, plafond, distribution, modèle d'émission (halving / désinflation) pour les courbes modélisées.
- `FinancialModel` : les métriques pertinentes changent selon le modèle économique.

Règles codées : `compositeScore()` (score retenu si pilier non noté ou confiance basse), `dossierCoverage()` (filtre « disponibilité des données »).

## Sécurité

- Aucun secret côté client ; clés fournisseurs lues uniquement côté serveur (`server-only`).
- `/api/history` n'accepte que les actifs couverts et des intervalles valides.
- Schéma Supabase : séparation stricte public / privé, RLS « propriétaire uniquement » sur toutes les données utilisateur, accès au contenu par niveau d'abonnement (`current_tier()`).
- Engagements produit codés dans le schéma : aucune colonne pour clé privée ou seed phrase ; connexions d'exchange en lecture seule via Supabase Vault.

## Accessibilité & responsive

Navigation clavier (⌘K / Ctrl+K / `/`, focus visibles, lien d'évitement), libellés ARIA sur graphiques et contrôles,
infobulles accessibles au focus, palette catégorielle validée (contraste ≥ 3:1, séparation daltonisme) avec légendes
systématiques, `prefers-reduced-motion` respecté. Mise en page vérifiée de 390 px à 1440 px sans défilement horizontal.
