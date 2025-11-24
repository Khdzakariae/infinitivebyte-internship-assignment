# System Architecture

## Overview

This document describes the system architecture for the Agency Dashboard application.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Homepage    │  │  Agencies    │  │  Contacts    │          │
│  │  (Public)    │  │  Page        │  │  Page        │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           │                                       │
└───────────────────────────┼───────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │             Clerk Middleware (middleware.ts)              │   │
│  │  • Protects routes                                        │   │
│  │  • Manages user sessions                                  │   │
│  │  • Provides user context                                  │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                            │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │  Server          │  │  API Routes      │                     │
│  │  Components      │  │                  │                     │
│  │                  │  │  /api/contacts/  │                     │
│  │  • Fetch data    │  │  increment-view  │                     │
│  │  • Check limits  │  │                  │                     │
│  │  • Render UI     │  │  • POST handler  │                     │
│  └────────┬─────────┘  └────────┬─────────┘                     │
│           │                      │                               │
│           │         ┌────────────┘                               │
│           │         │                                            │
│           ▼         ▼                                            │
│  ┌───────────────────────────────────────┐                      │
│  │      Business Logic Layer              │                      │
│  │                                         │                      │
│  │  lib/contact-limit.ts                  │                      │
│  │  • checkContactViewLimit()             │                      │
│  │  • incrementContactView()              │                      │
│  │  • Daily limit tracking (50/day)       │                      │
│  └─────────────────┬───────────────────────┘                      │
│                    │                                              │
└────────────────────┼──────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                           │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 Prisma ORM (lib/prisma.ts)               │   │
│  │  • Type-safe database queries                            │   │
│  │  • Connection pooling                                    │   │
│  │  • Transaction management                                │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                          │   │
│  │                                                            │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │  agencies    │  │  contacts    │  │user_contact_ │   │   │
│  │  │              │  │              │  │    views     │   │   │
│  │  │ • id         │  │ • id         │  │ • id         │   │   │
│  │  │ • name       │  │ • firstName  │  │ • userId     │   │   │
│  │  │ • state      │  │ • lastName   │  │ • viewDate   │   │   │
│  │  │ • type       │  │ • email      │  │ • viewCount  │   │   │
│  │  │ • population │  │ • phone      │  │              │   │   │
│  │  │ • website    │  │ • title      │  │              │   │   │
│  │  │ • ...        │  │ • agencyId ──┼──┼──────────┐   │   │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow

```
User → Sign In Page → Clerk Auth → Session Token → Protected Routes
```

1. User accesses application
2. Middleware checks authentication status
3. If not authenticated → Redirect to sign-in
4. If authenticated → Allow access to protected pages

### 2. Agency Viewing Flow

```
User → /agencies → Server Component → Prisma → PostgreSQL → Render Table
```

1. User navigates to agencies page
2. Server component fetches agencies (with pagination/filters)
3. Prisma queries PostgreSQL database
4. Data returned and rendered in table
5. **No limits applied** - unlimited agency viewing

### 3. Contact Viewing Flow (WITH Daily Limit)

```
User → /contacts → Check Limit → Fetch Contacts → Client Component → Increment API
         │              │              │                   │
         │              │              │                   └─→ Update view count
         │              │              └─→ Render if allowed
         │              └─→ Show upgrade prompt if exceeded
         └─→ Check user's daily view count
```

**Detailed Steps:**

1. **Check Limit** (Server-side before rendering)
   ```typescript
   const { canView, remaining, viewedToday } = await checkContactViewLimit()
   ```
   - Queries `user_contact_views` table
   - Checks if `viewCount < 50` for today
   - Returns current status

2. **Conditional Rendering**
   - If `canView === false` → Show upgrade prompt
   - If `canView === true` → Fetch and display contacts

3. **Fetch Contacts** (Only if allowed)
   ```typescript
   const contacts = await prisma.contact.findMany({
     where: {...},
     include: { agency: true },
     take: 50
   })
   ```

4. **Client-side Tracking** (ContactsTable component)
   ```typescript
   useEffect(() => {
     if (contacts.length > 0) {
       fetch('/api/contacts/increment-view', { method: 'POST' })
     }
   }, [contacts])
   ```
   - Automatically increments view count when contacts are displayed
   - Calls API route to update database

