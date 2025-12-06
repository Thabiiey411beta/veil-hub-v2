export default function Vaults() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Vaults
        </h1>
        <p className="text-xl text-gray-300 mb-8">ERC-4626 vaults with leveraged strategies</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['USDC Vault', 'wstETH Vault', 'cbBTC Vault'].map((vault) => (
            <div key={vault} className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">{vault}</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}