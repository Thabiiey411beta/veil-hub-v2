import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Lock, Flame, Activity, Eye, Zap, Shield } from 'lucide-react';

const VeilAnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('tvl');
  
  // Mock data - in production, fetch from API
  const tvlData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    tvl: 850000000 + Math.random() * 150000000,
    volume: 25000000 + Math.random() * 10000000,
    users: 12000 + Math.random() * 3000
  }));

  const revenueData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    borrowing: 1200000 + Math.random() * 500000,
    trading: 800000 + Math.random() * 300000,
    vaults: 600000 + Math.random() * 200000,
    lending: 400000 + Math.random() * 150000
  }));

  const burnData = [
    { name: 'Circulating', value: 580000000, color: '#8b5cf6' },
    { name: 'Locked (veVEIL)', value: 200000000, color: '#ec4899' },
    { name: 'Burned', value: 120000000, color: '#ef4444' },
    { name: 'Treasury', value: 100000000, color: '#3b82f6' }
  ];

  const protocolHealthData = [
    { category: 'TVL Growth', value: 85 },
    { category: 'Revenue', value: 92 },
    { category: 'Liquidity', value: 78 },
    { category: 'User Growth', value: 88 },
    { category: 'Security', value: 95 },
    { category: 'Decentralization', value: 72 }
  ];

  const yieldComparison = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    immortalAPY: 18 + Math.random() * 7,
    veVEILBoost: 2.0 + Math.random() * 0.5,
    vaultAPY: 35 + Math.random() * 15
  }));

  const metrics = [
    {
      id: 'tvl',
      label: 'Total Value Locked',
      value: '$987.5M',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'revenue',
      label: 'Monthly Revenue',
      value: '$4.2M',
      change: '+8.7%',
      trend: 'up',
      icon: Activity,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'burned',
      label: 'Tokens Burned',
      value: '120M VEIL',
      change: '+2.1M',
      trend: 'up',
      icon: Flame,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'users',
      label: 'Active Users',
      value: '14,523',
      change: '+432',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Protocol Analytics
            </h1>
            <p className="text-slate-400">Real-time metrics & insights</p>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex gap-2 mt-4">
          {['24h', '7d', '30d', '90d', '1y', 'All'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="relative group cursor-pointer"
              onClick={() => setActiveMetric(metric.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
              <div className={`relative bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border ${
                activeMetric === metric.id
                  ? 'border-violet-500 ring-2 ring-violet-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              } transition-all`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {metric.change}
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* TVL & Volume Chart */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">TVL & Trading Volume</h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-slate-400">TVL</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-slate-400">Volume</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tvlData}>
              <defs>
                <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(value: any) => (value != null ? `$${(Number(value) / 1000000).toFixed(2)}M` : '')}
              />
              <Area type="monotone" dataKey="tvl" stroke="#8b5cf6" fill="url(#tvlGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="volume" stroke="#ec4899" fill="url(#volumeGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold mb-6">Revenue by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(value: any) => (value != null ? `$${(Number(value) / 1000).toFixed(0)}K` : '')}
              />
              <Legend />
              <Bar dataKey="borrowing" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="trading" stackId="a" fill="#ec4899" radius={[0, 0, 0, 0]} />
              <Bar dataKey="vaults" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar dataKey="lending" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Supply Distribution */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold mb-6">VEIL Supply Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={burnData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {burnData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                formatter={(value: any) => (value != null ? `${(Number(value) / 1000000).toFixed(0)}M VEIL` : '')}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {burnData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Health Radar */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold mb-6">Protocol Health Score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={protocolHealthData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="category" stroke="#64748b" />
              <PolarRadiusAxis stroke="#64748b" />
              <Radar name="Health" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yield Comparison */}
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
        <h2 className="text-xl font-bold mb-6">Yield Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={yieldComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              formatter={(value: any) => (value != null ? `${Number(value).toFixed(2)}%` : '')}
            />
            <Legend />
            <Line type="monotone" dataKey="immortalAPY" stroke="#8b5cf6" strokeWidth={2} name="Immortal APY" />
            <Line type="monotone" dataKey="vaultAPY" stroke="#ec4899" strokeWidth={2} name="Vault APY" />
            <Line type="monotone" dataKey="veVEILBoost" stroke="#f59e0b" strokeWidth={2} name="veVEIL Boost" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Total Transactions', value: '1.2M+', icon: Zap },
          { label: 'Security Score', value: '95/100', icon: Shield },
          { label: 'Avg. APY', value: '23.4%', icon: TrendingUp },
          { label: 'Daily Active', value: '3,421', icon: Eye }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Icon className="w-4 h-4" />
                {stat.label}
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VeilAnalyticsDashboard;
