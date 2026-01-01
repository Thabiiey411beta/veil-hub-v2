export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-spin" />
        <p className="text-gray-400">Loading Veil Hub...</p>
      </div>
    </div>
  )
}
