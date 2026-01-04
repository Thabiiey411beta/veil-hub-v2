'use client'

import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, RippleButton, AnimatedBadge } from '@/components/EnhancedUI'

export default function VaultsPage() {
  const [selectedVault, setSelectedVault] = useState('immortal')
  const [depositAmount, setDepositAmount] = useState('')

  const performanceData = [
    { date: 'Day 1', value: 100 },
    { date: 'Day 5', value: 102.5 },
    { date: 'Day 10', value: 105.2 },
    { date: 'Day 15', value: 108.1 },
    { date: 'Day 20', value: 111.3 },
    { date: 'Day 25', value: 114.8 },
    { date: 'Day 30', value: 118.5 },
  ]

  const vaults = [
    {
      id: 'immortal',
      name: 'Immortal Reserve',
      description: 'Burn VEIL for perpetual USDC yield',
      apy: '18.5%',
      tvl: '$120M',
      users: 2500,
      strategy: 'Dividend Distribution',
      burnBonus: '1.5x',
      icon: '💎',
      color: '#FFD700',
    },
    {
      id: 'stable',
      name: 'Stable Yield',
      description: 'Conservative USDC-only strategy',
      apy: '12.3%',
      tvl: '$85M',
      users: 1800,
      strategy: 'Lending Pool',
      burnBonus: '1.0x',
      icon: '🏦',
      color: '#10b981',
    },
    {
      id: 'aggressive',
      name: 'Aggressive Growth',
      description: 'High-risk, high-reward strategy',
      apy: '25.7%',
      tvl: '$40M',
      users: 600,
      strategy: 'Perpetual Trading',
      burnBonus: '1.0x',
      icon: '🚀',
      color: '#ef4444',
    },
  ]

  const currentVault = vaults.find(v => v.id === selectedVault)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ERC-4626 Vaults</h1>
          <p className="text-[#B0B0B0]">Automated yield strategies with 60% fee burn</p>
        </div>

        {/* Vault Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {vaults.map(vault => (
            <button
              key={vault.id}
              onClick={() => setSelectedVault(vault.id)}
              className={`text-left transition-all ${
                selectedVault === vault.id ? 'ring-2 ring-[#FFD700]' : ''
              }`}
            >
              <GradientCard>
                <div className="text-3xl mb-2">{vault.icon}</div>
                <h3 className="font-bold mb-1">{vault.name}</h3>
                <p className="text-xs text-[#B0B0B0] mb-3">{vault.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold" style={{ color: vault.color }}>
                      {vault.apy}
                    </div>
                    <div className="text-xs text-[#808080]">APY</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#FFD700]">{vault.tvl}</div>
                    <div className="text-xs text-[#808080]">{vault.users} users</div>
                  </div>
                </div>
              </GradientCard>
            </button>
          ))}
        </div>

        {/* Vault Details */}
        {currentVault && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <GradientCard>
                <h3 className="text-lg font-bold mb-4">30-Day Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentVault.color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={currentVault.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#808080" />
                    <YAxis stroke="#808080" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                      labelStyle={{ color: '#FFD700' }}
                      formatter={(value: any) => `$${value.toFixed(2)}`}
                    />
                    <Area type="monotone" dataKey="value" stroke={currentVault.color} fillOpacity={1} fill="url(#colorPerf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </GradientCard>
            </div>

            {/* Deposit Form */}
            <GradientCard>
              <h3 className="text-lg font-bold mb-4">Deposit</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block">Amount</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#B0B0B0]">Est. Annual Yield</span>
                    <span className="text-[#FFD700] font-bold">
                      ${depositAmount ? (parseFloat(depositAmount) * 0.185).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B0B0B0]">Performance Fee</span>
                    <span className="text-[#FFD700]">10%</span>
                  </div>
                </div>

                <RippleButton className="w-full">
                  Deposit Now
                </RippleButton>
              </div>
            </GradientCard>
          </div>
        )}

        {/* Vault Details Grid */}
        {currentVault && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GradientCard>
              <h3 className="text-lg font-bold mb-4">Vault Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Strategy</span>
                  <span className="text-[#FFD700] font-semibold">{currentVault.strategy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Total Value Locked</span>
                  <span className="text-[#FFD700] font-semibold">{currentVault.tvl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Active Users</span>
                  <span className="text-[#FFD700] font-semibold">{currentVault.users}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Current APY</span>
                  <span className="text-[#FFD700] font-semibold">{currentVault.apy}</span>
                </div>
              </div>
            </GradientCard>

            <GradientCard>
              <h3 className="text-lg font-bold mb-4">Fee Structure</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Performance Fee</span>
                  <span className="text-[#FFD700] font-semibold">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Burned (60%)</span>
                  <span className="text-[#ef4444] font-semibold">6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Immortal Reserve (25%)</span>
                  <span className="text-[#FFD700] font-semibold">2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">veVEIL Holders (15%)</span>
                  <span className="text-[#8b5cf6] font-semibold">1.5%</span>
                </div>
              </div>
            </GradientCard>
          </div>
        )}

        {/* Your Deposits */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">Your Deposits</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/10">
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Vault</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Deposited</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Current Value</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Yield Earned</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                  <td className="py-3 px-4">Immortal Reserve</td>
                  <td className="py-3 px-4">$50,000</td>
                  <td className="py-3 px-4 text-[#FFD700]">$59,250</td>
                  <td className="py-3 px-4 text-[#10b981]">+$9,250</td>
                  <td className="py-3 px-4"><AnimatedBadge variant="success">Earning</AnimatedBadge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="vaults" />
      </div>
    </div>
  )
}
