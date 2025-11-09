import Link from 'next/link'
import Header from '@/components/Header'
import { AlertTriangle } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
          <p className="text-gray-600 mb-8">
            Sorry, you don&apos;t have permission to access this page. The requested page is either restricted or doesn&apos;t exist.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-indigo-800 from-25% to-purple-600 hover:from-pink-500 hover:to-orange-500 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

