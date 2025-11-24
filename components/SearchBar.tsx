'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'agencies' | 'contacts'>('agencies')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${searchType}?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 rounded-2xl blur-2xl opacity-30"></div>
      <form onSubmit={handleSearch} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Search Type Selector */}
          <div className="flex border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setSearchType('agencies')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                searchType === 'agencies'
                  ? 'bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="hidden sm:inline">Agencies</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setSearchType('contacts')}
              className={`flex-1 px-6 py-4 font-medium transition-all ${
                searchType === 'contacts'
                  ? 'bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 text-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden sm:inline">Contacts</span>
              </div>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative flex items-center">
            <svg className="absolute left-6 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${searchType === 'agencies' ? 'agencies by name or location' : 'contacts by name, email or title'}...`}
              className="w-full pl-14 pr-4 py-5 text-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 hover:from-gray-900 hover:to-black dark:hover:from-gray-300 dark:hover:to-gray-500 text-white dark:text-black font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">Popular searches:</span>
        {searchType === 'agencies' ? (
          <>
            <button
              onClick={() => { setQuery('California'); handleSearch(new Event('submit') as any) }}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              California
            </button>
            <button
              onClick={() => { setQuery('New York'); handleSearch(new Event('submit') as any) }}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              New York
            </button>
            <button
              onClick={() => { setQuery('Texas'); handleSearch(new Event('submit') as any) }}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Texas
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setQuery('Director'); handleSearch(new Event('submit') as any) }}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Director
            </button>
            <button
              onClick={() => { setQuery('Manager'); handleSearch(new Event('submit') as any) }}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Manager
            </button>
          </>
        )}
      </div>
    </div>
  )
}
