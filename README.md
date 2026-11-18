# SENSITOR, Digital Asset Intelligence

> *Understand the market. Research the projects. Master your knowledge.*

Plateforme de recherche et d'intelligence sur les actifs numériques : bibliothèque de projets, fiches de recherche
approfondies, données de marché réelles, comparateur, watchlist, Knowledge Graph, Portfolio Intelligence, Market
Intelligence, Academy, comptes utilisateurs (Supabase), Research Copilot (OpenAI) et alertes e-mail (Resend).

Mise en production des comptes, du Copilot et des alertes : voir [`docs/SETUP.md`](docs/SETUP.md).

## Démarrage

```bash
npm install
cp .env.example .env.local   # Supabase, OpenAI, Resend (tous facultatifs en local)
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
CoinPaprika prend le relais automatiquement en cas de limitation. Sans Supabase, la plateforme fonctionne en mode
invité (données dans le navigateur) ; sans OpenAI, le Copilot l'indique ; sans Resend, les alertes restent in-app.

## Ce qui fonctionne aujourd'hui

| Section | Statut | Détails |
|---|---|---|
| Landing `/` | ✅ | Instantané de marché réel, présentation produit, plans |
| Overview `/overview` | ✅ | Capitalisation totale, dominance BTC/ETH, Fear & Greed, *altcoin breadth*, régime de marché (BTC vs MM200), stablecoins, TVL DeFi, projets en focus, secteurs, watchlist, dates clés |
| Explore `/explore` | ✅ | 20 projets, 13 secteurs, recherche instantanée, filtres (secteur, blockchain, market cap, volume, performance, risque, maturité, couverture), tri, sélection pour comparaison, filtres synchronisés dans l'URL |
| Fiche projet `/projects/[slug]` | ✅ | Sections A→J : overview, technologie, tokenomics (graphes de distribution + courbe d'émission modélisée), adoption, fondamentaux financiers (DefiLlama), on-chain, concurrents (tableau + données live), risques, thèse (bull/neutral/bear, catalyseurs, hypothèses, invalidation), framework 7 piliers, « Learn by Research », sources |
| Comparateur `/compare` | ✅ | Jusqu'à 4 projets : marché, fondamentaux, profil, piliers, forces/faiblesses |
| Watchlist `/watchlist` | ✅ | Navigateur en mode invité, synchronisée avec le compte une fois connecté ; limite Free de 10 projets |
| Knowledge Graph `/graph` | ✅ | 34 relations documentées entre les 20 projets (règlement, déploiements, staking, oracles, bridges, messagerie, concurrents), mode focus, vue liste |
| Portfolio `/portfolio` | ✅ | Saisie manuelle et import CSV (format FR accepté), prix live, coût moyen, P&L réalisé/latent, performance, allocations, corrélations, dépendances, unlocks. Local en invité, synchronisé (RLS) une fois connecté |
| Research Copilot `/copilot` | ✅ | Modes Learn / Analyze / Compare, réponses en streaming ancrées dans les dossiers, affirmations typées (fait / analyse / hypothèse), sources citées, prix avec fournisseur et horodatage, aucun conseil d'investissement, quotas par plan |
| Alertes `/alerts` | ✅ | Prix au-dessus / en dessous, variation 24 h ; notifications in-app (cloche), e-mail Resend si activé ; vérification planifiée (`/api/cron/alerts`) |
| Comptes `/login`, `/account` | ✅ | Supabase Auth : mot de passe, lien magique, réinitialisation ; profil, langue des e-mails, opt-in e-mail |
| Markets `/markets` | ✅ | Graphiques 1D→ALL, sentiment 90 j, régime, intelligence sectorielle, stablecoins, DeFi |
| Research `/research` + méthodologie | ✅ | Bibliothèque des dossiers, statistiques éditoriales, framework documenté |
| Academy `/academy` | ✅ (concepts) | 32 concepts, liés depuis les dossiers et inversement |
| Recherche ⌘K | ✅ | Projets, secteurs, pages, concepts |
| Community, Research Club, Private Program | 🕒 | Pages de roadmap explicitement « non disponible » (aucun faux bouton) |

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
    watchlist/, portfolio/ Stores locaux (useSyncExternalStore), moteur de portefeuille
    supabase/             Clients navigateur / serveur / service role
    auth/                 AuthProvider (session, profil), redirections sûres
    sync/                 Synchronisation offline-first watchlist + portefeuille avec Supabase
    copilot/              Contexte d'ancrage (dossiers, concepts, prix), prompt, quotas
    alerts/, email/       Règles d'alerte, notifications, gabarit e-mail, envoi Resend
  proxy.ts                Rafraîchissement de la session Supabase
supabase/migrations/      0001_app.sql (schéma utilisé par l'app, RLS) ; 0002 modèle CMS pour plus tard
supabase/schedule_alerts.sql  Planification pg_cron des alertes (facultatif)
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
