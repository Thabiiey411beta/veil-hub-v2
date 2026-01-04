'use client'

import React, { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, StatCounter, AnimatedBadge } from '@/components/EnhancedUI'
import { generateChartData } from '@/lib/chart-data'

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    setChartData(generateChartData(30))
  }, [])

  const revenueData = [
    { date: 'Jan 1', immortal: 45000, buyback: 27000, veveil: 18000 },
    { date: 'Jan 5', immortal: 52000, buyback: 31000, veveil: 21000 },
    { date: 'Jan 10', immortal: 58000, buyback: 35000, veveil: 23000 },
    { date: 'Jan 15', immortal: 65000, buyback: 39000, veveil: 26000 },
    { date: 'Jan 20', immortal: 72000, buyback: 43000, veveil: 29000 },
    { date: 'Jan 25', immortal: 78000, buyback: 47000, veveil: 31000 },
    { date: 'Jan 30', immortal: 85000, buyback: 51000, veveil: 34000 },
  ]

  const userGrowthData = [
    { date: 'Week 1', users: 1200, active: 850 },
    { date: 'Week 2', users: 2100, active: 1450 },
    { date: 'Week 3', users: 3500, active: 2400 },
    { date: 'Week 4', users: 5200, active: 3600 },
    { date: 'Week 5', users: 7100, active: 4900 },
    { date: 'Week 6', users: 8542, active: 5800 },
  ]

  const healthScore = 92

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Protocol Analytics</h1>
          <p className="text-[#B0B0B0]">Real-time protocol performance and metrics</p>
        </div>

        {/* Health Score */}
        <GradientCard className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Protocol Health Score</h3>
              <p className="text-[#B0B0B0] text-sm">Overall system stability and performance</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-[#FFD700]">{healthScore}</div>
              <div className="text-sm text-[#10b981]">↑ 2.3% from last week</div>
            </div>
          </div>
          <div className="mt-4 w-full bg-[#333] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] h-3 rounded-full transition-all"
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </GradientCard>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GradientCard>
            <StatCounter value="$245M" label="Total Value Locked" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="$125M" label="24h Volume" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="8.5K" label="Total Users" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="52M" label="Total Burned" />
          </GradientCard>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Distribution */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Revenue Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                />
                <Legend />
                <Area type="monotone" dataKey="immortal" fill="#FFD700" stroke="#FFD700" fillOpacity={0.3} />
                <Line type="monotone" dataKey="buyback" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="veveil" stroke="#8b5cf6" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </GradientCard>

          {/* User Growth */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
                />
                <Legend />
                <Area type="monotone" dataKey="users" stroke="#FFD700" fillOpacity={1} fill="url(#colorUsers)" />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </GradientCard>

          {/* Price Trends */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Price Trends (30d)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                />
                <Legend />
                <Line type="monotone" dataKey="BTC" stroke="#FFD700" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ETH" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </GradientCard>

          {/* Collateral Ratio */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Collateral Ratio Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                { date: 'Day 1', ratio: 185 },
                { date: 'Day 5', ratio: 182 },
                { date: 'Day 10', ratio: 188 },
                { date: 'Day 15', ratio: 190 },
                { date: 'Day 20', ratio: 187 },
                { date: 'Day 25', ratio: 192 },
                { date: 'Day 30', ratio: 195 },
              ]}>
                <defs>
                  <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#808080" />
                <YAxis stroke="#808080" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                />
                <Area type="monotone" dataKey="ratio" stroke="#10b981" fillOpacity={1} fill="url(#colorRatio)" />
              </AreaChart>
            </ResponsiveContainer>
          </GradientCard>
        </div>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="analytics" />
      </div>
    </div>
  )
}
