'use client'

import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, StatCounter, AnimatedBadge } from '@/components/EnhancedUI'

export default function FinancePage() {
  const portfolioData = [
    { date: 'Day 1', value: 100000 },
    { date: 'Day 5', value: 102500 },
    { date: 'Day 10', value: 105200 },
    { date: 'Day 15', value: 108100 },
    { date: 'Day 20', value: 111300 },
    { date: 'Day 25', value: 114800 },
    { date: 'Day 30', value: 118500 },
  ]

  const transactions = [
    { id: 1, type: 'Deposit', asset: 'VEIL', amount: 50000, value: '$42,500', date: '2024-02-10', status: 'Completed' },
    { id: 2, type: 'Borrow', asset: 'USDC', amount: 25000, value: '$25,000', date: '2024-02-09', status: 'Completed' },
    { id: 3, type: 'Yield', asset: 'USDC', amount: 1250, value: '$1,250', date: '2024-02-08', status: 'Completed' },
    { id: 4, type: 'Swap', asset: 'ETH→USDC', amount: 5, value: '$12,250', date: '2024-02-07', status: 'Completed' },
    { id: 5, type: 'Lock', asset: 'VEIL', amount: 10000, value: '$8,500', date: '2024-02-06', status: 'Completed' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Finance</h1>
          <p className="text-[#B0B0B0]">Portfolio management and transaction history</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GradientCard>
            <StatCounter value="$118.5K" label="Portfolio Value" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="$18.5K" label="Total Gains" suffix="(+18.5%)" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="$85K" label="Deposited" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="$25K" label="Borrowed" />
          </GradientCard>
        </div>

        {/* Portfolio Chart */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">Portfolio Growth (30 Days)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#808080" />
              <YAxis stroke="#808080" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                labelStyle={{ color: '#FFD700' }}
                formatter={(value: any) => `$${value.toLocaleString()}`}
              />
              <Area type="monotone" dataKey="value" stroke="#FFD700" fillOpacity={1} fill="url(#colorPortfolio)" />
            </AreaChart>
          </ResponsiveContainer>
        </GradientCard>

        {/* Asset Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Holdings */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Your Holdings</h3>
            <div className="space-y-3">
              {[
                { asset: 'VEIL', amount: 50000, value: '$42,500', change: '+5.2%', color: '#FFD700' },
                { asset: 'USDC', amount: 35000, value: '$35,000', change: '+0.0%', color: '#10b981' },
                { asset: 'ETH', amount: 10, value: '$24,500', change: '+2.1%', color: '#8b5cf6' },
                { asset: 'BTC', amount: 0.5, value: '$21,425', change: '+1.8%', color: '#f59e0b' },
              ].map((holding, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#FFD700]/10 rounded-lg hover:border-[#FFD700]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: holding.color }} />
                    <div>
                      <div className="font-semibold">{holding.asset}</div>
                      <div className="text-xs text-[#B0B0B0]">{holding.amount} {holding.asset}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#FFD700]">{holding.value}</div>
                    <div className={`text-xs ${holding.change.startsWith('+') ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {holding.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>

          {/* Income Sources */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Income Sources</h3>
            <div className="space-y-3">
              {[
                { source: 'Immortal Yield', amount: '$1,250', frequency: 'Weekly', icon: '💎' },
                { source: 'Vault APY', amount: '$850', frequency: 'Daily', icon: '🏦' },
                { source: 'veVEIL Boost', amount: '$450', frequency: 'Weekly', icon: '🚀' },
                { source: 'Referral Bonus', amount: '$125', frequency: 'Monthly', icon: '🤝' },
              ].map((income, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#FFD700]/10 rounded-lg hover:border-[#FFD700]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{income.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{income.source}</div>
                      <div className="text-xs text-[#B0B0B0]">{income.frequency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#10b981]">{income.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* Transaction History */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/10">
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Type</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Asset</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Amount</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Value</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Date</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#FFD700]/10 text-[#FFD700]">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{tx.asset}</td>
                    <td className="py-3 px-4">{tx.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-[#FFD700] font-semibold">{tx.value}</td>
                    <td className="py-3 px-4 text-[#B0B0B0]">{tx.date}</td>
                    <td className="py-3 px-4">
                      <AnimatedBadge variant="success">{tx.status}</AnimatedBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GradientCard>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Monthly Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Total Deposits</span>
                <span className="text-[#FFD700] font-semibold">$85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Total Withdrawals</span>
                <span className="text-[#FFD700] font-semibold">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Interest Earned</span>
                <span className="text-[#10b981] font-semibold">$3,500</span>
              </div>
              <div className="border-t border-[#FFD700]/10 pt-3 flex justify-between">
                <span className="text-[#B0B0B0] font-semibold">Net Gain</span>
                <span className="text-[#10b981] font-bold text-lg">$3,500</span>
              </div>
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Risk Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Collateral Ratio</span>
                <span className="text-[#10b981] font-semibold">195%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Liquidation Price</span>
                <span className="text-[#FFD700] font-semibold">$0.42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Debt Ratio</span>
                <span className="text-[#10b981] font-semibold">21%</span>
              </div>
              <div className="border-t border-[#FFD700]/10 pt-3 flex justify-between">
                <span className="text-[#B0B0B0] font-semibold">Risk Level</span>
                <span className="text-[#10b981] font-bold">Low</span>
              </div>
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">30-Day Return</span>
                <span className="text-[#10b981] font-semibold">+18.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Avg APY</span>
                <span className="text-[#FFD700] font-semibold">18.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Sharpe Ratio</span>
                <span className="text-[#FFD700] font-semibold">2.3</span>
              </div>
              <div className="border-t border-[#FFD700]/10 pt-3 flex justify-between">
                <span className="text-[#B0B0B0] font-semibold">Rank</span>
                <span className="text-[#FFD700] font-bold">Top 5%</span>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="finance" />
      </div>
    </div>
  )
}
