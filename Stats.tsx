'use client'

import { DollarSign, TrendingUp, Shield, Zap } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: DollarSign,
      value: '$1B+',
      label: 'Target TVL',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: TrendingUp,
      value: '25%',
      label: 'Max USDC APR',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      icon: Shield,
      value: '5.5%',
      label: 'Fixed Borrow Rate',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/20'
    },
    {
      icon: Zap,
      value: '4.2x',
      label: 'Max Leverage',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    }
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="cyber-card text-center group hover:scale-105 transition-all duration-300">
              <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}