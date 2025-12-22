import React, { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Percent, Lock, Flame, Clock, Target, AlertCircle, Eye, EyeOff, Download, RefreshCw } from 'lucide-react';

const PortfolioTracker = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [timeframe, setTimeframe] = useState('30d');
  
  // Portfolio Overview Data
  const portfolioValue = 127456.89;
  const dailyChange = 3245.67;
  const dailyChangePercent = 2.62;

  // Asset Allocation
  const allocation = [
    { name: 'veVEIL Locked', value: 45000, color: '#8b5cf6', percent: 35.3 },
    { name: 'Immortal Shares', value: 32000, color: '#ec4899', percent: 25.1 },
    { name: 'Vault Deposits', value: 28000, color: '#f59e0b', percent: 22.0 },
    { name: 'Trading Positions', value: 15000, color: '#3b82f6', percent: 11.8 },
    { name: 'Liquid VEIL', value: 7456.89, color: '#10b981', percent: 5.8 }
  ];

  // Performance History
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    value: 95000 + Math.random() * 35000,
    deposits: 100000,
    earnings: (i + 1) * 1000
  }));

  // Detailed Positions
  const positions = [
    {
      id: 1,
      type: 'veVEIL Lock',
      amount: 150000,
      value: 45000,
      apy: '23.4%',
      unlockDate: '2025-06-15',
      boost: '2.5x',
      status: 'active',
      dailyEarnings: 28.92
    },
    {
      id: 2,
      type: 'Immortal Share',
      amount: 25000,
      value: 32000,
      apy: '18.7%',
      rewards: 892.45,
      status: 'active',
      dailyEarnings: 16.39
    },
    {
      id: 3,
      type: 'Vault - ETH Strategy',
      amount: 12.5,
      value: 28000,
      apy: '42.3%',
      performance: '+12.4%',
      status: 'active',
      dailyEarnings: 32.44
    },
    {
      id: 4,
      type: 'Perp Position - BTC Long',
      amount: 0.5,
      value: 15000,
      pnl: '+2,345.67',
      leverage: '10x',
      status: 'open',
      dailyEarnings: 234.57
    }
  ];

  // Earnings History
  const earningsData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    veVEIL: 800 + Math.random() * 400,
    immortal: 600 + Math.random() * 300,
    vaults: 900 + Math.random() * 500,
    trading: 300 + Math.random() * 600
  }));

  // Risk Metrics
  const riskMetrics = [
    { metric: 'Portfolio Beta', value: '1.24', status: 'medium', desc: 'Higher than market' },
    { metric: 'Sharpe Ratio', value: '2.18', status: 'good', desc: 'Strong risk-adjusted returns' },
    { metric: 'Max Drawdown', value: '-8.3%', status: 'good', desc: 'Within acceptable range' },
    { metric: 'Avg. Leverage', value: '3.2x', status: 'medium', desc: 'Moderate risk exposure' }
  ];

  // Upcoming Events
  const upcomingEvents = [
    { type: 'Dividend Claim', date: '2 days', amount: '$892.45', action: 'Claim' },
    { type: 'veVEIL Unlock', date: '45 days', amount: '150K VEIL', action: 'Extend' },
    { type: 'Vault Harvest', date: '3 hours', amount: '$234.12', action: 'Auto' },
    { type: 'Funding Payment', date: '1 hour', amount: '$12.34', action: 'View' }
  ];

  const formatValue = (value) => {
    if (hideBalance) return '••••••';
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Portfolio Dashboard
              </h1>
              <p className="text-slate-400">Track your positions & earnings</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setHideBalance(!hideBalance)}
              className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all"
            >
              {hideBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Value Card */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-slate-400 mb-2">Total Portfolio Value</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">{formatValue(portfolioValue)}</span>
                  <div className={`flex items-center gap-1 text-lg font-medium ${
                    dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {dailyChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    {hideBalance ? '•••' : `${dailyChange >= 0 ? '+' : ''}${dailyChangePercent}%`}
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  {hideBalance ? '••••••' : `${dailyChange >= 0 ? '+' : ''}$${dailyChange.toFixed(2)} today`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Daily Earnings</p>
                  <p className="text-2xl font-bold text-green-400">{formatValue(312.32)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Monthly Est.</p>
                  <p className="text-2xl font-bold">{formatValue(9369.60)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Claimable</p>
                  <p className="text-2xl font-bold text-violet-400">{formatValue(892.45)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">APY (Avg)</p>
                  <p className="text-2xl font-bold">24.3%</p>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <button className="w-full py-3 mb-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-bold transition-all">
                  Claim All Rewards
                </button>
                <button className="w-full py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg font-medium transition-all">
                  Optimize Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Asset Allocation */}
          <div className="lg:col-span-1 bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-bold mb-4">Asset Allocation</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  formatter={(value) => formatValue(value)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {allocation.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Portfolio Performance</h2>
              <div className="flex gap-2">
                {['7d', '30d', '90d', '1y', 'All'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      timeframe === tf
                        ? 'bg-violet-500/20 text-violet-400'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" hide />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  formatter={(value) => formatValue(value)}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#valueGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Positions */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800 mb-6">
          <h2 className="text-xl font-bold mb-6">Active Positions</h2>
          <div className="space-y-4">
            {positions.map((position) => (
              <div key={position.id} className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                      {position.type.includes('veVEIL') && <Lock className="w-5 h-5" />}
                      {position.type.includes('Immortal') && <Flame className="w-5 h-5" />}
                      {position.type.includes('Vault') && <Target className="w-5 h-5" />}
                      {position.type.includes('Perp') && <TrendingUp className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold">{position.type}</h3>
                      <p className="text-sm text-slate-400">
                        {position.amount} {position.type.includes('veVEIL') ? 'VEIL' : position.type.includes('BTC') ? 'BTC' : position.type.includes('ETH') ? 'ETH' : 'Shares'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{formatValue(position.value)}</p>
                    {position.dailyEarnings && (
                      <p className="text-sm text-green-400">+${position.dailyEarnings.toFixed(2)}/day</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {position.apy && (
                    <div>
                      <p className="text-slate-400 mb-1">APY</p>
                      <p className="font-bold text-green-400">{position.apy}</p>
                    </div>
                  )}
                  {position.boost && (
                    <div>
                      <p className="text-slate-400 mb-1">Boost</p>
                      <p className="font-bold text-violet-400">{position.boost}</p>
                    </div>
                  )}
                  {position.unlockDate && (
                    <div>
                      <p className="text-slate-400 mb-1">Unlock Date</p>
                      <p className="font-bold">{position.unlockDate}</p>
                    </div>
                  )}
                  {position.rewards && (
                    <div>
                      <p className="text-slate-400 mb-1">Rewards</p>
                      <p className="font-bold text-green-400">${position.rewards}</p>
                    </div>
                  )}
                  {position.performance && (
                    <div>
                      <p className="text-slate-400 mb-1">Performance</p>
                      <p className="font-bold text-green-400">{position.performance}</p>
                    </div>
                  )}
                  {position.pnl && (
                    <div>
                      <p className="text-slate-400 mb-1">PnL</p>
                      <p className="font-bold text-green-400">{position.pnl}</p>
                    </div>
                  )}
                  {position.leverage && (
                    <div>
                      <p className="text-slate-400 mb-1">Leverage</p>
                      <p className="font-bold text-orange-400">{position.leverage}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-slate-400 mb-1">Status</p>
                    <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400">
                      {position.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {position.type.includes('veVEIL') && (
                    <button className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 rounded-lg text-sm font-medium transition-all">
                      Extend Lock
                    </button>
                  )}
                  {position.type.includes('Immortal') && (
                    <button className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-lg text-sm font-medium transition-all">
                      Claim Rewards
                    </button>
                  )}
                  {position.type.includes('Vault') && (
                    <button className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-sm font-medium transition-all">
                      Compound
                    </button>
                  )}
                  {position.type.includes('Perp') && (
                    <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all">
                      Close Position
                    </button>
                  )}
                  <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm font-medium transition-all">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earnings Breakdown */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-bold mb-6">Earnings by Source</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  formatter={(value) => `$${value.toFixed(0)}`}
                />
                <Legend />
                <Bar dataKey="veVEIL" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="immortal" stackId="a" fill="#ec4899" radius={[0, 0, 0, 0]} />
                <Bar dataKey="vaults" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="trading" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Metrics & Events */}
          <div className="space-y-6">
            {/* Risk Metrics */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4">Risk Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                {riskMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-slate-400">{metric.metric}</p>
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'good' ? 'bg-green-400' : metric.status === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                    </div>
                    <p className="text-lg font-bold mb-1">{metric.value}</p>
                    <p className="text-xs text-slate-500">{metric.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{event.type}</p>
                        <p className="text-sm text-slate-400">{event.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{event.amount}</p>
                      <button className="text-xs text-violet-400 hover:text-violet-300">
                        {event.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTracker;
