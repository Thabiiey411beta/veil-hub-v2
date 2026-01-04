'use client'

import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { GradientCard, RippleButton, AnimatedBadge } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

export default function IndicesPage() {
  const [selectedIndex, setSelectedIndex] = useState('btc-eth')
  const [rebalanceFreq, setRebalanceFreq] = useState('weekly')

  const performanceData = [
    { date: 'Day 1', value: 100 },
    { date: 'Day 5', value: 103.2 },
    { date: 'Day 10', value: 106.8 },
    { date: 'Day 15', value: 110.5 },
    { date: 'Day 20', value: 114.2 },
    { date: 'Day 25', value: 118.9 },
    { date: 'Day 30', value: 123.5 },
  ]

  const indices = [
    {
      id: 'btc-eth',
      name: 'BTC-ETH Index',
      description: 'Top 2 cryptocurrencies',
      apy: '18.5%',
      tvl: '$85M',
      composition: [
        { name: 'BTC', value: 60, color: '#FFD700' },
        { name: 'ETH', value: 40, color: '#8b5cf6' },
      ],
      fee: '0.5%',
      rebalance: 'Weekly',
    },
    {
      id: 'stable-bundle',
      name: 'Stable Bundle',
      description: 'USDC, USDT, DAI mix',
      apy: '8.2%',
      tvl: '$120M',
      composition: [
        { name: 'USDC', value: 50, color: '#10b981' },
        { name: 'USDT', value: 30, color: '#06b6d4' },
        { name: 'DAI', value: 20, color: '#f59e0b' },
      ],
      fee: '0.2%',
      rebalance: 'Daily',
    },
    {
      id: 'defi-index',
      name: 'DeFi Index',
      description: 'Top DeFi protocols',
      apy: '24.3%',
      tvl: '$45M',
      composition: [
        { name: 'AAVE', value: 35, color: '#8b5cf6' },
        { name: 'UNI', value: 30, color: '#FFD700' },
        { name: 'LINK', value: 35, color: '#06b6d4' },
      ],
      fee: '0.8%',
      rebalance: 'Bi-weekly',
    },
  ]

  const currentIndex = indices.find(i => i.id === selectedIndex)

  const indexFactoryFees = [
    { tier: 'Basic', cost: '10k VEIL', features: ['Up to 5 assets', 'Monthly rebalance', 'Standard support'] },
    { tier: 'Pro', cost: '25k VEIL', features: ['Up to 20 assets', 'Weekly rebalance', 'Priority support'] },
    { tier: 'Enterprise', cost: '100k VEIL', features: ['Unlimited assets', 'Daily rebalance', '24/7 support'] },
  ]

  const rebalancerStats = [
    { metric: 'Total Rebalances', value: '1,245', icon: '🔄' },
    { metric: 'Gas Saved', value: '$2.3M', icon: '⛽' },
    { metric: 'Slippage Reduced', value: '0.12%', icon: '📉' },
    { metric: 'Uptime', value: '99.9%', icon: '⏱️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🎭 Phantom Indices</h1>
          <p className="text-[#B0B0B0]">Create, manage, and auto-rebalance custom indices</p>
        </div>

        {/* Index Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {indices.map(idx => (
            <button
              key={idx.id}
              onClick={() => setSelectedIndex(idx.id)}
              className={`text-left transition-all ${selectedIndex === idx.id ? 'ring-2 ring-[#FFD700]' : ''}`}
            >
              <GradientCard>
                <h3 className="font-bold mb-1">{idx.name}</h3>
                <p className="text-xs text-[#B0B0B0] mb-3">{idx.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-[#FFD700]">{idx.apy}</div>
                    <div className="text-xs text-[#808080]">APY</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#FFD700]">{idx.tvl}</div>
                    <div className="text-xs text-[#808080]">TVL</div>
                  </div>
                </div>
              </GradientCard>
            </button>
          ))}
        </div>

        {/* Index Details */}
        {currentIndex && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <GradientCard>
                <h3 className="text-lg font-bold mb-4">30-Day Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#808080" />
                    <YAxis stroke="#808080" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }} />
                    <Area type="monotone" dataKey="value" stroke="#FFD700" fillOpacity={1} fill="url(#colorPerf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </GradientCard>
            </div>

            {/* Composition */}
            <GradientCard>
              <h3 className="text-lg font-bold mb-4">Composition</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={currentIndex.composition} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {currentIndex.composition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {currentIndex.composition.map((comp, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-[#B0B0B0]">{comp.name}</span>
                    <span className="text-[#FFD700] font-bold">{comp.value}%</span>
                  </div>
                ))}
              </div>
            </GradientCard>
          </div>
        )}

        {/* Index Factory */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">🏭 Index Factory</h3>
          <p className="text-[#B0B0B0] mb-6">Create custom indices with your own asset composition</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {indexFactoryFees.map((tier, i) => (
              <div key={i} className="border border-[#FFD700]/30 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
                <h4 className="text-lg font-bold text-[#FFD700] mb-2">{tier.tier}</h4>
                <div className="text-2xl font-bold text-[#FFD700] mb-4">{tier.cost}</div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="text-sm text-[#B0B0B0] flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <RippleButton className="w-full">Create Index</RippleButton>
              </div>
            ))}
          </div>

          <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
            <h4 className="font-bold mb-4">Create Custom Index</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#B0B0B0] mb-2 block">Index Name</label>
                <input type="text" placeholder="My Custom Index" className="w-full bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] focus:border-[#FFD700] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-[#B0B0B0] mb-2 block">Select Assets (up to 5)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['BTC', 'ETH', 'LINK', 'AVAX', 'VEIL'].map(asset => (
                    <label key={asset} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{asset}</span>
                    </label>
                  ))}
                </div>
              </div>
              <RippleButton className="w-full">Deploy Index (10k VEIL)</RippleButton>
            </div>
          </div>
        </GradientCard>

        {/* Stable Bundle */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">💰 Stable Bundle</h3>
          <p className="text-[#B0B0B0] mb-6">Pre-built stable coin index with 8.2% APY</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#B0B0B0]">USDC</span>
                  <span className="text-[#FFD700] font-bold">50%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2">
                  <div className="bg-[#10b981] h-2 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#B0B0B0]">USDT</span>
                  <span className="text-[#FFD700] font-bold">30%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2">
                  <div className="bg-[#06b6d4] h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#B0B0B0]">DAI</span>
                  <span className="text-[#FFD700] font-bold">20%</span>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2">
                  <div className="bg-[#f59e0b] h-2 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">APY</div>
                <div className="text-2xl font-bold text-[#FFD700]">8.2%</div>
              </div>
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">TVL</div>
                <div className="text-2xl font-bold text-[#FFD700]">$120M</div>
              </div>
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">Fee</div>
                <div className="text-2xl font-bold text-[#FFD700]">0.2%</div>
              </div>
              <RippleButton className="w-full">Deposit (5k VEIL min)</RippleButton>
            </div>
          </div>
        </GradientCard>

        {/* Auto-Rebalancer */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">🔄 Auto-Rebalancer</h3>
          <p className="text-[#B0B0B0] mb-6">Automatic portfolio rebalancing with minimal slippage</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {rebalancerStats.map((stat, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-[#FFD700]">{stat.value}</div>
                <div className="text-xs text-[#B0B0B0]">{stat.metric}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
            <h4 className="font-bold mb-4">Rebalance Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#B0B0B0] mb-2 block">Rebalance Frequency</label>
                <select value={rebalanceFreq} onChange={(e) => setRebalanceFreq(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] focus:border-[#FFD700] focus:outline-none">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#B0B0B0] mb-2 block">Max Slippage Tolerance</label>
                <input type="number" placeholder="0.5" className="w-full bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] focus:border-[#FFD700] focus:outline-none" />
              </div>
              <div className="bg-[#1a1a2e] border border-[#FFD700]/10 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-[#B0B0B0]">Next Rebalance</span>
                  <span className="text-[#FFD700]">In 2 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Estimated Gas</span>
                  <span className="text-[#FFD700]">$45</span>
                </div>
              </div>
              <RippleButton className="w-full">Enable Auto-Rebalance</RippleButton>
            </div>
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="indices" />
      </div>
    </div>
  )
}
