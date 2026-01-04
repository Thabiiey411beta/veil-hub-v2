'use client'

import React, { useState } from 'react'
import { Suggestion, generateSuggestions, applyEnhancement } from '@/lib/suggestions-engine'
import toast from 'react-hot-toast'

interface SuggestionPanelProps {
  page: string
  onApply?: (suggestion: Suggestion) => void
}

export const SuggestionPanel: React.FC<SuggestionPanelProps> = ({ page, onApply }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(generateSuggestions(page))
  const [expanded, setExpanded] = useState(false)

  const handleApprove = (suggestion: Suggestion) => {
    const enhancement = applyEnhancement(suggestion)
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id))
    toast.success(`✨ Enhancement applied: ${suggestion.title}`)
    onApply?.(suggestion)
  }

  const handleDismiss = (id: string) => {
    setSuggestions(suggestions.filter(s => s.id !== id))
  }

  const highPriority = suggestions.filter(s => s.priority === 'high')
  const mediumPriority = suggestions.filter(s => s.priority === 'medium')

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-[#0A0A0A] font-bold text-xl"
      >
        ✨
      </button>

      {/* Suggestion Panel */}
      {expanded && (
        <div className="absolute bottom-20 right-0 w-96 bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg shadow-2xl p-6 backdrop-blur-sm max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#FFD700]">AI Suggestions</h3>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#808080] hover:text-[#FFD700] transition-colors"
            >
              ✕
            </button>
          </div>

          {suggestions.length === 0 ? (
            <p className="text-[#808080] text-sm">All suggestions applied! 🎉</p>
          ) : (
            <div className="space-y-4">
              {/* High Priority */}
              {highPriority.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#ef4444] mb-2 uppercase">High Priority</h4>
                  <div className="space-y-2">
                    {highPriority.map(suggestion => (
                      <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                        onApprove={handleApprove}
                        onDismiss={handleDismiss}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Medium Priority */}
              {mediumPriority.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#FFD700] mb-2 uppercase">Suggested</h4>
                  <div className="space-y-2">
                    {mediumPriority.map(suggestion => (
                      <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                        onApprove={handleApprove}
                        onDismiss={handleDismiss}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface SuggestionCardProps {
  suggestion: Suggestion
  onApprove: (suggestion: Suggestion) => void
  onDismiss: (id: string) => void
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onApprove, onDismiss }) => {
  const categoryColors: Record<string, string> = {
    feature: '#8b5cf6',
    ux: '#06b6d4',
    performance: '#10b981',
    security: '#ef4444',
  }

  return (
    <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3 hover:border-[#FFD700]/50 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h5 className="font-semibold text-sm text-[#E0E0E0]">{suggestion.title}</h5>
          <p className="text-xs text-[#808080] mt-1">{suggestion.description}</p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: categoryColors[suggestion.category] }}
        >
          {suggestion.category}
        </span>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onApprove(suggestion)}
          className="flex-1 bg-[#FFD700] text-[#0A0A0A] text-xs font-bold py-1 rounded hover:bg-[#FFA500] transition-colors"
        >
          Apply
        </button>
        <button
          onClick={() => onDismiss(suggestion.id)}
          className="flex-1 bg-[#333] text-[#E0E0E0] text-xs font-bold py-1 rounded hover:bg-[#444] transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
