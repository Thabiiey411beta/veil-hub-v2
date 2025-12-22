'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Lock,
  Shield,
  Zap,
  Target,
  DollarSign,
  Flame,
  Activity,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
} from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Lock,
      title: 'Zero-Liquidation Borrowing',
      description: 'Borrow USDC at 5.5% fixed APR with 180% collateral ratio. Auto-repay protects your position.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: Flame,
      title: 'Immortal Reserve',
      description: 'Burn VEIL for permanent shares. Earn 12-25% APY in monthly USDC dividends.',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: Target,
      title: 'Immortal Vaults',
      description: 'Auto-compounding strategies with 60% performance fee burn. Set it and forget it.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: BarChart3,
      title: 'Perpetual Trading',
      description: 'Trade BTC, ETH, and more with up to 50x leverage. 5bps fees, confidential orders.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Advanced Lending',
      description: 'Fixed/variable rates, P2P matching, and auto-optimizer for best yields.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: Zap,
      title: 'Dual Restaking',
      description: 'Earn on both EigenLayer and Symbiotic with flexible collateral options.',
      gradient: 'from-yellow-500 to-amber-600',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$987.5M', change: '+12.3%' },
    { label: 'Monthly Revenue', value: '$4.2M', change: '+8.7%' },
    { label: 'Tokens Burned', value: '120M VEIL', change: '+2.1M' },
    { label: 'Active Users', value: '14,523', change: '+432' },
  ];

  const tokenomics = [
    { metric: 'Fixed Borrow Rate', value: '5.5% APR' },
    { metric: 'Immortal Yield', value: '12-25% APR' },
    { metric: 'veVEIL Max Boost', value: '2.5x' },
    { metric: 'Vault Fee Burn', value: '60%' },
    { metric: 'Total Supply', value: '1B VEIL' },
    { metric: 'Circulating', value: '580M' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at ${50 + scrollY * 0.05}% ${50 + scrollY * 0.03}%, rgba(139, 92, 246,
