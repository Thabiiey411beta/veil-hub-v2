'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { Notification } from '@/lib/notifications'

export const showNotificationToast = (notification: Notification) => {
  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      transaction: '✓',
      reward: '💎',
      claim: '🎁',
      suggestion: '✨',
      alert: '⚠️',
      success: '✓',
    }
    return icons[type] || '🔔'
  }

  const getColor = (type: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      transaction: { bg: '#10b981', text: '#ffffff' },
      reward: { bg: '#FFD700', text: '#0A0A0A' },
      claim: { bg: '#8b5cf6', text: '#ffffff' },
      suggestion: { bg: '#06b6d4', text: '#ffffff' },
      alert: { bg: '#ef4444', text: '#ffffff' },
      success: { bg: '#10b981', text: '#ffffff' },
    }
    return colors[type] || { bg: '#FFD700', text: '#0A0A0A' }
  }

  const color = getColor(notification.type)

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg shadow-lg pointer-events-auto`}
      >
        <div className="flex items-start gap-3 p-4">
          <span className="text-2xl">{getIcon(notification.type)}</span>
          <div className="flex-1">
            <h3 className="font-bold text-[#E0E0E0] text-sm">{notification.title}</h3>
            <p className="text-xs text-[#B0B0B0] mt-1">{notification.message}</p>
            {notification.action && (
              <a
                href={notification.action.href}
                className="text-xs mt-2 inline-block px-2 py-1 rounded"
                style={{ backgroundColor: color.bg, color: color.text }}
              >
                {notification.action.label}
              </a>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-[#808080] hover:text-[#FFD700] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    { duration: 5000 }
  )
}
