'use client'

import React from 'react'
import { GradientCard, AnimatedBadge } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

export default function ProtocolPage() {
  const contracts = [
    {
      name: 'VeilHub',
      address: '0x1234...5678',
      description: 'Main protocol coordinator',
      status: 'Active',
      functions: 15,
    },
    {
      name: 'DebtEngine',
      address: '0x2345...6789',
      description: 'Zero-liquidation borrowing',
      status: 'Active',
      functions: 12,
    },
    {
      name: 'ImmortalReserve',
      address: '0x3456...7890',
      description: 'Perpetual dividend distribution',
      status: 'Active',
      functions: 10,
    },
    {
      name: 'VeilVault',
      address: '0x4567...8901',
      description: 'ERC-4626 vault implementation',
      status: 'Active',
      functions: 18,
    },
    {
      name: 'VeVEIL',
      address: '0x5678...9012',
      description: 'Vote-escrowed governance token',
      status: 'Active',
      functions: 14,
    },
    {
      name: 'BuybackEngine',
      address: '0x6789...0123',
      description: 'Automated buyback and burn',
      status: 'Active',
      functions: 8,
    },
  ]

  const features = [
    { title: 'Zero-Liquidation', desc: 'Borrow without liquidation risk', icon: '🛡️' },
    { title: 'Perpetual Yield', desc: '12-25% APY for Immortal holders', icon: '💰' },
    { title: 'veVEIL Governance', desc: 'Vote-escrowed governance token', icon: '🗳️' },
    { title: 'ERC-4626 Vaults', desc: 'Standardized vault interface', icon: '🏦' },
    { title: 'Buyback & Burn', desc: 'Deflationary mechanism', icon: '🔥' },
    { title: 'Supra Integration', desc: 'Oracle, AutoFi, dVRF', icon: '⛓️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Protocol Overview</h1>
          <p className="text-[#B0B0B0]">Smart contract architecture and integration details</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Total Contracts</div>
            <div className="text-3xl font-bold text-[#FFD700]">6</div>
          </GradientCard>
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Total Functions</div>
            <div className="text-3xl font-bold text-[#FFD700]">77</div>
          </GradientCard>
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Network</div>
            <div className="text-lg font-bold text-[#FFD700]">Supra L1</div>
          </GradientCard>
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Status</div>
            <div className="text-lg font-bold text-[#10b981]">Live</div>
          </GradientCard>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <GradientCard key={i}>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-[#B0B0B0]">{feature.desc}</p>
              </GradientCard>
            ))}
          </div>
        </div>

        {/* Smart Contracts */}
        <GradientCard className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Smart Contracts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/10">
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Contract</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Address</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Description</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Functions</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Status</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, i) => (
                  <tr key={i} className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                    <td className="py-3 px-4 font-semibold text-[#FFD700]">{contract.name}</td>
                    <td className="py-3 px-4 text-[#B0B0B0] font-mono text-xs">{contract.address}</td>
                    <td className="py-3 px-4 text-[#B0B0B0]">{contract.description}</td>
                    <td className="py-3 px-4 text-[#E0E0E0]">{contract.functions}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-[#10b981]/20 text-[#10b981]">
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GradientCard>

        {/* Integration Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Supra Integration</h3>
            <div className="space-y-3">
              {[
                { name: 'DORA Oracles', desc: 'Sub-second price feeds' },
                { name: 'AutoFi', desc: 'Autonomous vault harvesting' },
                { name: 'dVRF', desc: 'Decentralized randomness' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#FFD700]">✓</span>
                  <div>
                    <div className="font-semibold text-[#E0E0E0]">{item.name}</div>
                    <div className="text-xs text-[#B0B0B0]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Security Features</h3>
            <div className="space-y-3">
              {[
                { name: 'ReentrancyGuard', desc: 'Prevent reentrancy attacks' },
                { name: 'Circuit Breaker', desc: 'Emergency halt mechanism' },
                { name: 'Rate Limiter', desc: 'Flash loan protection' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#10b981]">🔒</span>
                  <div>
                    <div className="font-semibold text-[#E0E0E0]">{item.name}</div>
                    <div className="text-xs text-[#B0B0B0]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* API Endpoints */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">API Endpoints</h3>
          <div className="space-y-3">
            {[
              { method: 'GET', endpoint: '/api/protocol/stats', desc: 'Get protocol statistics' },
              { method: 'GET', endpoint: '/api/prices', desc: 'Get real-time prices' },
              { method: 'POST', endpoint: '/api/borrow', desc: 'Initiate borrow' },
              { method: 'POST', endpoint: '/api/deposit', desc: 'Deposit to vault' },
            ].map((api, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-[#0A0A0A] border border-[#FFD700]/10 rounded-lg">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  api.method === 'GET' ? 'bg-[#06b6d4]/20 text-[#06b6d4]' : 'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                }`}>
                  {api.method}
                </span>
                <span className="font-mono text-sm text-[#FFD700]">{api.endpoint}</span>
                <span className="text-xs text-[#B0B0B0]">{api.desc}</span>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="protocol" />
      </div>
    </div>
  )
}
