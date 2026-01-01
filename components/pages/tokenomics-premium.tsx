'use client';

import { useState } from 'react';

export default function Tokenomics() {
  const [activePhase, setActivePhase] = useState('pre');

  const distributionFlows = {
    pre: {
      title: 'Pre-Floor Phase',
      description: 'Revenue distribution before supply floor is reached',
      flows: [
        { source: 'Borrow Interest (100%)', splits: [
          { dest: 'Immortal Reserve', pct: 50, color: 'from-[#FFD700]' },
          { dest: 'Buyback & Burn', pct: 30, color: 'from-[#FFD700]/70' },
          { dest: 'veVEIL Boost', pct: 20, color: 'from-[#FFD700]/40' },
        ]},
        { source: 'Vault Fees (10%)', splits: [
          { dest: 'Burn', pct: 60, color: 'from-[#FFD700]' },
          { dest: 'Immortal Reserve', pct: 25, color: 'from-[#FFD700]/70' },
          { dest: 'veVEIL Holders', pct: 15, color: 'from-[#FFD700]/40' },
        ]},
      ]
    },
    post: {
      title: 'Post-Floor Phase',
      description: 'Revenue distribution after supply floor is reached',
      flows: [
        { source: 'Borrow Interest (100%)', splits: [
          { dest: 'Immortal Reserve', pct: 40, color: 'from-[#FFD700]' },
          { dest: 'Treasury', pct: 35, color: 'from-[#FFD700]/70' },
          { dest: 'veVEIL Boost', pct: 25, color: 'from-[#FFD700]/40' },
        ]},
        { source: 'Vault Fees (10%)', splits: [
          { dest: 'Immortal Reserve', pct: 50, color: 'from-[#FFD700]' },
          { dest: 'Treasury', pct: 30, color: 'from-[#FFD700]/70' },
          { dest: 'veVEIL Holders', pct: 20, color: 'from-[#FFD700]/40' },
        ]},
      ]
    }
  };

  const currentPhase = distributionFlows[activePhase as keyof typeof distributionFlows];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter']">
      {/* Header */}
      <div className="border-b border-[#FFD700]/10 px-8 py-6">
        <h1 className="text-3xl font-bold">
          <span className="text-[#FFD700]">◆</span> Tokenomics & Revenue
        </h1>
      </div>

      <div className="p-8">
        {/* Token Distribution */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-[#FFD700]">$VEIL</span> Token Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Immortal Reserve', pct: 20, amount: '200M' },
              { label: 'Team', pct: 15, amount: '150M' },
              { label: 'Investors', pct: 10, amount: '100M' },
              { label: 'Liquidity Mining', pct: 25, amount: '250M' },
              { label: 'Treasury', pct: 20, amount: '200M' },
              { label: 'Community', pct: 10, amount: '100M' },
            ].map((alloc, i) => (
              <div key={i} className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all text-center">
                <div className="text-[#FFD700] font-bold text-lg mb-2">{alloc.pct}%</div>
                <div className="text-xs text-[#808080] mb-2">{alloc.label}</div>
                <div className="text-sm font-bold">{alloc.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scarcity Mechanisms */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-[#FFD700]">Scarcity</span> Mechanisms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Burn-to-Earn', desc: 'Permanent supply reduction through burning', icon: '🔥' },
              { title: 'Vault Fee Burn', desc: '60% of performance fees burned', icon: '💥' },
              { title: 'Buyback & Burn', desc: '30% of borrow interest burns $VEIL', icon: '♻️' },
              { title: 'Progressive Bonuses', desc: 'Early burners get 1.5x shares', icon: '⭐' },
              { title: 'veVEIL Lock', desc: 'Removes circulating supply', icon: '🔒' },
              { title: 'Supply Floor', desc: 'Minimum price support mechanism', icon: '📊' },
            ].map((mech, i) => (
              <div key={i} className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{mech.icon}</span>
                  <div>
                    <h3 className="font-bold mb-2">{mech.title}</h3>
                    <p className="text-sm text-[#808080]">{mech.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-[#FFD700]">Revenue</span> Distribution
          </h2>

          {/* Phase Selector */}
          <div className="flex gap-4 mb-8">
            {['pre', 'post'].map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  activePhase === phase
                    ? 'bg-[#FFD700] text-[#0A0A0A]'
                    : 'border border-[#FFD700]/30 text-[#FFD700] hover:border-[#FFD700]'
                }`}
              >
                {phase === 'pre' ? 'Pre-Floor Phase' : 'Post-Floor Phase'}
              </button>
            ))}
          </div>

          {/* Distribution Flows */}
          <div className="space-y-8">
            {currentPhase.flows.map((flow, flowIdx) => (
              <div key={flowIdx} className="border border-[#FFD700]/20 rounded-lg p-8 hover:border-[#FFD700]/50 transition-all">
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-[#FFD700]">◆</span> {flow.source}
                  </h3>
                </div>

                {/* Flow Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {flow.splits.map((split, splitIdx) => (
                    <div key={splitIdx} className="relative">
                      {/* Arrow from source */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-[#FFD700]/30 to-transparent" />

                      {/* Destination box */}
                      <div className="border border-[#FFD700]/30 rounded-lg p-6 bg-[#FFD700]/5 hover:border-[#FFD700]/50 transition-all">
                        <div className="text-center">
                          <div className="text-[#FFD700] font-bold text-2xl mb-2">{split.pct}%</div>
                          <div className="text-sm font-semibold mb-4">{split.dest}</div>
                          
                          {/* Progress bar */}
                          <div className="h-2 bg-[#2C3E50] rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${split.color} to-transparent`}
                              style={{ width: `${split.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projected Supply Reduction */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-[#FFD700]">Projected</span> Supply Reduction
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Conservative Scenario */}
            <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <span className="text-[#FFD700]">◆</span> Conservative ($100M TVL)
              </h3>
              <div className="space-y-4">
                {[
                  { year: 'Year 1', burned: '52M', pct: '5.2%' },
                  { year: 'Year 3', burned: '200M', pct: '20%' },
                  { year: 'Year 5', burned: '400M', pct: '40%' },
                ].map((scenario, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{scenario.year}</span>
                      <span className="text-[#FFD700]">{scenario.burned} ({scenario.pct})</span>
                    </div>
                    <div className="h-3 bg-[#2C3E50] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50"
                        style={{ width: scenario.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aggressive Scenario */}
            <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <span className="text-[#FFD700]">◆</span> Aggressive ($1B TVL)
              </h3>
              <div className="space-y-4">
                {[
                  { year: 'Year 1', burned: '210M', pct: '21%' },
                  { year: 'Year 3', burned: '500M', pct: '50%' },
                  { year: 'Year 5', burned: '700M', pct: '70%' },
                ].map((scenario, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{scenario.year}</span>
                      <span className="text-[#FFD700]">{scenario.burned} ({scenario.pct})</span>
                    </div>
                    <div className="h-3 bg-[#2C3E50] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50"
                        style={{ width: scenario.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="border border-[#FFD700]/20 rounded-lg p-8 hover:border-[#FFD700]/50 transition-all">
          <h2 className="text-2xl font-bold mb-8">
            <span className="text-[#FFD700]">Key</span> Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Supply', value: '1B $VEIL' },
              { label: 'Tokenomics Score', value: '9.5/10' },
              { label: 'Max veVEIL Boost', value: '2.5x' },
              { label: 'Vault Burn Rate', value: '60%' },
            ].map((metric, i) => (
              <div key={i} className="text-center p-4 bg-[#FFD700]/5 rounded-lg">
                <div className="text-[#FFD700] font-bold text-2xl mb-2">{metric.value}</div>
                <div className="text-sm text-[#808080]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
