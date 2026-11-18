# Mise en service : comptes, Copilot, alertes

Ce guide liste ce qu'il reste à faire côté Supabase, Resend et hébergeur pour activer les comptes,
la synchronisation, le Research Copilot et les alertes en production. Compter 15 minutes.

## 1. Base de données Supabase

1. Ouvrir le projet Supabase, puis **SQL Editor**, **New query**.
2. Coller le contenu de [`supabase/migrations/0001_app.sql`](../supabase/migrations/0001_app.sql) et exécuter.
   Le script est idempotent : il peut être relancé sans risque.
3. Vérifier dans **Table Editor** : `profiles`, `watchlist_items`, `portfolio_transactions`, `alerts`,
   `notifications`, `copilot_usage`, toutes avec RLS activé.

`0002_research_cms.sql` est un modèle pour une phase ultérieure (contenu éditorial en base) : ne pas l'appliquer.

## 2. Authentification Supabase

**Authentication, URL Configuration**

| Réglage | Valeur |
|---|---|
| Site URL | `https://votre-domaine` |
| Redirect URLs | `https://votre-domaine/**` et `http://localhost:3000/**` |

Sans ces URL, les liens de confirmation et les liens magiques renvoient vers une page d'erreur.

**Authentication, Emails (recommandé)** : l'expéditeur par défaut de Supabase est limité à quelques
e-mails par heure. Pour la production, brancher Resend en SMTP (**Authentication, Emails, SMTP Settings**) :

| Champ | Valeur |
|---|---|
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | la clé API Resend |
| Sender | `alerts@notif.govera.fr` (ou une adresse du futur domaine Sensitor) |

**Liens valables sur un autre appareil (facultatif)** : par défaut, un lien doit être ouvert dans le
navigateur où la demande a été faite (PKCE). Pour qu'il fonctionne partout, remplacer le lien des modèles
d'e-mail par `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
(`type=recovery` pour la réinitialisation du mot de passe). La route `/auth/confirm` est déjà en place.

**Passer un compte en Pro ou Research Club** (en attendant Stripe) : SQL Editor,
`update public.profiles set tier = 'pro' where id = '<uuid du compte>';`.
Les utilisateurs ne peuvent pas modifier leur propre niveau (droits de colonne).

## 3. Variables d'environnement de l'hébergeur

À renseigner dans l'hébergeur (Vercel : Project Settings, Environment Variables), puis redéployer.

| Variable | Où la trouver | Exposée au navigateur |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site | oui |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase, Project Settings, API | oui |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase, clé publishable (anon) | oui |
| `SUPABASE_SECRET_KEY` | Supabase, clé secrète (service role) | **non**, serveur uniquement |
| `OPENAI_API_KEY` | platform.openai.com | non |
| `OPENAI_MODEL` | facultatif, défaut `gpt-5.4-mini` | non |
| `RESEND_API_KEY` | resend.com, API Keys | non |
| `RESEND_FROM` | `Sensitor <alerts@notif.govera.fr>` | non |
| `CRON_SECRET` | chaîne aléatoire : `openssl rand -hex 32` | non |
| `COINGECKO_DEMO_API_KEY` | facultatif, recommandé | non |

La clé secrète Supabase contourne la RLS : elle n'est lue que par `/api/cron/alerts`.

## 4. Planificateur des alertes

Les alertes sont vérifiées par `/api/cron/alerts`, qui exige l'en-tête `Authorization: Bearer <CRON_SECRET>`.

- **Recommandé : Supabase pg_cron**, toutes les 5 minutes, gratuit. Remplacer les deux valeurs dans
  [`supabase/schedule_alerts.sql`](../supabase/schedule_alerts.sql) puis l'exécuter dans le SQL Editor.
  Les valeurs sont stockées chiffrées dans Supabase Vault.
- **Vercel Cron** : possible sur le plan Pro (le plan Hobby est limité à une exécution par jour, inutile ici).
  Vercel envoie automatiquement `CRON_SECRET` dans l'en-tête.

Test manuel après déploiement :

```bash
curl -s -H "Authorization: Bearer $CRON_SECRET" https://votre-domaine/api/cron/alerts
```

Réponse attendue : `{"checked":N,"triggered":0,...}`. Une alerte déclenchée se met en pause, crée une
notification in-app et, si l'utilisateur l'a activé dans son compte, envoie un e-mail récapitulatif.

## 5. Vérifications

1. Créer un compte sur `/login`, ouvrir le lien de confirmation : retour connecté sur la plateforme.
2. `/account` : le profil s'affiche (sinon le schéma n'est pas installé), modifier le nom, enregistrer.
3. Ajouter un projet à la watchlist, se connecter sur un autre navigateur : il apparaît.
4. `/alerts` : pour un test rapide, créer une alerte « 24h move larger than » à 1 %, appeler le planificateur
   (commande curl ci-dessus), puis vérifier la notification in-app et l'e-mail.
5. `/copilot` : poser une question en mode Analyze, vérifier les sources citées et l'horodatage des prix.

## Quotas et coûts

- Copilot : invités 3 questions par jour (cookie signé), Free 10, Pro 100, Research Club 300 (table `copilot_usage`).
  Chaque réponse est plafonnée à 2 000 jetons de sortie.
- Le quota invité repose sur un cookie : suffisant pour un MVP, à compléter par une limite par IP
  (Upstash Ratelimit ou équivalent) avant une ouverture large.
- Alertes : 5 actives en Free, 50 en Pro et Research Club (déclencheur en base).
