# Plan d'implémentation

État au 17/11/2026. Projet démarré de zéro (dépôt vide) : aucune contrainte d'existant.

## Phase 1, MVP ✅ (livré, sauf authentification)

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
- [ ] **Authentification (Phase 1b)**, nécessite un projet Supabase :
  1. `@supabase/ssr` : clients serveur/navigateur, rafraîchissement de session dans `proxy.ts`
  2. Pages `/login` (magic link) et `/auth/callback`
  3. Appliquer `supabase/migrations/0001_init.sql`, seed des tables `projects`/`sectors` depuis `src/content`
  4. Watchlist : adaptateur Supabase derrière le hook `useWatchlist` (le stockage local reste pour les invités, avec fusion à la connexion)
- [ ] Relecture éditoriale des 20 dossiers (passage `draft` → `reviewed`)

## Phase 2, Intelligence

- Données on-chain (Etherscan, Dune) et calendrier d'unlocks sous licence (Tokenomist ou équivalent)
- Funding rates / open interest (fournisseur dérivés)
- Sector Intelligence enrichie, Knowledge Graph (table `protocol_relationships` prête)
- Research Copilot (Learn / Analyze / Compare) adossé à la base Sensitor, citations obligatoires
- Alertes (table `alerts` prête), notifications e-mail (Resend)
- Snapshots quotidiens (`market_snapshots`) via cron pour construire un historique propre, y compris la capitalisation totale sans plan Pro
- Localisation française de l'interface

## Phase 3, Portfolio

Positions manuelles, import CSV, P&L réalisé/latent, allocations (actif/secteur/chaîne), corrélations, risque de liquidité,
unlocks à venir sur les positions, dépendances entre protocoles. Jamais de transaction, jamais de seed phrase.

## Phase 4, Ecosystem

Academy complète (parcours, quiz, progression, badges), Community, Founder Research, Stripe (Free / Pro 29 € / Research Club 79 €),
connexions read-only, accompagnement, périmètre réglementaire à valider avant le Private Program.

## Points d'attention

- **Quotas** : en production, prendre une clé CoinGecko Demo (gratuite) ; les IP partagées (Vercel) sont souvent limitées en mode public.
- **Licences** : vérifier les conditions commerciales de chaque fournisseur avant monétisation.
- **Réglementation** : pas de recommandation personnalisée ni de promesse de rendement ; faire relire les contenus premium et le Private Program par un juriste (MiCA / AMF).
