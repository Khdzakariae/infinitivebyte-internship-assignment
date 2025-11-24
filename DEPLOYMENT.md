# 🚀 Guide de Déploiement Rapide

Ce guide vous accompagne du setup local au déploiement en production.

## ⚡ Setup Local (5 minutes)

### 1. Configurer Clerk (Authentification)

1. Visitez [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
2. Créez un compte gratuit
3. Créez une nouvelle application
4. Copiez vos clés API

### 2. Configurer la Base de Données

**Option A : Neon (Recommandé - Gratuit)**
1. Visitez [https://neon.tech/](https://neon.tech/)
2. Créez un compte et un projet
3. Copiez la connection string PostgreSQL

**Option B : Supabase (Alternative gratuite)**
1. Visitez [https://supabase.com/](https://supabase.com/)
2. Créez un projet
3. Dans Settings → Database, copiez la connection string

**Option C : Railway (Alternative gratuite)**
1. Visitez [https://railway.app/](https://railway.app/)
2. Créez un nouveau projet PostgreSQL
3. Copiez la connection string

### 3. Configuration Locale

Créez le fichier `.env.local` :

```bash
# Clerk Keys (de https://dashboard.clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database URL (de Neon/Supabase/Railway)
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### 4. Initialiser la Base de Données

```bash
# Installer les dépendances
npm install

# Créer les tables
npm run db:push

# Importer les données CSV
npm run db:seed
```

Ce processus va :
- ✅ Créer 3 tables (agencies, contacts, user_contact_views)
- ✅ Importer ~1000 agences
- ✅ Importer tous les contacts

### 5. Lancer l'Application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

## 🌐 Déploiement sur Vercel (10 minutes)

### 1. Préparer GitHub

```bash
# Si ce n'est pas déjà fait
git init
git add .
git commit -m "Initial commit"

# Créer un repo sur GitHub et le lier
git remote add origin https://github.com/votre-username/infinitivebyte-internship-assignment.git
git push -u origin main
```

### 2. Déployer sur Vercel

1. **Visitez [https://vercel.com/](https://vercel.com/)**
2. **Cliquez sur "Add New Project"**
3. **Importez votre repo GitHub**
4. **Configurez les variables d'environnement :**
   - Cliquez sur "Environment Variables"
   - Ajoutez TOUTES les variables de votre `.env.local` :
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
     CLERK_SECRET_KEY=sk_test_xxxxx
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
     NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
     DATABASE_URL=postgresql://...
     ```
5. **Cliquez sur "Deploy"**

⏳ Vercel va build et déployer votre app (environ 2-3 minutes).

### 3. Configurer Clerk pour Production

1. Retournez sur [Clerk Dashboard](https://dashboard.clerk.com/)
2. Allez dans votre application
3. Dans **Domains**, ajoutez votre URL Vercel :
   ```
   https://votre-app.vercel.app
   ```
4. Configurez les **Redirect URLs** :
   - Authorized redirect URLs: `https://votre-app.vercel.app/*`

### 4. Initialiser la Base de Données en Production

**Option A : Via Vercel CLI**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Exécuter les commandes
vercel env pull .env.production.local
npm run db:push
npm run db:seed
```

**Option B : Via script local**
```bash
# Utilisez votre DATABASE_URL de production
DATABASE_URL="postgresql://..." npm run db:push
DATABASE_URL="postgresql://..." npm run db:seed
```

### 5. Tester l'Application

Visitez `https://votre-app.vercel.app` et :
- ✅ Créez un compte
- ✅ Consultez les agences
- ✅ Consultez les contacts (max 50/jour)
- ✅ Vérifiez le prompt d'upgrade après 50 vues

## 🔍 Vérification Post-Déploiement

### Checklist de Test

- [ ] L'application charge correctement
- [ ] Peut créer un compte / se connecter
- [ ] Page des agences affiche les données
- [ ] Page des contacts affiche les données
- [ ] Le compteur de vues fonctionne
- [ ] Le prompt d'upgrade s'affiche après 50 vues
- [ ] Le compteur se réinitialise le lendemain

### Résolution de Problèmes Courants

**Problème : "Error connecting to database"**
- Vérifiez que `DATABASE_URL` est correcte dans Vercel
- Assurez-vous que la base de données accepte les connexions externes
- Vérifiez que vous avez exécuté `npm run db:push`

**Problème : "Clerk authentication failed"**
- Vérifiez les clés dans les variables d'environnement Vercel
- Assurez-vous d'avoir ajouté votre domaine Vercel dans Clerk Dashboard

**Problème : "No data displayed"**
- Vérifiez que vous avez exécuté `npm run db:seed`
- Vérifiez les logs Vercel pour les erreurs de base de données

## 📊 Monitoring

### Vercel Dashboard

- **Analytics** : Trafic et performance
- **Logs** : Erreurs et debugging
- **Deployments** : Historique des déploiements

### Clerk Dashboard

- **Users** : Liste des utilisateurs inscrits
- **Sessions** : Sessions actives
- **Logs** : Événements d'authentification

## 🎓 Soumission de l'Assignment

Une fois tout testé :

1. **Notez vos URLs :**
   - GitHub : `https://github.com/votre-username/infinitivebyte-internship-assignment`
   - Vercel : `https://votre-app.vercel.app`

2. **Remplissez le formulaire Google :**
   - [https://docs.google.com/forms/d/1bhz1pP3IclgOLRmUUKsRzPJQOBLmeKpPKeQiDMr8oBE](https://docs.google.com/forms/d/1bhz1pP3IclgOLRmUUKsRzPJQOBLmeKpPKeQiDMr8oBE)
   - Incluez les deux URLs
   - Ajoutez des captures d'écran si demandé

## 💡 Tips

- **Tests** : Créez plusieurs comptes pour tester les limites indépendamment
- **Données** : Les données sont randomisées, ne vous inquiétez pas des incohérences
- **Personnalisation** : N'hésitez pas à améliorer le design ou ajouter des features
- **Documentation** : Votre README et ARCHITECTURE.md montrent votre compréhension

## 🆘 Besoin d'Aide ?

- **Clerk Issues** : [Clerk Documentation](https://clerk.com/docs)
- **Next.js Issues** : [Next.js Documentation](https://nextjs.org/docs)
- **Prisma Issues** : [Prisma Documentation](https://www.prisma.io/docs)
- **Vercel Issues** : [Vercel Documentation](https://vercel.com/docs)

---

Bon courage ! 🚀
