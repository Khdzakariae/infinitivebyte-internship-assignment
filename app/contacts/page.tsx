import { prisma } from '@/lib/prisma'
import { checkContactViewLimit } from '@/lib/contact-limit'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactsTable from './ContactsTable'
import BackgroundShapes from '@/components/BackgroundShapes'

interface ContactsPageProps {
  searchParams: Promise<{ page?: string; search?: string }>
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const search = params.search || ''
  const perPage = 50
  const MAX_CONTACTS_PER_DAY = 50 // Limite de 50 contacts par jour

  let canView = false
  let remaining = 0
  let viewedToday = 0
  let dbError = false

  try {
    const limitCheck = await checkContactViewLimit()
    canView = limitCheck.canView
    remaining = limitCheck.remaining
    viewedToday = limitCheck.viewedToday
  } catch (error) {
    console.error('Database connection error:', error)
    dbError = true
  }

  let contacts: any[] = []
  let total = 0
  let actualTotal = 0
  
  // L'utilisateur ne peut voir que la page 1 (50 contacts par jour)
  const isPageLocked = page > 1

  if (canView && !dbError && !isPageLocked) {
    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { title: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}

    // Compter le total réel
    actualTotal = await prisma.contact.count({ where })
    total = Math.min(actualTotal, MAX_CONTACTS_PER_DAY)

    // Charger seulement les 50 premiers contacts (page 1 uniquement)
    contacts = await prisma.contact.findMany({
      where,
      skip: 0,
      take: MAX_CONTACTS_PER_DAY,
      include: {
        agency: {
          select: {
            name: true,
            stateCode: true,
          },
        },
      },
      orderBy: { lastName: 'asc' },
    })
  } else if (canView && !dbError && isPageLocked) {
    // Si la page est verrouillée, compter quand même le total
    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { title: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}
    actualTotal = await prisma.contact.count({ where })
    total = actualTotal
  }

  const totalPages = Math.ceil(actualTotal / perPage)
  const maxUnlockedPages = 1 // Seulement 1 page déverrouillée (50 contacts)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden">
      {/* Animated Background Shapes */}
      <BackgroundShapes opacity="20" />
      <div className="relative z-10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Database Error Message */}
        {dbError && (
          <div className="mb-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-3">
                  Database Connection Error
                </h2>
                <p className="text-red-800 dark:text-red-300 mb-4 text-lg">
                  Unable to connect to MongoDB Atlas. Please configure network access:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-red-700 dark:text-red-300 mb-6">
                  <li>Go to <a href="https://cloud.mongodb.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-red-900 dark:hover:text-red-100">cloud.mongodb.com</a></li>
                  <li>Navigate to <strong>Network Access</strong></li>
                  <li>Click <strong>Add IP Address</strong></li>
                  <li>Select <strong>Allow Access From Anywhere</strong> (0.0.0.0/0)</li>
                  <li>Click <strong>Confirm</strong> and wait 1-2 minutes</li>
                  <li>Refresh this page</li>
                </ol>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Technical details:</strong> Server selection timeout - MongoDB Atlas is unreachable
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Agency Contacts
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Access contact information for agency employees
              </p>
            </div>
          </div>
        </div>

        {!canView ? (
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center shadow-xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Daily Limit Reached
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              You have reached your daily limit of <strong>50 contacts</strong>. The free tier allows viewing up to 50 contacts per day. Come back tomorrow or upgrade for unlimited access.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Upgrade to Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get unlimited access to all contacts with our premium plan
              </p>
              <Link
                href="/upgrade"
                className="inline-block bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 hover:from-gray-900 hover:to-black dark:hover:from-gray-300 dark:hover:to-gray-500 text-white dark:text-black px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <form className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search Contacts</h2>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search by name, email, or title..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 hover:from-gray-900 hover:to-black dark:hover:from-gray-300 dark:hover:to-gray-500 text-white dark:text-black px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
                <Link
                  href="/contacts"
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </Link>
              </div>
            </form>

            {/* Results Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div>
                  Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">{total}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total.toLocaleString()}</span> contacts
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-400 text-white dark:text-black px-3 py-1 rounded-full font-semibold shadow-lg">
                    Page 1 of 1
                  </div>
                  <div className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full font-semibold border border-amber-300 dark:border-amber-700">
                    50 Contacts/Day Limit
                  </div>
                </div>
              </div>
              {actualTotal > MAX_CONTACTS_PER_DAY && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-300 dark:border-amber-700 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                      Limited View - Free Tier
                    </p>
                    <p className="text-xs text-amber-800 dark:text-amber-300">
                      Free tier allows viewing <strong>50 contacts per day</strong>. There are <strong>{actualTotal.toLocaleString()}</strong> total contacts available. Upgrade to Premium for unlimited daily access to all contacts across multiple pages.
                    </p>
                  </div>
                  <Link
                    href="/upgrade"
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    Upgrade
                  </Link>
                </div>
              )}
            </div>

            {/* Contacts Cards Grid */}
            <div className="mb-8">
              <ContactsTable contacts={contacts} />
            </div>

            {/* Pagination System */}
            {isPageLocked ? (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-8 text-center shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  🔒 Page {page} Locked
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  Free tier users can only view <strong>50 contacts per day</strong>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Page 1 available • Pages 2-{totalPages} require Premium
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">Page Access Status:</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = i + 1
                      return (
                        <div key={pageNum} className="relative">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                            pageNum === 1
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                              : pageNum === page
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg ring-4 ring-red-200 dark:ring-red-800'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                          }`}>
                            {pageNum}
                          </div>
                          {pageNum > 1 && (
                            <div className="absolute -top-1 -right-1">
                              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {totalPages > 5 && (
                      <div className="text-gray-400 dark:text-gray-500 font-bold">
                        ... +{totalPages - 5}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ✅ Page 1 Available (Free) • 🔒 Pages 2+ Locked (Premium Only)
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    ⚡ Unlock All Pages Instantly
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Upgrade to Premium to access all {totalPages} pages immediately without waiting
                  </p>
                  <Link
                    href="/upgrade"
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-3"
                  >
                    Upgrade to Premium
                  </Link>
                  <Link
                    href="/contacts"
                    className="block w-full text-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    ← Back to Unlocked Pages
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free Tier • <strong>1 page available</strong> (50 contacts per day)
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-lg font-bold transition-all bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black shadow-lg">
                    1
                  </div>
                  
                  {totalPages > 1 && (
                    <>
                      <div className="relative w-12 h-12 flex items-center justify-center rounded-lg font-bold transition-all bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50">
                        2
                        <svg className="absolute -top-1 -right-1 w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="relative w-12 h-12 flex items-center justify-center rounded-lg font-bold transition-all bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50">
                        3
                        <svg className="absolute -top-1 -right-1 w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {totalPages > 3 && (
                        <div className="text-gray-400 dark:text-gray-500 font-bold text-lg">
                          ... +{totalPages - 3}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {totalPages > 1 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <strong>{totalPages} total pages</strong> available with Premium
                    </p>
                    <Link
                      href="/upgrade"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black text-sm font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Unlock All Pages
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      </div>
    </div>
  )
}
