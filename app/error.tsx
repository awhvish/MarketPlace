'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-full">
              <AlertCircle className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified and we&apos;re working on it.
          </p>
          
          {/* Error Details */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 mt-6">
            <p className="text-sm text-gray-500 font-mono">
              Error: {error.message || 'Unknown error occurred'}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg h-12 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
          >
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800 font-medium rounded-lg h-12 px-6 transition-all duration-300 flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-zinc-800">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
