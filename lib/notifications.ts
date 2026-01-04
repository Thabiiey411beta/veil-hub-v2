// Notification types and management
export type NotificationType = 'transaction' | 'reward' | 'claim' | 'suggestion' | 'alert' | 'success'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: number
  read: boolean
  action?: {
    label: string
    href: string
  }
  icon: string
}

export const notificationStore = {
  notifications: [] as Notification[],
  
  add(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      read: false,
    }
    this.notifications.unshift(newNotification)
    if (this.notifications.length > 50) {
      this.notifications.pop()
    }
    return newNotification
  },

  markAsRead(id: string) {
    const notif = this.notifications.find(n => n.id === id)
    if (notif) notif.read = true
  },

  remove(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id)
  },

  getUnread() {
    return this.notifications.filter(n => !n.read)
  },

  getByType(type: NotificationType) {
    return this.notifications.filter(n => n.type === type)
  },
}

// Mock notifications for demo
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reward',
    title: 'Immortal Yield Earned',
    message: '$1,250 USDC earned from Immortal Reserve',
    timestamp: Date.now() - 300000,
    read: false,
    icon: '💎',
    action: { label: 'Claim', href: '/vaults' },
  },
  {
    id: '2',
    type: 'claim',
    title: 'Claim Available',
    message: 'You have 5,000 VEIL available to claim',
    timestamp: Date.now() - 600000,
    read: false,
    icon: '🎁',
    action: { label: 'Claim Now', href: '/governance' },
  },
  {
    id: '3',
    type: 'transaction',
    title: 'Deposit Confirmed',
    message: '50,000 VEIL deposited to Immortal Reserve',
    timestamp: Date.now() - 900000,
    read: false,
    icon: '✓',
  },
  {
    id: '4',
    type: 'suggestion',
    title: 'AI Portfolio Suggestion',
    message: 'Rebalance portfolio: Move 20% to Stable Yield vault',
    timestamp: Date.now() - 1200000,
    read: false,
    icon: '✨',
    action: { label: 'View', href: '/finance' },
  },
  {
    id: '5',
    type: 'alert',
    title: 'Collateral Ratio Alert',
    message: 'Your collateral ratio is at 185%, consider adding more collateral',
    timestamp: Date.now() - 1500000,
    read: true,
    icon: '⚠️',
  },
]
