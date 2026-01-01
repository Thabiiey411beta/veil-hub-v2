'use client'

import { useEffect } from 'react'

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg font-semibold transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
