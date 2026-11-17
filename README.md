# SENSITOR, Digital Asset Intelligence

> *Understand the market. Research the projects. Master your knowledge.*

Plateforme de recherche et d'intelligence sur les actifs numériques. Ce dépôt contient le **MVP (Phase 1)** :
bibliothèque de projets, fiches de recherche approfondies, données de marché réelles, comparateur, watchlist,
Market Intelligence, Academy (bibliothèque de concepts) et landing page.

## Démarrage

```bash
npm install
cp .env.example .env.local   # facultatif : clés CoinGecko
npm run dev                  # http://localhost:3000
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build && npm start` | Build et serveur de production |
| `npm test` | Tests (vitest) : intégrité éditoriale des 20 dossiers, framework, filtres, formatage |
| `npm run typecheck` | Vérification TypeScript |
| `npm run lint` | ESLint |
| `npm run check:sources` | Vérifie que chaque lien source des dossiers répond (HTTP) |

Node 20+ requis. Aucune clé n'est obligatoire : sans clé, CoinGecko est appelé en mode public et
CoinPaprika prend le relais automatiquement en cas de limitation.

## Ce qui fonctionne aujourd'hui

| Section | Statut | Détails |
|---|---|---|
| Landing `/` | ✅ | Instantané de marché réel, présentation produit, plans |
| Overview `/overview` | ✅ | Capitalisation totale, dominance BTC/ETH, Fear & Greed, *altcoin breadth*, régime de marché (BTC vs MM200), stablecoins, TVL DeFi, projets en focus, secteurs, watchlist, dates clés |
| Explore `/explore` | ✅ | 20 projets, 13 secteurs, recherche instantanée, filtres (secteur, blockchain, market cap, volume, performance, risque, maturité, couverture), tri, sélection pour comparaison, filtres synchronisés dans l'URL |
| Fiche projet `/projects/[slug]` | ✅ | Sections A→J : overview, technologie, tokenomics (graphes de distribution + courbe d'émission modélisée), adoption, fondamentaux financiers (DefiLlama), on-chain, concurrents (tableau + données live), risques, thèse (bull/neutral/bear, catalyseurs, hypothèses, invalidation), framework 7 piliers, « Learn by Research », sources |
| Comparateur `/compare` | ✅ | Jusqu'à 4 projets : marché, fondamentaux, profil, piliers, forces/faiblesses |
| Watchlist `/watchlist` | ✅ (local) | Stockée dans le navigateur (mode invité), limite Free de 10 projets |
| Markets `/markets` | ✅ | Graphiques 1D→ALL, sentiment 90 j, régime, intelligence sectorielle, stablecoins, DeFi |
| Research `/research` + méthodologie | ✅ | Bibliothèque des dossiers, statistiques éditoriales, framework documenté |
| Academy `/academy` | ✅ (concepts) | 32 concepts, liés depuis les dossiers et inversement |
| Recherche ⌘K | ✅ | Projets, secteurs, pages, concepts |
| Portfolio, Alerts, Community, Research Club, Private Program | 🕒 | Pages de roadmap explicitement « non disponible » (aucun faux bouton) |
| Authentification | 🕒 Phase 1b | Schéma prêt (`supabase/migrations`), non branché, voir « Prochaines étapes » |

## Principes de données (non négociables)

- **Aucune donnée fictive présentée comme réelle.** Si tous les fournisseurs échouent, la donnée est affichée « indisponible ».
- Chaque bloc de données live affiche **sa source et son horodatage**.
- Les dossiers ne contiennent **aucun chiffre de marché** (prix, capitalisation, TVL) : un test bloque toute affirmation contenant un montant en dollars.
- Chaque affirmation est typée **fait / interprétation / hypothèse** ; un fait sans source est signalé « source pending ».
- Le score composite n'est publié que si les 7 piliers sont notés sans confiance « low » ; sinon il est retenu avec la raison.

## Statut éditorial des dossiers

Les 20 dossiers sont des **brouillons (v0.1)** rédigés à partir de la documentation publique des projets.
Tous les liens sources ont été vérifiés automatiquement le 17/11/2026 (176 OK ; 18 pages bloquent les robots
ou limitent le débit, à vérifier manuellement). **Une relecture humaine par l'équipe éditoriale est nécessaire
avant publication** : elle doit confirmer que chaque source soutient bien l'affirmation associée et valider les
notes du framework. Points signalés dans les dossiers eux-mêmes : allocation HYPE (site rendu côté client),
allocations ENA / ZRO / RENDER / IMX non graphées faute de source textuelle primaire, URL précises de certains
billets (Bittensor, Sui, Immutable) à épingler.

## Architecture

Voir [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) et le plan d'implémentation [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md).

```
src/
  app/                    Routes (App Router). (platform)/ = application avec sidebar ; page.tsx = landing
  components/             UI : ui/ (primitives), shell/, charts/, research/, overview/, explore/, markets/
  content/                Contenu éditorial versionné : projects/*.ts (20 dossiers), concepts.ts, plans.ts, key-dates.ts
  lib/
    market/               Fournisseurs (CoinGecko, CoinPaprika, DefiLlama, Alternative.me) + service avec repli et cache
    research/             Types du modèle de recherche, taxonomie, framework (score), modèles d'émission
    watchlist/            Store local (useSyncExternalStore)
supabase/migrations/      Modèle de données complet + Row Level Security
tests/                    vitest
scripts/check-sources.mjs Vérification des liens sources
```

## Ajouter un projet

1. Créer `src/content/projects/<slug>.ts` (copier un dossier existant).
2. L'enregistrer dans `src/content/projects/index.ts`.
3. Ajouter le logo dans `public/logos/`.
4. `npm test` (intégrité : sources référencées, 7 piliers, 7 risques, distribution = 100 %, concepts connus…) puis `npm run check:sources`.

## Licences & fournisseurs

CoinGecko, CoinPaprika, DefiLlama et Alternative.me exigent une attribution (affichée à côté des données).
Vérifier les conditions et quotas de chaque fournisseur avant un usage commercial à grande échelle.
Les logos de projets appartiennent à leurs détenteurs respectifs et sont utilisés à des fins d'identification.

---
SENSITOR fournit un contenu de recherche et pédagogique. Rien sur cette plateforme ne constitue un conseil en investissement.
