'use client'

import { useEffect } from 'react'

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
  title: string | null
  department: string | null
  agency: {
    name: string
    stateCode: string | null
  } | null
}

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
  useEffect(() => {
    // Increment view count when contacts are viewed
    if (contacts.length > 0) {
      fetch('/api/contacts/increment-view', { method: 'POST' })
    }
  }, [contacts])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 h-2"></div>
          <div className="p-6">
            {/* Name and Title Section */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-full flex items-center justify-center text-white dark:text-black font-bold text-lg shadow-lg">
                  {contact.firstName[0]}{contact.lastName[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  {contact.title && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {contact.title}
                    </p>
                  )}
                </div>
              </div>
              {contact.department && (
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-600">
                  {contact.department}
                </span>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group/email"
                >
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover/email:bg-gray-200 dark:group-hover/email:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium truncate flex-1">{contact.email}</span>
                </a>
              ) : (
                <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>No email available</span>
                </div>
              )}

              {contact.phone ? (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group/phone"
                >
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover/phone:bg-gray-200 dark:group-hover/phone:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="font-medium">{contact.phone}</span>
                </a>
              ) : (
                <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-600">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>No phone available</span>
                </div>
              )}
            </div>

            {/* Agency Info */}
            {contact.agency && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">{contact.agency.name}</span>
                    {contact.agency.stateCode && (
                      <span className="text-xs ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                        {contact.agency.stateCode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
