export default function Protocol() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Protocol Overview
        </h1>
        <div className="space-y-6 text-gray-300">
          <p className="text-xl">Veil Hub v14 - The Final DeFi Organism on Supra L1</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Zero Liquidation</h2>
              <p>Borrow at 5.5% fixed APR with 180% minimum collateral. No liquidations ever.</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Perpetual Yield</h2>
              <p>Earn 6-25% USDC APY through Immortal Shares and LP VACUUM strategies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}