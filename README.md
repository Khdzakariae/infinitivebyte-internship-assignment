# Agency Dashboard - Internship Assignment

A modern web application for managing government agencies and contacts with authentication and daily viewing limits.

##  Features

- **User Authentication**: Secure authentication powered by Clerk
- **Agency Management**: Browse and search through 1000+ government agencies
- **Contact Management**: View contact information with intelligent daily limits
- **Daily View Limit**: Free tier allows 50 contact views per day
- **Upgrade Prompt**: Prompts users when daily limit is reached
- **Responsive Design**: Beautiful UI with Tailwind CSS that works on all devices
- **Database**: PostgreSQL with Prisma ORM for robust data management

##  Requirements

- Node.js 18+ 
- PostgreSQL database
- Clerk account (free tier available)

##  Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd infinitivebyte-internship-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the following variables:

#### Clerk Authentication
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your publishable and secret keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### Database
Set up a PostgreSQL database (local or cloud):

**Option A: Local PostgreSQL**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/agency_dashboard?schema=public"
```

**Option B: Cloud PostgreSQL (Recommended)**
- [Neon](https://neon.tech/) - Free tier with instant setup
- [Supabase](https://supabase.com/) - Free tier with dashboard
- [Railway](https://railway.app/) - Free tier

### 4. Initialize the database

```bash
# Push the schema to your database
npm run db:push

# Import CSV data (agencies and contacts)
npm run db:seed
```

This will:
- Create the database tables
- Import ~1000 agencies from `data/agencies_agency_rows.csv`
- Import contacts from `data/contacts_contact_rows.csv`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Project Structure

```
infinitivebyte-internship-assignment/
├── app/
│   ├── agencies/           # Agencies listing page
│   ├── contacts/           # Contacts listing page (with limit)
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout with Clerk provider
│   └── page.tsx            # Home page
├── data/                   # CSV data files
│   ├── agencies_agency_rows.csv
│   └── contacts_contact_rows.csv
├── lib/
│   ├── prisma.ts           # Prisma client instance
│   └── contact-limit.ts    # Daily contact view limit logic
├── prisma/
│   └── schema.prisma       # Database schema
├── scripts/
│   └── seed.ts             # CSV import script
└── middleware.ts           # Clerk authentication middleware
```

##  Key Features Explained

### Daily Contact View Limit

The application implements a 50-contacts-per-day viewing limit for free users:

1. **Tracking**: Uses `UserContactView` table to track daily views per user
2. **Check**: Before displaying contacts, checks if user has remaining views
3. **Increment**: When contacts are viewed, increments the counter via API
4. **Reset**: Automatically resets at midnight (tracked by date)
5. **Upgrade Prompt**: Shows upgrade page when limit is reached

### Authentication

- Clerk handles all authentication (sign in, sign up, user management)
- Protected routes using Clerk middleware
- User sessions managed automatically

### Data Management

- Agencies: ~1000 government agencies with details
- Contacts: Employee contact information linked to agencies
- Search and filtering capabilities
- Pagination for large datasets

##  Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Deployment**: Vercel (recommended)

##  Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
5. Deploy!

### Post-Deployment

After deployment, run the database setup:

```bash
# Connect to your production database
npm run db:push

# Seed the data
npm run db:seed
```

## 📊 System Architecture

See `ARCHITECTURE.md` for the system design flowchart and detailed architecture documentation.

##  Testing

1. **Sign Up**: Create a new account
2. **View Agencies**: Browse agencies without limits
3. **View Contacts**: View up to 50 contacts
4. **Hit Limit**: Try to view contacts after 50 views
5. **Next Day**: Limit resets automatically

##  Assignment Completion

This project fulfills all requirements:

- ✅ User authentication (Clerk)
- ✅ View all agencies
- ✅ 50 contacts per day limit
- ✅ Upgrade prompt when limit exceeded
- ✅ Separate table pages for agencies and contacts
- ✅ Next.js 16 framework
- ✅ Clerk authentication
- ✅ Deployed to Vercel
- ✅ GitHub repository
- ✅ System design diagram

## 📝 License

This project was created as an internship assignment for Infinitive Byte.

## 👤 Author

EL-KHADIR ZAKARIAE
