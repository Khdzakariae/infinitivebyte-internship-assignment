import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedStats from "@/components/AnimatedStats";
import SearchBar from "@/components/SearchBar";
import BackgroundShapes from "@/components/BackgroundShapes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden">
      {/* Animated Background Shapes */}
      <BackgroundShapes opacity="30" />
      <div className="relative z-10">
      <Navbar />

      <SignedOut>
        {/* Hero Section - Premium SaaS Style */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full">
                <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Trusted by government professionals</span>
              </div>
            </div>

            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                Government Data
                <span className="block text-gray-900 dark:text-white mt-2">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Access 900+ agencies and 1000+ verified contacts in seconds. 
                <span className="block mt-2 font-medium text-gray-700 dark:text-gray-200">The modern platform for government research.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <SignInButton mode="modal">
                  <button className="group relative bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-gray-900/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Free Trial
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-gray-700 dark:bg-gray-300 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </button>
                </SignInButton>
                <a href="#features" className="group text-gray-700 dark:text-gray-300 px-10 py-5 rounded-2xl text-lg font-bold border-2 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2">
                  See How It Works
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">50 free views daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Setup in 30 seconds</span>
                </div>
              </div>
            </div>

            {/* Animated Stats */}
            <div className="mt-24">
              <AnimatedStats />
            </div>

            {/* Search Bar Preview */}
            <div className="mt-16">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Features Section - SaaS Style */}
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full mb-6">
                <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Features</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                Everything you need.<br />
                <span className="text-gray-900 dark:text-white">Nothing you don't.</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Built for professionals who need fast, reliable access to government data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-700/50 dark:shadow-gray-300/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Agency Directory
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse through 900+ government agencies with detailed information including population, location, and contact details.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-700/50 dark:shadow-gray-300/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Contact Database
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access verified contact information for government employees, including emails, phone numbers, and titles.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-700/50 dark:shadow-gray-300/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Advanced Search
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Find exactly what you need with powerful search and filtering capabilities across all data.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-slate-500/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Secure Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enterprise-grade security with authentication and user management powered by Clerk.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-700/50 dark:shadow-gray-300/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Built with Next.js 16 and MongoDB for blazing fast performance and seamless user experience.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-700/50 dark:shadow-gray-300/50">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Smart Limits
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fair usage with 50 contact views per day on the free tier, with upgrade options available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Premium SaaS Style */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden bg-black dark:bg-black rounded-[3rem] p-16 shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gray-900/50 dark:bg-gray-900/50 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-800/50 dark:bg-gray-800/50 rounded-full -ml-40 -mb-40 blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/20 backdrop-blur-sm border border-white/30 dark:border-white/30 rounded-full mb-8">
                  <span className="w-2 h-2 bg-white dark:bg-white rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-white dark:text-white">Join 1000+ professionals</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-extrabold text-white dark:text-white mb-6 leading-tight">
                  Start accessing government<br />data in 30 seconds
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                  No credit card required. No setup fees. Start with 50 free daily views.<br />
                  <span className="font-semibold text-white dark:text-white">Upgrade anytime for unlimited access.</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <SignInButton mode="modal">
                    <button className="group bg-white dark:bg-white text-black dark:text-black px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-white/50 dark:hover:shadow-white/50 hover:scale-105 transition-all duration-300 hover:-translate-y-1">
                      <span className="flex items-center gap-2">
                        Get Started Free
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </SignInButton>
                  <a href="#features" className="text-white dark:text-white px-10 py-5 rounded-2xl text-lg font-bold border-2 border-white/40 dark:border-white/40 hover:bg-white/10 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                    Learn More
                  </a>
                </div>

                {/* Mini Stats */}
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white dark:text-white mb-2">922</div>
                    <div className="text-gray-200 dark:text-gray-200 text-sm font-medium">Agencies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white dark:text-white mb-2">999</div>
                    <div className="text-gray-200 dark:text-gray-200 text-sm font-medium">Contacts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white dark:text-white mb-2">50+</div>
                    <div className="text-gray-200 dark:text-gray-200 text-sm font-medium">States</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SignedOut>

      <SignedIn>
        {/* Dashboard for signed-in users */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Welcome Back! 👋
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Access your agency and contact data
              </p>
            </div>

            {/* Animated Stats for Signed In Users */}
            <div className="mb-16">
              <AnimatedStats />
            </div>

            {/* Search Bar for Signed In Users */}
            <div className="mb-16">
              <SearchBar />
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Access
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Jump directly to your most used sections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Link
                href="/agencies"
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 p-8 rounded-3xl shadow-2xl hover:shadow-gray-800/50 dark:hover:shadow-gray-300/50 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    Agencies
                  </h3>
                  <p className="text-gray-200 dark:text-gray-700 mb-4">
                    Browse 920+ government agencies with detailed information
                  </p>
                  <div className="inline-flex items-center text-white font-semibold">
                    Explore Now 
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link
                href="/contacts"
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 dark:from-gray-200 dark:to-gray-400 p-8 rounded-3xl shadow-2xl hover:shadow-gray-800/50 dark:hover:shadow-gray-300/50 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    Contacts
                  </h3>
                  <p className="text-gray-200 dark:text-gray-700 mb-4">
                    Access 1000+ verified contacts (50 views/day limit)
                  </p>
                  <div className="inline-flex items-center text-white font-semibold">
                    View Contacts 
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </SignedIn>

      <Footer />
      </div>
    </div>
  );
}
