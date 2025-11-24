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

  if (canView && !dbError) {
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

    ;[contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          agency: {
            select: {
              name: true,
              stateCode: true,
            },
          },
        },
        orderBy: { lastName: 'asc' },
      }),
      prisma.contact.count({ where }),
    ])
  }

  const totalPages = Math.ceil(total / perPage)

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

        {/* Header Section with Stats */}
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
            <div className="relative group">
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity ${
                viewedToday >= 50 
                  ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                  : viewedToday >= 40 
                  ? 'bg-gradient-to-br from-orange-500 to-yellow-500'
                  : 'bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500'
              }`}></div>
              
              <div className="relative bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                      viewedToday >= 50 
                        ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                        : viewedToday >= 40 
                        ? 'bg-gradient-to-br from-orange-500 to-yellow-500'
                        : 'bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                        Daily Views
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-bold ${
                          viewedToday >= 50 
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent' 
                            : viewedToday >= 40 
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {viewedToday}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">/ 50</span>
                      </div>
                    </div>
                  </div>

                  {/* Compact Badge */}
                  {viewedToday >= 50 ? (
                    <span className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                      LIMIT
                    </span>
                  ) : viewedToday >= 40 ? (
                    <span className="px-2.5 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                      WARNING
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Compact Progress Bar */}
                <div className="mb-3">
                  <div className="relative h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                        viewedToday >= 50 
                          ? 'bg-gradient-to-r from-red-500 via-orange-500 to-red-500' 
                          : viewedToday >= 40 
                          ? 'bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 dark:from-gray-300 dark:via-gray-400 dark:to-gray-300'
                      }`}
                      style={{ width: `${Math.min((viewedToday / 50) * 100, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {Math.round((viewedToday / 50) * 100)}% Used
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {remaining} Remaining
                    </span>
                  </div>
                </div>

                {/* Compact Status */}
                <div className={`flex items-center gap-2 p-2.5 rounded-xl ${
                  remaining > 0 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}>
                  {remaining > 0 ? (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className={`text-xs font-medium ${
                    remaining > 0 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {remaining > 0 
                      ? `${remaining} contact${remaining !== 1 ? 's' : ''} available` 
                      : 'Limit reached — Upgrade for more'
                    }
                  </span>
                </div>
              </div>
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
              You have viewed {viewedToday} contacts today. The free tier allows 50 contacts per day.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Upgrade to Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get unlimited access to all contacts with our premium plan
              </p>
              <button className="bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 hover:from-gray-900 hover:to-black dark:hover:from-gray-300 dark:hover:to-gray-500 text-white dark:text-black px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Upgrade Now (Coming Soon)
              </button>
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
            <div className="mb-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div>
                Showing <span className="font-semibold text-gray-900 dark:text-white">{((page - 1) * perPage) + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(page * perPage, total)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total.toLocaleString()}</span> contacts
              </div>
              {totalPages > 1 && (
                <div className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600">
                  Page {page} of {totalPages}
                </div>
              )}
            </div>

            {/* Contacts Cards Grid */}
            <div className="mb-8">
              <ContactsTable contacts={contacts} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/contacts?page=1${search ? `&search=${search}` : ''}`}
                    className={`p-2 rounded-lg border ${
                      page === 1
                        ? 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </Link>
                  {page > 1 && (
                    <Link
                      href={`/contacts?page=${page - 1}${search ? `&search=${search}` : ''}`}
                      className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium transition-all flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    
                    return (
                      <Link
                        key={pageNum}
                        href={`/contacts?page=${pageNum}${search ? `&search=${search}` : ''}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all ${
                          page === pageNum
                            ? 'bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black shadow-lg scale-110'
                            : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  })}
                </div>

                <div className="flex items-center gap-2">
                  {page < totalPages && (
                    <Link
                      href={`/contacts?page=${page + 1}${search ? `&search=${search}` : ''}`}
                      className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium transition-all flex items-center gap-2"
                    >
                      Next
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                  <Link
                    href={`/contacts?page=${totalPages}${search ? `&search=${search}` : ''}`}
                    className={`p-2 rounded-lg border ${
                      page === totalPages
                        ? 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
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
