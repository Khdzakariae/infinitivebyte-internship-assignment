'use client'

import { useEffect, useState } from 'react'

interface StatsProps {
  agencies: number
  contacts: number
  states: number
}

export default function AnimatedStats() {
  const [stats, setStats] = useState<StatsProps>({ agencies: 0, contacts: 0, states: 0 })
  const [displayStats, setDisplayStats] = useState<StatsProps>({ agencies: 0, contacts: 0, states: 0 })

  useEffect(() => {
    // Fetch real stats with fallback
    fetch('/api/stats')
      .then(res => {
        if (!res.ok) {
          // Return fallback stats instead of throwing
          return { agencies: 922, contacts: 999, states: 50 }
        }
        return res.json()
      })
      .then(data => {
        if (data && typeof data === 'object' && 'agencies' in data) {
          setStats(data)
        } else {
          setStats({ agencies: 922, contacts: 999, states: 50 })
        }
      })
      .catch(() => {
        // Silently use fallback stats
        setStats({ agencies: 922, contacts: 999, states: 50 })
      })
  }, [])

  useEffect(() => {
    // Animate numbers
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setDisplayStats({
        agencies: Math.floor(stats.agencies * progress),
        contacts: Math.floor(stats.contacts * progress),
        states: Math.floor(stats.states * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setDisplayStats(stats)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [stats])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {displayStats.agencies.toLocaleString()}+
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
            Government Agencies
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Across all US states
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {displayStats.contacts.toLocaleString()}+
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
            Contact Records
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Verified and updated
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {displayStats.states}+
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
            US States Covered
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coast to coast coverage
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
