'use client'

import React, { useState } from 'react'
import { GradientCard, RippleButton } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

export default function MagicPage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<'minimal' | 'modern' | 'glassmorphism' | 'gradient'>('glassmorphism')
  const [generatedCode, setGeneratedCode] = useState('')
  const [loading, setLoading] = useState(false)

  const generateComponent = () => {
    if (!prompt.trim()) return

    setLoading(true)
    setTimeout(() => {
      const templates: Record<string, string> = {
        minimal: `'use client'

import React from 'react'

export default function Component() {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h2 className="text-lg font-bold">${prompt}</h2>
      <p className="text-gray-600 mt-2">Component generated with AI</p>
    </div>
  )
}`,
        modern: `'use client'

import React from 'react'

export default function Component() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white">${prompt}</h2>
      <p className="text-blue-100 mt-3">Modern component design</p>
      <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
        Action
      </button>
    </div>
  )
}`,
        glassmorphism: `'use client'

import React from 'react'

export default function Component() {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
      <h2 className="text-xl font-bold text-white">${prompt}</h2>
      <p className="text-white/70 mt-2">Glassmorphism design</p>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all">
          Learn More
        </button>
      </div>
    </div>
  )
}`,
        gradient: `'use client'

import React from 'react'

export default function Component() {
  return (
    <div className="p-6 bg-gradient-to-br from-[#FFD700] via-[#8b5cf6] to-[#ef4444] rounded-xl">
      <h2 className="text-2xl font-bold text-white">${prompt}</h2>
      <p className="text-white/90 mt-2">Gradient design with Veil theme</p>
      <button className="mt-4 px-6 py-2 bg-white text-transparent bg-clip-text font-bold hover:scale-105 transition-transform">
        Get Started
      </button>
    </div>
  )
}`,
      }

      setGeneratedCode(templates[style] || templates.glassmorphism)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#FFD700]">✨</span> Magic Component Generator
          </h1>
          <p className="text-[#B0B0B0]">Generate beautiful UI components with AI</p>
        </div>

        {/* Generator */}
        <GradientCard className="mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-[#FFD700]">Component Description</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a trading card component with price, change percentage, and buy button"
                className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg px-4 py-3 text-[#E0E0E0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-[#FFD700]">Style</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['minimal', 'modern', 'glassmorphism', 'gradient'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-2 px-4 rounded-lg transition-all text-sm font-bold ${
                      style === s
                        ? 'bg-[#FFD700] text-[#0A0A0A]'
                        : 'border border-[#FFD700]/30 text-[#FFD700] hover:border-[#FFD700]'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <RippleButton onClick={generateComponent} className="w-full">
              {loading ? 'Generating...' : 'Generate Component'}
            </RippleButton>
          </div>
        </GradientCard>

        {/* Generated Code */}
        {generatedCode && (
          <GradientCard className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#FFD700]">Generated Code</h2>
            <pre className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4 overflow-x-auto text-sm text-[#10b981]">
              <code>{generatedCode}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="mt-4 px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] rounded-lg hover:bg-[#FFD700]/30 transition-all text-sm font-bold"
            >
              📋 Copy Code
            </button>
          </GradientCard>
        )}

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="magic" />
      </div>
    </div>
  )
}
