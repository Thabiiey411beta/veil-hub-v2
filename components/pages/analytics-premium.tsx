'use client';

import { useState, useEffect } from 'react';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');
  const [metrics, setMetrics] = useState({
    tvl: 245000000,
    volume24h: 125000000,
    activeUsers: 8542,
    totalBurned: 52000000,
    avgAPY: 18.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        tvl: prev.tvl + (Math.random() - 0.5) * 5000000,
        volume24h: prev.volume24h + (Math.random() - 0.5) * 10000000,
        activeUsers: prev.activeUsers + Math.floor((Math.random() - 0.5) * 100),
        totalBurned: prev.totalBurned + Math.random() * 100000,
        avgAPY: prev.avgAPY + (Math.random() - 0.5) * 0.5,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const chartData = Array.from({ length: 30 }).map((_, i) => ({
    day: i + 1,
    tvl: 200000000 + Math.random() * 100000000,
    volume: 80000000 + Math.random() * 80000000,
    users: 5000 + Math.random() * 5000,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter']">
      {/* Header */}
      <div className="border-b border-[#FFD700]/10 px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-[#FFD700]">◆</span> Protocol Analytics
          </h1>
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d', '1y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-bold ${
                  timeframe === tf
                    ? 'bg-[#FFD700] text-[#0A0A0A]'
                    : 'border border-[#FFD700]/30 text-[#FFD700] hover:border-[#FFD700]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Value Locked', value: formatNumber(metrics.tvl), change: '+12.5%', icon: '◆' },
            { label: '24h Volume', value: formatNumber(metrics.volume24h), change: '+8.3%', icon: '◆' },
            { label: 'Active Users', value: metrics.activeUsers.toLocaleString(), change: '+5.2%', icon: '◆' },
            { label: 'Total Burned', value: formatNumber(metrics.totalBurned), change: '+3.1%', icon: '◆' },
            { label: 'Avg APY', value: `${metrics.avgAPY.toFixed(2)}%`, change: '+1.8%', icon: '◆' },
          ].map((metric, i) => (
            <div key={i} className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[#808080] text-xs">{metric.label}</span>
                <span className="text-[#FFD700]">{metric.icon}</span>
              </div>
              <div className="text-lg font-bold mb-1">{metric.value}</div>
              <div className="text-xs text-[#FFD700]">↑ {metric.change}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* TVL Chart */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> TVL Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {chartData.map((data, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#FFD700]/40 to-[#FFD700]/10 rounded-t hover:from-[#FFD700]/60 hover:to-[#FFD700]/30 transition-all"
                  style={{ height: `${(data.tvl / 300000000) * 100}%` }}
                  title={`Day ${data.day}: ${formatNumber(data.tvl)}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#808080] mt-4">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Volume Chart */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> 24h Volume
            </h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {chartData.map((data, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#FFD700]/40 to-[#FFD700]/10 rounded-t hover:from-[#FFD700]/60 hover:to-[#FFD700]/30 transition-all"
                  style={{ height: `${(data.volume / 160000000) * 100}%` }}
                  title={`Day ${data.day}: ${formatNumber(data.volume)}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#808080] mt-4">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Revenue & Burn Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Distribution */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Revenue Split
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Immortal Reserve', value: 50, color: 'from-[#FFD700]' },
                { label: 'Buyback & Burn', value: 30, color: 'from-[#FFD700]/70' },
                { label: 'veVEIL Boost', value: 20, color: 'from-[#FFD700]/40' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.label}</span>
                    <span className="text-[#FFD700]">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#2C3E50] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} to-transparent`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Burn Analytics */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Burn Rate
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Daily Burn', value: '125K', change: '+2.3%' },
                { label: 'Weekly Burn', value: '875K', change: '+1.8%' },
                { label: 'Monthly Burn', value: '3.75M', change: '+0.9%' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#FFD700]/5 rounded-lg hover:bg-[#FFD700]/10 transition-all">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-[#FFD700] font-bold">{item.value}</span>
                  </div>
                  <div className="text-xs text-[#808080]">↑ {item.change}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Supply Metrics */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Supply Metrics
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Total Supply', value: '1B', change: '-5.2%' },
                { label: 'Circulating', value: '450M', change: '-3.1%' },
                { label: 'Locked (veVEIL)', value: '250M', change: '+8.5%' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#FFD700]/5 rounded-lg hover:bg-[#FFD700]/10 transition-all">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-[#FFD700] font-bold">{item.value}</span>
                  </div>
                  <div className="text-xs text-[#808080]">↑ {item.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Activity & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Activities */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Top Activities
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Borrow USDC', count: '2,450', value: '$125M', icon: '📊' },
                { action: 'Lock VEIL', count: '1,820', value: '$85M', icon: '🔒' },
                { action: 'Burn VEIL', count: '1,250', value: '$52M', icon: '🔥' },
                { action: 'Claim Yield', count: '3,100', value: '$18.5M', icon: '💰' },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#FFD700]/5 rounded-lg hover:bg-[#FFD700]/10 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{activity.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{activity.action}</div>
                      <div className="text-xs text-[#808080]">{activity.count} transactions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#FFD700]">{activity.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Health */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Protocol Health
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'System Stability', value: 98.5, status: 'excellent' },
                { metric: 'Collateral Ratio', value: 185, status: 'excellent' },
                { metric: 'Liquidation Risk', value: 2.1, status: 'low' },
                { metric: 'Smart Contract Audit', value: 100, status: 'excellent' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.metric}</span>
                    <span className="text-[#FFD700] font-bold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#2C3E50] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50"
                      style={{ width: `${Math.min(item.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics Table */}
        <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <span className="text-[#FFD700]">◆</span> Performance Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/20">
                  <th className="text-left py-3 px-4 text-[#808080]">Metric</th>
                  <th className="text-right py-3 px-4 text-[#808080]">Current</th>
                  <th className="text-right py-3 px-4 text-[#808080]">24h Change</th>
                  <th className="text-right py-3 px-4 text-[#808080]">7d Change</th>
                  <th className="text-right py-3 px-4 text-[#808080]">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'TVL', current: '$245M', d24: '+2.5%', d7: '+12.5%', status: '↑' },
                  { metric: 'Volume', current: '$125M', d24: '+1.8%', d7: '+8.3%', status: '↑' },
                  { metric: 'Users', current: '8,542', d24: '+0.5%', d7: '+5.2%', status: '↑' },
                  { metric: 'Avg APY', current: '18.5%', d24: '+0.2%', d7: '+1.8%', status: '↑' },
                  { metric: 'Burn Rate', current: '125K/day', d24: '+3.1%', d7: '+2.3%', status: '↑' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#FFD700]/10 hover:bg-[#FFD700]/5 transition-all">
                    <td className="py-3 px-4 font-semibold">{row.metric}</td>
                    <td className="text-right py-3 px-4 text-[#FFD700]">{row.current}</td>
                    <td className="text-right py-3 px-4 text-green-400">{row.d24}</td>
                    <td className="text-right py-3 px-4 text-green-400">{row.d7}</td>
                    <td className="text-right py-3 px-4">
                      <span className="text-[#FFD700] font-bold">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