5. **Update View Count** (API route)
   ```typescript
   await prisma.userContactView.upsert({
     where: { userId_viewDate: { userId, viewDate: today } },
     update: { viewCount: { increment: 1 } },
     create: { userId, viewDate: today, viewCount: 1 }
   })
   ```

## Key Components

### Authentication (Clerk)

- **Provider**: `ClerkProvider` wraps the entire app in `layout.tsx`
- **Middleware**: `middleware.ts` protects all routes except sign-in/sign-up
- **Components**: `<SignedIn>`, `<SignedOut>`, `<UserButton>` for UI control
- **Server Functions**: `auth()` from `@clerk/nextjs/server` for server-side auth

### Daily Limit System

**Database Table: `user_contact_views`**
```prisma
model UserContactView {
  id        String   @id @default(uuid())
  userId    String   
  viewDate  DateTime 
  viewCount Int      
  
  @@unique([userId, viewDate])
}
```

**How it works:**
1. Each user has one record per day
2. `viewDate` is set to midnight (00:00:00) of current day
3. `viewCount` increments with each contact page view
4. New day = new record with count reset to 0
5. Unique constraint prevents duplicate records for same user/day

**Limit Check Logic:**
```typescript
const today = new Date()
today.setHours(0, 0, 0, 0) // Normalize to midnight

const userView = await prisma.userContactView.findUnique({
  where: { userId_viewDate: { userId, viewDate: today } }
})

const viewedToday = userView?.viewCount || 0
const canView = viewedToday < 50
const remaining = Math.max(0, 50 - viewedToday)
```

### Data Models

**Agency**
- Stores government agency information
- Searchable by name, state, type
- Has many contacts (one-to-many relationship)

**Contact**
- Employee contact information
- Linked to agency via `agencyId` foreign key
- Protected by daily view limit

**UserContactView**
- Tracks daily contact views per user
- Composite unique key: (userId, viewDate)
- Automatically manages limit enforcement

## Security Considerations

1. **Authentication**: All routes protected except public homepage and auth pages
2. **Authorization**: User ID from Clerk session used to track limits per user
3. **Data Validation**: Prisma provides type safety and validation
4. **API Protection**: API routes check authentication before processing
5. **SQL Injection**: Prevented by Prisma's query builder

## Performance Optimizations

1. **Pagination**: 50 items per page to reduce data transfer
2. **Indexing**: Database indexes on frequently queried fields
3. **Connection Pooling**: Prisma manages database connections
4. **Server Components**: Data fetching on server reduces client load
5. **Incremental Static Regeneration**: Can be added for static pages

## Scalability Considerations

1. **Database**: PostgreSQL can handle millions of records
2. **Authentication**: Clerk scales automatically
3. **Caching**: Can add Redis for view count caching
4. **CDN**: Vercel provides global CDN for static assets
5. **Horizontal Scaling**: Vercel supports serverless scaling

## Future Enhancements

1. **Payment Integration**: Stripe for premium subscriptions
2. **Advanced Search**: Full-text search with PostgreSQL
3. **Analytics**: Track usage patterns and popular agencies
4. **Export**: CSV/PDF export for contact lists
5. **Notifications**: Email when approaching daily limit
6. **Admin Panel**: Manage agencies and contacts
7. **API**: RESTful API for third-party integrations

## Deployment Architecture

```
GitHub → Vercel Build → Edge Network → Users
   │                        │
   │                        ├─→ Static Assets (CDN)
   │                        └─→ Serverless Functions
   │
   └─→ PostgreSQL Database (Neon/Supabase/Railway)
```

**Components:**
- **GitHub**: Version control and CI/CD trigger
- **Vercel**: Build, deploy, and serve application
- **Edge Network**: Global CDN for fast delivery
- **Serverless Functions**: API routes and server components
- **PostgreSQL**: Hosted database (separate service)

## Error Handling

1. **Database Errors**: Caught and logged, user sees friendly message
2. **Auth Errors**: Redirect to sign-in page
3. **Limit Exceeded**: Show upgrade prompt instead of error
4. **Network Errors**: Retry logic for API calls
5. **Validation Errors**: Form validation with helpful messages

---

This architecture provides a solid foundation for a scalable, secure, and maintainable dashboard application with fine-grained access control and user limit tracking.
