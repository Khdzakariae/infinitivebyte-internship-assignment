import { SignUp } from '@clerk/nextjs'
import BackgroundShapes from '@/components/BackgroundShapes'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 py-12 relative overflow-hidden">
      <BackgroundShapes />
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Get started with your dashboard
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800",
                headerTitle: "text-gray-900 dark:text-white font-bold text-xl",
                headerSubtitle: "text-gray-500 dark:text-gray-400",
                socialButtonsBlockButton: "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                socialButtonsBlockButtonText: "text-gray-700 dark:text-gray-300",
                dividerLine: "bg-gray-300 dark:bg-gray-700",
                dividerText: "text-gray-500 dark:text-gray-400",
                formButtonPrimary: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 shadow-lg font-semibold",
                footerActionLink: "text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 font-semibold",
                footerActionText: "text-gray-600 dark:text-gray-400",
                formFieldInput: "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white",
                formFieldLabel: "text-gray-900 dark:text-white font-semibold",
                formFieldInputShowPasswordButton: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                identityPreviewText: "text-gray-900 dark:text-white",
                identityPreviewEditButton: "text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200",
                formHeaderTitle: "text-gray-900 dark:text-white",
                formHeaderSubtitle: "text-gray-600 dark:text-gray-400",
                otpCodeFieldInput: "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white",
                formResendCodeLink: "text-gray-900 dark:text-white hover:text-black",
                footer: "hidden",
              }
            }}
            fallbackRedirectUrl="/"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  )
}
