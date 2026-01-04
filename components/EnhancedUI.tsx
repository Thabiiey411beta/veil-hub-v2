'use client';

import { ReactNode } from 'react';

// Enhanced Card with gradient border
export function GradientCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Animated stat counter
export function StatCounter({ value, label, suffix = '' }: { value: string | number; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-[#FFD700] mb-2 animate-pulse">
        {value}{suffix}
      </div>
      <div className="text-xs text-[#808080]">{label}</div>
    </div>
  );
}

// Enhanced button with ripple effect
export function RippleButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-lg overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      <span className="relative">{children}</span>
    </button>
  );
}

// Glassmorphism panel
export function GlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`backdrop-blur-md bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

// Animated gradient text
export function GradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-[#FFD700] to-[#FFF700] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

// Floating label input
export function FloatingInput({ label, type = 'text', placeholder = '', value = '', onChange }: { label: string; type?: string; placeholder?: string; value?: string; onChange?: (e: any) => void }) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg px-4 py-3 text-[#E0E0E0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none transition-all peer"
      />
      <label className="absolute left-4 -top-2.5 bg-[#0A0A0A] px-2 text-xs text-[#FFD700] peer-focus:text-[#FFD700] transition-all">
        {label}
      </label>
    </div>
  );
}

// Animated progress bar
export function AnimatedProgress({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full h-2 bg-[#2C3E50] rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFF700] transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Badge with animation
export function AnimatedBadge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' }) {
  const variants = {
    default: 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${variants[variant]} animate-pulse`}>
      {children}
    </span>
  );
}

// Tooltip component
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#FFD700] text-[#0A0A0A] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {text}
      </div>
    </div>
  );
}
