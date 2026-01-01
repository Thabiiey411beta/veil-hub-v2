'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-4">Page not found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg font-semibold transition-all"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
