'use client';

import { useState } from 'react';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Veil Finance
          </h1>
          <p className="text-2xl text-gray-300">
            Pure, Unregulated, Maximalist DeFi Organism
          </p>
          <p className="text-gray-400 mt-2">
            100% Supra L1 Native • Zero KYC • Zero Compliance • Real Yield Forever
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          {['overview', 'perps', 'vaults', 'shadow-gas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">🌑</div>
              <h3 className="text-xl font-bold mb-2">Ghost Borrowing</h3>
              <p className="text-gray-400 mb-4">Zero-liquidation loans at 5.5% APR with ZK privacy</p>
              <div className="text-3xl font-bold text-cyan-400">5.5% APR</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-xl font-bold mb-2">Perpetual DEX</h3>
              <p className="text-gray-400 mb-4">Private perps with 5 bps fees</p>
              <div className="text-3xl font-bold text-purple-400">50x Leverage</div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-2">👻</div>
              <h3 className="text-xl font-bold mb-2">Ghost Vaults</h3>
              <p className="text-gray-400 mb-4">ZK-private auto-compounding strategies</p>
              <div className="text-3xl font-bold text-green-400">15-40% APY</div>
            </div>
          </div>
        )}

        {/* Perps Tab */}
        {activeTab === 'perps' && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Perpetual Trading</h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-gray-400 mb-2">Trading Fee</div>
                <div className="text-2xl font-bold">5 bps (0.05%)</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Max Leverage</div>
                <div className="text-2xl font-bold">50x</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Liquidation</div>
                <div className="text-2xl font-bold">90%</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Privacy</div>
                <div className="text-2xl font-bold text-cyan-400">ZK-Private</div>
              </div>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-gray-300">
                🚀 <strong>Coming Q2 2026:</strong> First truly private perpetual DEX on Supra L1
              </p>
            </div>
          </div>
        )}

        {/* Vaults Tab */}
        {activeTab === 'vaults' && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Ghost Vaults</h2>
            <div className="space-y-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">ETH Delta-Neutral</h3>
                  <span className="text-2xl font-bold text-green-400">18-25% APY</span>
                </div>
                <p className="text-gray-400">Long wstETH + Short ETH perp = capture funding rate</p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">BTC Basis Trade</h3>
                  <span className="text-2xl font-bold text-green-400">12-20% APY</span>
                </div>
                <p className="text-gray-400">Long cbBTC + Short BTC perp = pure basis capture</p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Leveraged LST</h3>
                  <span className="text-2xl font-bold text-green-400">25-40% APY</span>
                </div>
                <p className="text-gray-400">Recursive wstETH staking with auto-compounding</p>
              </div>
            </div>
          </div>
        )}

        {/* Shadow Gas Tab */}
        {activeTab === 'shadow-gas' && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Shadow Gas (Privacy Tax)</h2>
            <div className="mb-8">
              <div className="text-6xl font-bold text-cyan-400 mb-2">120,000</div>
              <div className="text-gray-400">Shadow Gas per 1 VEIL burned</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-300">Private Deposit</span>
                <span className="font-bold">1,000 Shadow Gas</span>
              </div>
              <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-300">Private Borrow</span>
                <span className="font-bold">2,500 Shadow Gas</span>
              </div>
              <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-300">Private Trade</span>
                <span className="font-bold">500 Shadow Gas</span>
              </div>
              <div className="flex justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-300">Private Withdraw</span>
                <span className="font-bold">1,500 Shadow Gas</span>
              </div>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-gray-300">
                💀 <strong>The more you hide, the more VEIL burns.</strong> Shadow Gas expires in 90 days.
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 mb-2">Projected USDC Yield</div>
            <div className="text-3xl font-bold">22-35% APR</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 mb-2">Yearly VEIL Burn</div>
            <div className="text-3xl font-bold">280-380M</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 mb-2">Supply Reduction</div>
            <div className="text-3xl font-bold">28-38%</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 rounded-2xl p-6">
            <div className="text-gray-400 mb-2">Launch</div>
            <div className="text-3xl font-bold">Q1 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}
