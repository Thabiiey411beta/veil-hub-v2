'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter'] overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 215, 0, 0.05) 25%, rgba(255, 215, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, 0.05) 75%, rgba(255, 215, 0, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 215, 0, 0.05) 25%, rgba(255, 215, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 215, 0, 0.05) 75%, rgba(255, 215, 0, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl opacity-5 animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 border-b border-[#FFD700]/10 backdrop-blur-sm">
        <div className="text-2xl font-bold tracking-wider">
          <span className="text-[#FFD700]">◆</span> VEIL HUB
        </div>
        <div className="flex gap-8 items-center">
          <a href="#features" className="text-sm hover:text-[#FFD700] transition-colors">Features</a>
          <a href="#tokenomics" className="text-sm hover:text-[#FFD700] transition-colors">Tokenomics</a>
          <a href="#security" className="text-sm hover:text-[#FFD700] transition-colors">Security</a>
          <a href="#docs" className="text-sm hover:text-[#FFD700] transition-colors">Docs</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex items-center justify-between px-8 py-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 border border-[#FFD700]/30 rounded-full text-xs text-[#FFD700] font-bold">
              🌑 SUPRA L1 TESTNET LIVE
            </span>
          </div>

          <h1 className="text-7xl font-bold mb-6 leading-tight">
            The Final <span className="text-[#FFD700]">DeFi Organism</span>
          </h1>
          <p className="text-xl text-[#B0B0B0] mb-8 leading-relaxed max-w-xl">
            Zero-liquidation borrowing at 5.5% APR. Perpetual USDC yield (12-25% APR). Privacy-first. Built on Supra L1.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all hover:bg-[#FFD700]/5">
              <div className="text-[#FFD700] text-sm font-bold mb-2">5.5% APR</div>
              <div className="text-xs text-[#808080]">Fixed Borrowing</div>
            </div>
            <div className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all hover:bg-[#FFD700]/5">
              <div className="text-[#FFD700] text-sm font-bold mb-2">12-25% APR</div>
              <div className="text-xs text-[#808080]">Immortal Yield</div>
            </div>
            <div className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all hover:bg-[#FFD700]/5">
              <div className="text-[#FFD700] text-sm font-bold mb-2">2.5x Boost</div>
              <div className="text-xs text-[#808080]">veVEIL Lock</div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/dashboard" className="px-8 py-3 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#FFF700] transition-all hover:shadow-lg hover:shadow-[#FFD700]/50">
              Launch App
            </Link>
            <a href="#docs" className="px-8 py-3 border border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 transition-all">
              View Docs
            </a>
          </div>
        </div>

        {/* 3D Network Visualization */}
        <div className="relative w-1/2 h-96">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Central node */}
            <circle cx="200" cy="200" r="8" fill="#FFD700" className="animate-pulse" />
            
            {/* Orbital nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 200 + 120 * Math.cos(rad);
              const y = 200 + 120 * Math.sin(rad);
              return (
                <g key={angle}>
                  <line x1="200" y1="200" x2={x} y2={y} stroke="#FFD700" strokeWidth="1" opacity="0.3" />
                  <circle cx={x} cy={y} r="5" fill="#FFD700" opacity="0.6" />
                </g>
              );
            })}

            {/* Connecting lines between orbital nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const nextAngle = [60, 120, 180, 240, 300, 0][i];
              const rad1 = (angle * Math.PI) / 180;
              const rad2 = (nextAngle * Math.PI) / 180;
              const x1 = 200 + 120 * Math.cos(rad1);
              const y1 = 200 + 120 * Math.sin(rad1);
              const x2 = 200 + 120 * Math.cos(rad2);
              const y2 = 200 + 120 * Math.sin(rad2);
              return (
                <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD700" strokeWidth="0.5" opacity="0.2" />
              );
            })}

            {/* Outer ring */}
            <circle cx="200" cy="200" r="150" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.2" />
          </svg>

          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-transparent rounded-full blur-2xl animate-pulse" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-8 py-20 border-t border-[#FFD700]/10">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Core <span className="text-[#FFD700]">Features</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { 
              title: 'Zero-Liquidation Borrowing', 
              desc: 'Borrow USDC at 5.5% fixed APR with 180% collateral ratio. Auto-repay triggers at 120%.',
              icon: '💰'
            },
            { 
              title: 'Immortal Reserve', 
              desc: 'Burn $VEIL for perpetual USDC dividends (12-25% APR) with progressive burn bonuses.',
              icon: '♾️'
            },
            { 
              title: 'veVEIL Governance', 
              desc: 'Lock $VEIL for up to 2.5x yield boost and governance voting power.',
              icon: '🔒'
            },
            { 
              title: 'ERC-4626 Vaults', 
              desc: '60% performance fee burn for deflationary mechanics and automated harvesting.',
              icon: '🏦'
            },
            { 
              title: 'Buyback & Burn', 
              desc: '30% of borrow interest automatically burns $VEIL for continuous deflation.',
              icon: '🔥'
            },
            { 
              title: 'Supra Integration', 
              desc: 'Sub-second price feeds and autonomous vault harvesting via AutoFi.',
              icon: '⚡'
            },
          ].map((feature, i) => (
            <div key={i} className="group border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="font-bold mb-2 group-hover:text-[#FFD700] transition-colors">{feature.title}</h3>
                  <p className="text-sm text-[#808080]">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tokenomics Preview */}
      <section id="tokenomics" className="relative z-10 px-8 py-20 border-t border-[#FFD700]/10">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Token <span className="text-[#FFD700]">Economics</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Supply', value: '1B $VEIL' },
              { label: 'Burn Rate (Year 1)', value: '5.2%' },
              { label: 'Projected (Year 5)', value: '40-70%' },
              { label: 'Tokenomics Score', value: '9.5/10' },
            ].map((stat, i) => (
              <div key={i} className="border border-[#FFD700]/20 rounded-lg p-4 text-center hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
                <div className="text-[#FFD700] font-bold text-lg mb-1">{stat.value}</div>
                <div className="text-xs text-[#808080]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="border border-[#FFD700]/20 rounded-lg p-8 hover:border-[#FFD700]/50 transition-all">
            <h3 className="font-bold mb-6">Distribution Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Immortal Reserve', pct: '20%' },
                { label: 'Team', pct: '15%' },
                { label: 'Investors', pct: '10%' },
                { label: 'Liquidity Mining', pct: '25%' },
                { label: 'Treasury', pct: '20%' },
                { label: 'Community', pct: '10%' },
              ].map((alloc, i) => (
                <div key={i} className="text-center p-3 bg-[#FFD700]/5 rounded-lg">
                  <div className="text-[#FFD700] font-bold">{alloc.pct}</div>
                  <div className="text-xs text-[#808080]">{alloc.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-10 px-8 py-20 border-t border-[#FFD700]/10">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="text-[#FFD700]">Security</span> First
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Audited Contracts', desc: 'Trail of Bits, OpenZeppelin, Quantstamp' },
            { title: 'ReentrancyGuard', desc: 'All state-changing functions protected' },
            { title: 'Circuit Breaker', desc: '10% TVL drop triggers emergency halt' },
            { title: 'Rate Limiting', desc: 'Flash loan protection enabled' },
            { title: 'Oracle Protection', desc: 'TWAP + median price feeds' },
            { title: 'Role-Based Access', desc: 'Granular permission control' },
          ].map((item, i) => (
            <div key={i} className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
              <h3 className="font-bold mb-2 text-[#FFD700]">✓ {item.title}</h3>
              <p className="text-sm text-[#808080]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 px-8 py-20 border-t border-[#FFD700]/10 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Enter the Darkness?</h2>
        <p className="text-[#B0B0B0] mb-8 max-w-2xl mx-auto">
          Join the final DeFi organism. Experience zero-liquidation borrowing, perpetual yield, and true privacy on Supra L1.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="px-12 py-4 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#FFF700] transition-all hover:shadow-lg hover:shadow-[#FFD700]/50">
            Launch Application
          </Link>
          <a href="#docs" className="px-12 py-4 border border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 transition-all">
            Read Documentation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#FFD700]/10 px-8 py-12 text-center text-[#808080] text-sm">
        <p>© 2026 Veil Hub. Built in public. Audited by the best. Immortal by design.</p>
        <p className="mt-2">🌑 Welcome to the darkness. Welcome to freedom.</p>
      </footer>
    </div>
  );
}
