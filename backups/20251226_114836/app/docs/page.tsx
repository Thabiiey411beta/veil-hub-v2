export default function Docs() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Documentation
        </h1>
        <div className="space-y-6 text-gray-300">
          <h2 className="text-3xl font-bold">Supra L1 Resources</h2>
          <ul className="space-y-2">
            <li><a href="https://docs.supra.com" target="_blank" className="text-cyan-400 hover:underline">Supra Documentation</a></li>
            <li><a href="https://suprascan.io" target="_blank" className="text-cyan-400 hover:underline">SupraScan Explorer</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}