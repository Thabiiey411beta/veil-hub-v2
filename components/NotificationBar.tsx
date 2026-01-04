'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Notification, mockNotifications } from '@/lib/notifications'

export const NotificationBar: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('unread')

  const unreadCount = notifications.filter(n => !n.read).length
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleRemove = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      transaction: '#10b981',
      reward: '#FFD700',
      claim: '#8b5cf6',
      suggestion: '#06b6d4',
      alert: '#ef4444',
      success: '#10b981',
    }
    return colors[type] || '#FFD700'
  }

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0A0A0A] to-[#1a1a2e] border-b border-[#FFD700]/20">
      {/* Notification Bar */}
      <div className="max-w-full mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Summary */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔔</span>
              <span className="text-sm text-[#B0B0B0]">
                {unreadCount > 0 ? (
                  <>
                    <span className="text-[#FFD700] font-bold">{unreadCount}</span>
                    {' '}new notification{unreadCount !== 1 ? 's' : ''}
                  </>
                ) : (
                  'All caught up'
                )}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-[#FFD700]/20">
              {[
                { label: 'Rewards', count: notifications.filter(n => n.type === 'reward').length, icon: '💎' },
                { label: 'Claims', count: notifications.filter(n => n.type === 'claim').length, icon: '🎁' },
                { label: 'Transactions', count: notifications.filter(n => n.type === 'transaction').length, icon: '✓' },
              ].map((stat, i) => (
                <div key={i} className="text-xs">
                  <span className="text-[#B0B0B0]">{stat.icon} {stat.label}:</span>
                  <span className="text-[#FFD700] font-bold ml-1">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-sm hover:bg-[#FFD700]/20 transition-all"
            >
              {expanded ? '▼' : '▲'} {unreadCount > 0 ? unreadCount : 'View'}
            </button>
          </div>
        </div>

        {/* Expanded Notifications */}
        {expanded && (
          <div className="mt-4 max-h-96 overflow-y-auto">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-3 pb-3 border-b border-[#FFD700]/10">
              {(['all', 'unread'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    filter === f
                      ? 'bg-[#FFD700] text-[#0A0A0A]'
                      : 'bg-[#333] text-[#B0B0B0] hover:bg-[#444]'
                  }`}
                >
                  {f === 'all' ? 'All' : `Unread (${unreadCount})`}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-4 text-[#808080] text-sm">
                  No {filter === 'unread' ? 'unread' : ''} notifications
                </div>
              ) : (
                filteredNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border transition-all ${
                      notif.read
                        ? 'bg-[#0A0A0A] border-[#FFD700]/10'
                        : 'bg-[#1a1a2e] border-[#FFD700]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-lg mt-0.5">{notif.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-[#E0E0E0]">
                              {notif.title}
                            </h4>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: getTypeColor(notif.type) }}
                            >
                              {notif.type}
                            </span>
                          </div>
                          <p className="text-xs text-[#B0B0B0] mt-1">{notif.message}</p>
                          <div className="text-xs text-[#808080] mt-1">
                            {formatTime(notif.timestamp)}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {notif.action && (
                          <Link
                            href={notif.action.href}
                            className="px-2 py-1 rounded text-xs bg-[#FFD700]/20 text-[#FFD700] hover:bg-[#FFD700]/30 transition-all whitespace-nowrap"
                          >
                            {notif.action.label}
                          </Link>
                        )}
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="text-[#808080] hover:text-[#FFD700] transition-colors"
                            title="Mark as read"
                          >
                            ✓
                          </button>
                        )}
                        <button
                          onClick={() => handleRemove(notif.id)}
                          className="text-[#808080] hover:text-[#ef4444] transition-colors"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Margin for content */}
      <div className="h-2" />
    </div>
  )
}
