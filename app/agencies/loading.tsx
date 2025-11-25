export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-gray-200 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-200 rounded-full animate-spin"></div>
            {/* Inner logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white dark:text-black font-bold text-xl sm:text-2xl">G</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Loading Agencies...
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Fetching government agencies data
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          <div className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
