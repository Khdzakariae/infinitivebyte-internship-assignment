import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundShapes from '@/components/BackgroundShapes'

interface AgenciesPageProps {
  searchParams: Promise<{ page?: string; search?: string; state?: string; type?: string }>
}

export default async function AgenciesPage({ searchParams }: AgenciesPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const search = params.search || ''
  const state = params.state || ''
  const type = params.type || ''
  const perPage = 50

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { county: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(state && { stateCode: state }),
    ...(type && { type }),
  }

  let agencies: any[] = []
  let total = 0
  let dbError = false

  try {
    [agencies, total] = await Promise.all([
      prisma.agency.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { name: 'asc' },
      }),
      prisma.agency.count({ where }),
    ])
  } catch (error) {
    console.error('Database connection error:', error)
    dbError = true
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
                    <strong>Technical details:</strong> Server selection timeout - All MongoDB Atlas replica set members are unreachable (SSL/TLS error)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section with Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Government Agencies
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Browse through {total.toLocaleString()} agencies across the United States
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 px-6 py-4 rounded-xl shadow-lg border border-gray-600 dark:border-gray-400 text-center">
                <div className="text-3xl font-bold text-white dark:text-black">{total.toLocaleString()}</div>
                <div className="text-sm text-gray-100 dark:text-gray-700 font-medium">Total Agencies</div>
              </div>
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 px-6 py-4 rounded-xl shadow-lg border border-gray-600 dark:border-gray-400 text-center">
                <div className="text-3xl font-bold text-white dark:text-black">{totalPages}</div>
                <div className="text-sm text-gray-100 dark:text-gray-700 font-medium">Pages</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <form className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search & Filter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search by name or county
              </label>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="e.g., San Francisco..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State Code
              </label>
              <input
                type="text"
                name="state"
                defaultValue={state}
                placeholder="CA, NY, TX..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                name="type"
                defaultValue={type}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Types</option>
                <option value="City">City</option>
                <option value="County">County</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 hover:from-gray-900 hover:to-black dark:hover:from-gray-300 dark:hover:to-gray-500 text-white dark:text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Apply Filters
            </button>
            <Link
              href="/agencies"
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
        <div className="mb-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing <span className="font-semibold text-gray-900 dark:text-white">{((page - 1) * perPage) + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(page * perPage, total)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total.toLocaleString()}</span> results
          </div>
          <div className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600">
            Page {page} of {totalPages}
          </div>
        </div>

        {/* Agencies Cards Grid - Modern Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 h-2"></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {agency.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{agency.state} ({agency.stateCode})</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-600">
                    {agency.type}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {agency.county && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="font-medium">County:</span> {agency.county}
                    </div>
                  )}
                  {agency.population && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium">Population:</span> {agency.population.toLocaleString()}
                    </div>
                  )}
                </div>

                {agency.website && (
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-semibold text-sm transition-colors group/link"
                  >
                    <span>Visit Website</span>
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Link
                href={`/agencies?page=1${search ? `&search=${search}` : ''}${state ? `&state=${state}` : ''}${type ? `&type=${type}` : ''}`}
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
                  href={`/agencies?page=${page - 1}${search ? `&search=${search}` : ''}${state ? `&state=${state}` : ''}${type ? `&type=${type}` : ''}`}
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
                    href={`/agencies?page=${pageNum}${search ? `&search=${search}` : ''}${state ? `&state=${state}` : ''}${type ? `&type=${type}` : ''}`}
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
                  href={`/agencies?page=${page + 1}${search ? `&search=${search}` : ''}${state ? `&state=${state}` : ''}${type ? `&type=${type}` : ''}`}
                  className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium transition-all flex items-center gap-2"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
              <Link
                href={`/agencies?page=${totalPages}${search ? `&search=${search}` : ''}${state ? `&state=${state}` : ''}${type ? `&type=${type}` : ''}`}
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
      </main>

      <Footer />
      </div>
    </div>
  )
}
