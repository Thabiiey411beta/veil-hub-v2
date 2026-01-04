'use client'

import React, { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, StatCounter, AnimatedBadge } from '@/components/EnhancedUI'

export default function TokenomicsPage() {
  const supplyProjection = [
    { year: 'Year 0', total: 1000, locked: 0, circulating: 1000 },
    { year: 'Year 1', total: 1000, locked: 200, circulating: 800 },
    { year: 'Year 2', total: 1000, locked: 350, circulating: 650 },
    { year: 'Year 3', total: 1000, locked: 450, circulating: 550 },
    { year: 'Year 4', total: 1000, locked: 500, circulating: 500 },
    { year: 'Year 5', total: 1000, locked: 550, circulating: 450 },
  ]

  const lockRateData = [
    { date: 'Week 1', rate: 15, cumulative: 15 },
    { date: 'Week 2', rate: 22, cumulative: 37 },
    { date: 'Week 3', rate: 28, cumulative: 65 },
    { date: 'Week 4', rate: 35, cumulative: 100 },
    { date: 'Week 5', rate: 42, cumulative: 142 },
    { date: 'Week 6', rate: 48, cumulative: 190 },
  ]

  const vestingSchedule = [
    { name: 'Team', amount: 150, vested: 37.5, percentage: 25 },
    { name: 'Investors', amount: 100, vested: 50, percentage: 50 },
    { name: 'Liquidity Mining', amount: 250, vested: 62.5, percentage: 25 },
    { name: 'Treasury', amount: 200, vested: 0, percentage: 0 },
    { name: 'Community', amount: 100, vested: 100, percentage: 100 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tokenomics</h1>
          <p className="text-[#B0B0B0]">Token distribution, burns, and vesting schedules</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GradientCard>
            <StatCounter value="1B" label="Total Supply" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="450M" label="Total Locked" suffix="(45%)" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="550M" label="Circulating Supply" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="2.5x" label="Max Lock Boost" />
          </GradientCard>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Supply Projection */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Supply Projection (5 Years)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={supplyProjection}>
                <defs>
                  <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                  formatter={(value: any) => `${value}M`}
                />
                <Legend />
                <Area type="monotone" dataKey="total" stroke="#FFD700" fillOpacity={1} fill="url(#colorSupply)" />
                <Line type="monotone" dataKey="locked" stroke="#8b5cf6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </GradientCard>

          {/* Lock Rate Tracker */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Lock Rate Tracker</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lockRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                  formatter={(value: any) => `${value}M`}
                />
                <Legend />
                <Bar dataKey="rate" fill="#FFD700" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="cumulative" stroke="#8b5cf6" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </GradientCard>
        </div>

        {/* Vesting Schedule */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">Vesting Schedule</h3>
          <div className="space-y-4">
            {vestingSchedule.map((item, i) => (
              <div key={i} className="border-b border-[#FFD700]/10 pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-[#E0E0E0]">{item.name}</h4>
                    <p className="text-sm text-[#B0B0B0]">{item.amount}M total allocation</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#FFD700]">{item.percentage}%</div>
                    <div className="text-xs text-[#B0B0B0]">{item.vested}M vested</div>
                  </div>
                </div>
                <div className="w-full bg-[#333] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* Distribution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Initial Distribution</h3>
            <div className="space-y-3">
              {[
                { label: 'Immortal Reserve', value: '200M', pct: 20, color: '#FFD700' },
                { label: 'Team', value: '150M', pct: 15, color: '#8b5cf6' },
                { label: 'Investors', value: '100M', pct: 10, color: '#06b6d4' },
                { label: 'Liquidity Mining', value: '250M', pct: 25, color: '#10b981' },
                { label: 'Treasury', value: '200M', pct: 20, color: '#ef4444' },
                { label: 'Community', value: '100M', pct: 10, color: '#f59e0b' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#FFD700]">{item.value}</div>
                    <div className="text-xs text-[#B0B0B0]">{item.pct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Lock-to-Earn Mechanisms</h3>
            <div className="space-y-3">
              {[
                { label: 'Lock VEIL', value: '1-4 Years', desc: 'Earn up to 2.5x boost' },
                { label: 'Vault Fee Burn', value: '60%', desc: 'Performance fees' },
                { label: 'Buyback & Burn', value: '30%', desc: 'Borrow interest' },
                { label: 'Protocol Rewards', value: 'Variable', desc: 'Treasury rewards' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-[#E0E0E0]">{item.label}</h4>
                    <span className="text-[#FFD700] font-bold">{item.value}</span>
                  </div>
                  <p className="text-xs text-[#B0B0B0]">{item.desc}</p>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="tokenomics" />
      </div>
    </div>
  )
}
