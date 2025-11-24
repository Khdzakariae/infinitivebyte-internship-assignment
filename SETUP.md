# 🔧 Configuration Step-by-Step

Ce guide vous accompagne dans la configuration complète de l'application.

## Étape 1 : Clerk Authentication (5 min)

### 1.1 Créer un compte Clerk

1. Visitez [https://dashboard.clerk.com/sign-up](https://dashboard.clerk.com/sign-up)
2. Créez un compte (gratuit)
3. Vérifiez votre email

### 1.2 Créer une application

1. Cliquez sur **"Create Application"**
2. Donnez un nom : `Agency Dashboard` (ou autre)
3. Choisissez les méthodes d'authentification :
   - ✅ Email
   - ✅ Google (optionnel)
   - ✅ GitHub (optionnel)
4. Cliquez sur **"Create Application"**

### 1.3 Récupérer les clés API

Dans votre tableau de bord Clerk :

1. Allez dans **API Keys** (menu de gauche)
2. Vous verrez deux types de clés :
   - **Publishable key** (commence par `pk_test_...`)
   - **Secret key** (commence par `sk_test_...`, cliquez pour révéler)
3. **Copiez ces clés** (vous en aurez besoin pour `.env.local`)

### 1.4 Configurer les URLs de redirection

1. Allez dans **Paths** (menu de gauche)
2. Configurez :
   ```
   Sign in path: /sign-in
   Sign up path: /sign-up
   Home URL: /
   ```

---

## Étape 2 : Base de Données PostgreSQL (5-10 min)

Choisissez UNE des options suivantes :

### Option A : Neon (Recommandé) 🌟

**Avantages** : Gratuit, rapide, serverless, pas de maintenance

1. **Créer un compte**
   - Visitez [https://neon.tech/](https://neon.tech/)
   - Cliquez sur **"Sign up"**
   - Connectez-vous avec GitHub (recommandé)

2. **Créer un projet**
   - Cliquez sur **"Create a project"**
   - Nom : `agency-dashboard` (ou autre)
   - Région : Choisissez la plus proche (US East, Europe, etc.)
   - Cliquez sur **"Create project"**

3. **Récupérer la connection string**
   - Dans le dashboard, vous verrez **Connection Details**
   - Copiez la **connection string** :
     ```
     postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
     ```
   - **Important** : Sélectionnez "Pooled connection" pour Next.js

### Option B : Supabase

1. **Créer un compte**
   - Visitez [https://supabase.com/](https://supabase.com/)
   - Sign up (gratuit)

2. **Créer un projet**
   - New project
   - Nom : `agency-dashboard`
   - Database Password : Choisissez un mot de passe fort
   - Région : Choisissez la plus proche

3. **Récupérer la connection string**
   - Allez dans **Settings** → **Database**
   - Copiez la **Connection string** en mode "Transaction"
   - Remplacez `[YOUR-PASSWORD]` par votre mot de passe

### Option C : Railway

1. **Créer un compte**
   - Visitez [https://railway.app/](https://railway.app/)
   - Sign up avec GitHub

2. **Créer un projet PostgreSQL**
   - New Project → Provision PostgreSQL
   - Attendez que le service démarre

3. **Récupérer la connection string**
   - Cliquez sur le service PostgreSQL
   - Dans l'onglet **Connect**, copiez la **Postgres Connection URL**

---

## Étape 3 : Configuration Locale (2 min)

### 3.1 Créer le fichier `.env.local`

Dans le dossier racine du projet, créez un fichier `.env.local` :

```bash
# Copiez ce template
cp .env.example .env.local
```

### 3.2 Remplir les variables

Ouvrez `.env.local` et remplissez :

```env
# Clerk Keys (de l'étape 1.3)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_ICI
CLERK_SECRET_KEY=sk_test_VOTRE_CLE_ICI

# Clerk URLs (laissez tel quel)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database URL (de l'étape 2)
DATABASE_URL="postgresql://VOTRE_CONNECTION_STRING_ICI"
```

**Exemple complet** :
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuZGV2JA
CLERK_SECRET_KEY=sk_test_4iJKoiMWw8VfVBmWM
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
DATABASE_URL="postgresql://user:pass@ep-cool.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

---

## Étape 4 : Installation & Setup (5 min)

### 4.1 Installer les dépendances

```bash
npm install
```

Cela installera :
- Next.js 16
- React 19
- Clerk
- Prisma
- Tailwind CSS
- TypeScript
- Et toutes les dépendances

### 4.2 Initialiser la base de données

```bash
# Créer les tables dans la base de données
npm run db:push
```

Vous devriez voir :
```
✔ Generated Prisma Client
✔ Your database is now in sync with your schema
```

### 4.3 Importer les données CSV

```bash
npm run db:seed
```

Cela va :
1. Lire les fichiers CSV dans `/data`
2. Importer ~1000 agences
3. Importer les contacts
4. Afficher la progression

Attendez le message : `🎉 Database seeding completed!`

---

## Étape 5 : Lancer l'Application (1 min)

### 5.1 Démarrer le serveur de développement

```bash
npm run dev
```

### 5.2 Ouvrir dans le navigateur

Visitez : [http://localhost:3000](http://localhost:3000)

---

## Étape 6 : Tester l'Application (5 min)

### 6.1 Créer un compte

1. Sur la page d'accueil, cliquez sur **"Sign In"** ou **"Get Started"**
2. Cliquez sur **"Sign up"**
3. Entrez votre email et mot de passe
4. Vérifiez votre email (si demandé)
5. Vous serez redirigé vers le dashboard

### 6.2 Tester les Agences

1. Cliquez sur **"Agencies"** dans la navigation
2. Vous devriez voir une liste d'agences
3. Testez la recherche : tapez "Los Angeles"
4. Testez les filtres : sélectionnez "City" dans Type
5. Testez la pagination : naviguez entre les pages

### 6.3 Tester les Contacts

1. Cliquez sur **"Contacts"** dans la navigation
2. Vous devriez voir :
   - Compteur de vues : **1 / 50**
   - Liste de contacts
3. Rechargez la page plusieurs fois
4. Le compteur devrait augmenter : **2 / 50**, **3 / 50**, etc.

### 6.4 Tester la Limite Journalière

Pour tester rapidement (sans attendre 50 vues réelles) :

**Option 1 : Modifier temporairement la limite**

1. Ouvrez `lib/contact-limit.ts`
2. Changez `const DAILY_CONTACT_LIMIT = 50` en `= 3`
3. Redémarrez le serveur
4. Visitez `/contacts` 3 fois
5. À la 4ème fois, vous verrez le prompt d'upgrade

**Option 2 : Directement en DB (si vous avez un client DB)**

```sql
UPDATE user_contact_views 
SET view_count = 50 
WHERE user_id = 'votre_clerk_user_id';
```

---

## ✅ Vérification Finale

### Checklist de Configuration

- [ ] Clerk fonctionne (peut créer un compte)
- [ ] Base de données connectée (pas d'erreur de connexion)
- [ ] Données importées (agences et contacts visibles)
- [ ] Compteur de vues fonctionne
- [ ] Navigation fonctionne
- [ ] Recherche fonctionne
- [ ] Déconnexion fonctionne

### Si tout fonctionne ✅

**Félicitations !** Votre application est prête. 

**Prochaines étapes** :
1. Consultez `DEPLOYMENT.md` pour déployer en production
2. Consultez `CHECKLIST.md` pour la liste complète des features

---

## 🆘 Troubleshooting

### Erreur : "Cannot connect to database"

**Cause** : DATABASE_URL incorrecte ou base de données inaccessible

**Solution** :
1. Vérifiez que DATABASE_URL est correcte dans `.env.local`
2. Vérifiez que votre base de données est accessible (ping l'URL)
3. Pour Neon : Assurez-vous d'utiliser la "Pooled connection"
4. Vérifiez que vous avez `?sslmode=require` à la fin de l'URL

### Erreur : "Clerk is not configured"

**Cause** : Clés Clerk manquantes ou incorrectes

**Solution** :
1. Vérifiez `.env.local` contient les bonnes clés
2. Les clés doivent commencer par `pk_test_` et `sk_test_`
3. Redémarrez le serveur après avoir modifié `.env.local`

### Erreur : "No agencies/contacts found"

**Cause** : Données pas importées

**Solution** :
```bash
npm run db:seed
```

### Erreur : "Module not found"

**Cause** : Dépendances pas installées

**Solution** :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "Port 3000 already in use"

**Solution** :
```bash
# Option 1 : Tuer le processus
lsof -ti:3000 | xargs kill -9

# Option 2 : Utiliser un autre port
PORT=3001 npm run dev
```

---

## 💡 Conseils

### Variables d'Environnement

- ⚠️ **Ne committez JAMAIS `.env.local`** (déjà dans `.gitignore`)
- ✅ Utilisez `.env.example` comme template pour les collaborateurs
- ✅ En production, utilisez les variables d'environnement de Vercel

### Base de Données

- 🌟 Neon est recommandé pour Next.js (serverless-friendly)
- 💾 Les données de seed prennent environ 2-3 minutes à importer
- 🔄 Vous pouvez re-seeder en executant `npm run db:seed` (efface les données existantes)

### Développement

- 🔥 Le serveur recharge automatiquement quand vous modifiez le code
- 📝 Les erreurs TypeScript apparaissent en temps réel
- 🎨 Tailwind CSS compile automatiquement

---

**Configuration terminée !** 🎉

Vous êtes maintenant prêt à développer ou déployer l'application.
