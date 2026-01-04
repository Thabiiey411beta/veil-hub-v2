'use client'

import React from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts'

interface ChartProps {
  data: any[]
  height?: number
}

export const PriceChart: React.FC<ChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
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
      <Line type="monotone" dataKey="LINK" stroke="#06b6d4" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
)

export const VolumeChart: React.FC<ChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="date" stroke="#808080" />
      <YAxis stroke="#808080" />
      <Tooltip 
        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
        labelStyle={{ color: '#FFD700' }}
      />
      <Bar dataKey="volume" fill="#FFD700" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

export const YieldChart: React.FC<ChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <ComposedChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="date" stroke="#808080" />
      <YAxis stroke="#808080" />
      <Tooltip 
        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
        labelStyle={{ color: '#FFD700' }}
      />
      <Legend />
      <Area type="monotone" dataKey="immortalYield" fill="#FFD700" stroke="#FFD700" fillOpacity={0.3} />
      <Line type="monotone" dataKey="veVeilBoost" stroke="#8b5cf6" strokeWidth={2} />
      <Line type="monotone" dataKey="borrowRate" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
    </ComposedChart>
  </ResponsiveContainer>
)

export const PortfolioChart: React.FC<ChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(0)}M`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
        labelStyle={{ color: '#FFD700' }}
        formatter={(value: any) => `$${(value / 1000000).toFixed(2)}M`}
      />
    </PieChart>
  </ResponsiveContainer>
)

export const PerformanceChart: React.FC<ChartProps> = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="date" stroke="#808080" />
      <YAxis stroke="#808080" />
      <Tooltip 
        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
        labelStyle={{ color: '#FFD700' }}
      />
      <Area type="monotone" dataKey="value" stroke="#FFD700" fillOpacity={1} fill="url(#colorPerf)" />
    </AreaChart>
  </ResponsiveContainer>
)
