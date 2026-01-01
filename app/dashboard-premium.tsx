'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [tvl, setTvl] = useState(245000000);
  const [price, setPrice] = useState(0.85);
  const [supplyFloor, setSupplyFloor] = useState(0.92);

  useEffect(() => {
    const interval = setInterval(() => {
      setTvl(prev => prev + Math.random() * 1000000 - 500000);
      setPrice(prev => prev + (Math.random() - 0.5) * 0.05);
      setSupplyFloor(prev => prev + (Math.random() - 0.5) * 0.02);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter']">
      {/* Header */}
      <div className="border-b border-[#FFD700]/10 px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-[#FFD700]">◆</span> Dashboard
          </h1>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-[#FFD700]/30 rounded-lg hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all text-sm">
              Settings
            </button>
            <button className="px-6 py-2 bg-[#FFD700] text-[#0A0A0A] rounded-lg hover:bg-[#FFF700] transition-all text-sm font-bold">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Value Locked', value: formatNumber(tvl), change: '+12.5%', icon: '◆' },
            { label: 'VEIL Price', value: `$${price.toFixed(4)}`, change: '+5.2%', icon: '◆' },
            { label: 'Supply Floor', value: `$${supplyFloor.toFixed(2)}`, change: '+8.1%', icon: '◆' },
            { label: 'Projected Revenue', value: '$2.4M', change: '+15.3%', icon: '◆' },
          ].map((metric, i) => (
            <div key={i} className="group border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#808080] text-sm">{metric.label}</span>
                <span className="text-[#FFD700]">{metric.icon}</span>
              </div>
              <div className="text-2xl font-bold mb-2">{metric.value}</div>
              <div className="text-xs text-[#FFD700]">↑ {metric.change}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* TVL Chart */}
          <div className="lg:col-span-2 border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> TVL Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#FFD700]/30 to-[#FFD700]/10 rounded-t hover:from-[#FFD700]/50 hover:to-[#FFD700]/30 transition-all"
                  style={{ height: `${30 + Math.random() * 70}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#808080] mt-4">
              <span>30d ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Yield Distribution */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Yield Split
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
        </div>

        {/* Portfolio & Positions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Positions */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Your Positions
            </h3>
            <div className="space-y-4">
              {[
                { asset: 'VEIL Locked', amount: '50,000', value: '$42,500', apy: '18.5%' },
                { asset: 'USDC Borrowed', amount: '25,000', value: '$25,000', apy: '5.5%' },
                { asset: 'Immortal Shares', amount: '1,250', value: '$18,750', apy: '22.3%' },
              ].map((pos, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#FFD700]/5 rounded-lg hover:bg-[#FFD700]/10 transition-all">
                  <div>
                    <div className="font-semibold text-sm">{pos.asset}</div>
                    <div className="text-xs text-[#808080]">{pos.amount}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{pos.value}</div>
                    <div className="text-xs text-[#FFD700]">{pos.apy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Locked 10,000 VEIL', time: '2 hours ago', status: 'success' },
                { action: 'Borrowed 5,000 USDC', time: '5 hours ago', status: 'success' },
                { action: 'Claimed 125 USDC yield', time: '1 day ago', status: 'success' },
                { action: 'Burned 500 VEIL', time: '2 days ago', status: 'success' },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#FFD700]/5 rounded-lg hover:bg-[#FFD700]/10 transition-all">
                  <div>
                    <div className="font-semibold text-sm">{activity.action}</div>
                    <div className="text-xs text-[#808080]">{activity.time}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
