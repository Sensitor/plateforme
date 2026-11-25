# Plan d'implémentation

État au 21/11/2026. Projet démarré de zéro (dépôt vide) : aucune contrainte d'existant.

## Phase 1, MVP ✅ (livré)

- [x] Design system (tokens du brief, Geist / Geist Mono), sidebar Discover / Understand / Manage, topbar, recherche ⌘K
- [x] Landing page
- [x] Overview (indicateurs réels, graphique multi-intervalles, projets en focus, secteurs, recherche, watchlist, dates clés)
- [x] Explore Projects (20 projets, 13 secteurs, filtres avancés, tri, recherche instantanée)
- [x] Fiches de recherche A→J, framework 7 piliers, sources, Learn by Research
- [x] Méthodologie publique
- [x] Comparateur (4 projets)
- [x] Watchlist (locale)
- [x] Première intégration de données de marché (CoinGecko + repli CoinPaprika, DefiLlama, Alternative.me)
- [x] Markets (sentiment, régime, secteurs, stablecoins, DeFi)
- [x] Tests (205), vérification automatique des sources, build sans avertissement
- [x] **Authentification (Phase 1b)** : Supabase Auth (mot de passe, lien magique, réinitialisation), `proxy.ts`, `/login`, `/auth/callback`, `/auth/confirm`, page compte
- [x] Watchlist et portefeuille synchronisés (offline-first, fusion à la connexion, nettoyage à la déconnexion)
- [x] Passe de vérification sur sources primaires (21/11/2026) : 12 dossiers mis à jour (incidents Sui 2026, Alpenglow actif, UNIfication exécutée, fee switch Ethena, allocations Ethena / Immutable / LayerZero, Dual Governance active, inflation Celestia), plus aucune mention « à vérifier »
- [ ] Relecture éditoriale des 20 dossiers (passage `draft` → `reviewed`, validation par le fondateur)

## Phase 2, Intelligence

- Données on-chain (Etherscan, Dune) et calendrier d'unlocks sous licence (Tokenomist ou équivalent)
- Funding rates / open interest (fournisseur dérivés)
- Sector Intelligence enrichie
- [x] Knowledge Graph : livré (`/graph`, relations dans `src/content/relationships.ts`, table `protocol_relationships` prête pour la migration en base)
- [x] Research Copilot (Learn / Analyze / Compare) adossé aux dossiers Sensitor, citations obligatoires, quotas par plan
- [x] Alertes prix et volatilité, notifications in-app, e-mails Resend, planification pg_cron
- Alertes éditoriales (mise à jour d'un dossier suivi, unlocks, gouvernance)
- [x] Snapshots quotidiens (`market_daily`, `asset_daily`, migration `0004`) via Vercel Cron ou pg_cron : historique propre de la capitalisation totale sans plan Pro, affiché dès deux jours de données
- [x] Localisation française de l'interface : `/fr`, sélecteur de langue, détection sur la page d'accueil, dictionnaires typés
- [x] Contenu traduit : 32 leçons de l'Academy et 20 dossiers de recherche, avec tests de parité de structure

## Deuxième axe, investissement classique (étape 1 livrée)

- [x] Page `/strategies` : Bitcoin face à sa moyenne mobile 200 semaines (périodes sous la moyenne, profondeur), simulateur DCA sur prix réels BTC et ETH comparé à un investissement en une fois, cycles de halving alignés. Clôtures hebdomadaires DefiLlama, source et horodatage affichés, lectures typées (interprétation / hypothèse), jamais de signal.
- [x] Parcours Academy « Apprendre à investir » (catégorie `investing`, `src/content/investing.ts`) : 10 leçons approfondies (intérêts composés, risque et rendement, horizon, actions, obligations, ETF, allocation, DCA, moyennes mobiles, biais comportementaux), 7 visuels interactifs illustratifs et 2 visuels sur prix réels, sources SEC / FINRA / AMF vérifiées, version française complète.
- Étape 2 (fournisseur de données payant requis) : ETF et actions dans Marchés, dossiers et portefeuille ; données de cours actions et ETF sous licence.
- Avant tout contenu premium de type « ma stratégie » : relecture juridique (conseil en investissement, MiCA / AMF).

## Phase 3, Portfolio (version locale livrée)

Livré : `/portfolio` en stockage local (saisie, import/export CSV, coût moyen, P&L, performance, allocations, corrélations, dépendances, unlocks).
Livré ensuite : synchronisation en base (table `portfolio_transactions`, RLS). Reste : connexions read-only.


Positions manuelles, import CSV, P&L réalisé/latent, allocations (actif/secteur/chaîne), corrélations, risque de liquidité,
unlocks à venir sur les positions, dépendances entre protocoles. Jamais de transaction, jamais de seed phrase.

## Phase 4, Ecosystem

Academy complète (parcours, exercices ; déjà livrés : 42 leçons approfondies avec visuels et quiz, dont le parcours « Apprendre à investir », progression synchronisée avec le compte et 13 badges, table `academy_progress` dans `0003_academy.sql`), Community, Founder Research, Stripe (Free / Pro 29 € / Research Club 79 €),
connexions read-only, accompagnement, périmètre réglementaire à valider avant le Private Program.

## Points d'attention

- **Quotas** : en production, prendre une clé CoinGecko Demo (gratuite) ; les IP partagées (Vercel) sont souvent limitées en mode public.
- **Licences** : vérifier les conditions commerciales de chaque fournisseur avant monétisation.
- **Réglementation** : pas de recommandation personnalisée ni de promesse de rendement ; faire relire les contenus premium et le Private Program par un juriste (MiCA / AMF).
