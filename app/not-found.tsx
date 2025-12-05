'use client'

import { Button } from '@/components/ui/button'
import { FileQuestion, Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-full">
              <FileQuestion className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-3">
          <p className="text-sm text-gray-400 font-medium">You might want to:</p>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>• Check the URL for typos</li>
            <li>• Return to the homepage</li>
            <li>• Browse our art collection</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg h-12 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/product">
            <Button
              variant="outline"
              className="bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800 font-medium rounded-lg h-12 px-6 transition-all duration-300 flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Browse Artworks
            </Button>
          </Link>
        </div>

        {/* Fun Animation */}
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span>Lost in the digital art space</span>
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse delay-100"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
