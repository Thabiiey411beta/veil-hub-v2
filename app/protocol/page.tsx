export default function Protocol() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Protocol Overview
        </h1>
        <div className="space-y-8 text-gray-300">
          <p className="text-xl">Veil Hub v14 - Fully Automated DeFi on Supra L1</p>
          
          <div className="p-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">⚡ Powered by Supra Automation</h2>
            <p className="mb-4">Veil Hub runs autonomously using Supra's native automation engine:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Auto-Repay:</strong> Debt positions automatically repaid when collateral drops</li>
              <li><strong>Auto-Harvest:</strong> LP VACUUM yields harvested weekly without manual intervention</li>
              <li><strong>Auto-Rebalance:</strong> Withdrawal buffers maintained automatically</li>
              <li><strong>Zero Downtime:</strong> Executed directly by Supra validators, no external bots</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">🛡️ Zero Liquidation</h2>
              <p>Borrow at 5.5% fixed APR with 180% minimum collateral. Supra Automation prevents liquidations by auto-repaying from vault yields.</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">💎 Perpetual Yield</h2>
              <p>Earn 6-25% USDC APY through Immortal Shares. LP VACUUM automatically harvests and distributes yields every week.</p>
            </div>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-3">How Automation Works</h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Tasks registered once on Supra Automation Registry</li>
              <li>Validators check conditions at end of each block</li>
              <li>Actions execute automatically when conditions met</li>
              <li>No external relayers or keeper bots required</li>
              <li>Fees paid transparently from protocol treasury</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}