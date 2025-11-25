export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 border-t-gray-800 dark:border-t-gray-200 rounded-full animate-spin"></div>
            {/* Inner logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white dark:text-black font-bold text-2xl">G</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Loading...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your content
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
