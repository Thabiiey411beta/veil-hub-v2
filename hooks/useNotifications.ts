'use client'

import { useState, useCallback } from 'react'
import { Notification, NotificationType } from '@/lib/notifications'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    icon: string,
    action?: { label: string; href: string }
  ) => {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      read: false,
      icon,
      action,
    }
    setNotifications(prev => [notification, ...prev.slice(0, 49)])
    return notification
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  return {
    notifications,
    addNotification,
    markAsRead,
    removeNotification,
    getUnreadCount,
  }
}
