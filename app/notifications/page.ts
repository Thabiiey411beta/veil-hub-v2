import React, { useState } from 'react';
import { Bell, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, DollarSign, Lock, Target, Zap, Shield, Eye, Settings, Filter, X } from 'lucide-react';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  
  // Notification categories with settings
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: { enabled: true, threshold: 5 },
    governance: { enabled: true, quorum: 50 },
    positions: { enabled: true, pnlThreshold: 10 },
    rewards: { enabled: true, minAmount: 10 },
    vaults: { enabled: true, apyChange: 5 },
    protocol: { enabled: true }
  });

  // Notifications data
  const notifications = [
    {
      id: 1,
      type: 'price',
      category: 'Price Alert',
      title: 'BTC Price Movement',
      message: 'Bitcoin crossed above $43,000. Your position is now +15.4% in profit.',
      icon: TrendingUp,
      color: 'green',
      timestamp: '2 min ago',
      read: false,
      priority: 'high',
      action: 'View Position'
    },
    {
      id: 2,
      type: 'reward',
      category: 'Rewards',
      title: 'Dividend Available',
      message: 'You have $892.45 USDC ready to claim from Immortal Reserve.',
      icon: DollarSign,
      color: 'violet',
      timestamp: '15 min ago',
      read: false,
      priority: 'medium',
      action: 'Claim Now'
    },
    {
      id: 3,
      type: 'governance',
      category: 'Governance',
      title: 'New Proposal: Increase Burn Rate',
      message: 'Proposal #42 to increase vault fee burn to 70% is now live. Vote with your veVEIL.',
      icon: Target,
      color: 'pink',
      timestamp: '1 hour ago',
      read: false,
      priority: 'high',
      action: 'Vote Now'
    },
    {
      id: 4,
      type: 'position',
      category: 'Position Alert',
      title: 'Stop Loss Triggered',
      message: 'Your ETH short position was closed at $2,234.56. PnL: -$123.45 (-1.05%)',
      icon: AlertCircle,
      color: 'red',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high',
      action: 'View Details'
    },
    {
      id: 5,
      type: 'vault',
      category: 'Vault Update',
      title: 'Auto-Compound Executed',
      message: 'BTC/ETH Alpha vault harvested $234.12 in rewards. Your share: $12.34.',
      icon: Zap,
      color: 'yellow',
      timestamp: '3 hours ago',
      read: true,
      priority: 'low',
      action: 'View Vault'
    },
    {
      id: 6,
      type: 'protocol',
      category: 'Protocol',
      title: 'Security Audit Completed',
      message: 'Trail of Bits audit report published. All critical issues resolved.',
      icon: Shield,
      color: 'blue',
      timestamp: '5 hours ago',
      read: true,
      priority: 'medium',
      action: 'Read Report'
    },
    {
      id: 7,
      type: 'lock',
      category: 'veVEIL',
      title: 'Lock Expiring Soon',
      message: 'Your 150K veVEIL lock expires in 45 days. Extend to maintain boost.',
      icon: Lock,
      color: 'orange',
      timestamp: '1 day ago',
      read: true,
      priority: 'medium',
      action: 'Extend Lock'
    },
    {
      id: 8,
      type: 'price',
      category: 'Price Alert',
      title: 'VEIL Token Milestone',
      message: 'VEIL price reached new ATH of $3.45. Market cap: $3.45B',
      icon: TrendingUp,
      color: 'green',
      timestamp: '1 day ago',
      read: true,
      priority: 'low',
      action: 'View Chart'
    }
  ];

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    if (activeTab === 'priority') return notif.priority === 'high';
    return notif.type === activeTab;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconColor = (color) => {
    const colors = {
      green: 'text-green-400 bg-green-500/20',
      violet: 'text-violet-400 bg-violet-500/20',
      pink: 'text-pink-400 bg-pink-500/20',
      red: 'text-red-400 bg-red-500/20',
      yellow: 'text-yellow-400 bg-yellow-500/20',
      blue: 'text-blue-400 bg-blue-500/20',
      orange: 'text-orange-400 bg-orange-500/20'
    };
    return colors[color] || colors.violet;
  };

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'priority', label: 'Priority', count: notifications.filter(n => n.priority === 'high').length },
    { id: 'price', label: 'Prices' },
    { id: 'position', label: 'Positions' },
    { id: 'reward', label: 'Rewards' },
    { id: 'governance', label: 'Governance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Bell className="w-7 h-7" />
              </div>
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {unreadCount}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-slate-400">Stay updated on all protocol activity</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button className="px-4 py-3 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 rounded-lg font-medium transition-all">
              Mark All Read
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Notification Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(notificationSettings).map(([key, settings]) => (
                <div key={key} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enabled}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          [key]: { ...settings, enabled: !settings.enabled }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                    </label>
                  </div>
                  {key === 'priceAlerts' && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Price Change Threshold (%)</label>
                      <input
                        type="number"
                        value={settings.threshold}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          priceAlerts: { ...settings, threshold: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-1 bg-slate-900 border border-slate-700 rounded text-sm"
                      />
                    </div>
                  )}
                  {key === 'positions' && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">PnL Alert Threshold (%)</label>
                      <input
                        type="number"
                        value={settings.pnlThreshold}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          positions: { ...settings, pnlThreshold: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-1 bg-slate-900 border border-slate-700 rounded text-sm"
                      />
                    </div>
                  )}
                  {key === 'rewards' && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Min Amount (USDC)</label>
                      <input
                        type="number"
                        value={settings.minAmount}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          rewards: { ...settings, minAmount: parseFloat(e.target.value) }
                        })}
                        className="w-full px-3 py-1 bg-slate-900 border border-slate-700 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                  : 'bg-slate-800/50 hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 px-2 py-0.5 bg-slate-900 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-12 border border-slate-800 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">No notifications</h3>
              <p className="text-slate-400">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 border transition-all hover:border-violet-500/50 ${
                    notif.read ? 'border-slate-800 opacity-70' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(notif.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{notif.title}</h3>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-violet-500 rounded-full" />
                            )}
                            {notif.priority === 'high' && (
                              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-bold">
                                Priority
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mb-1">{notif.category}</p>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-3">
                          {notif.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 mb-3">{notif.message}</p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-medium text-sm transition-all">
                          {notif.action}
                        </button>
                        {!notif.read && (
                          <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg font-medium text-sm transition-all">
                            Mark Read
                          </button>
                        )}
                        <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg font-medium text-sm transition-all">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="font-bold">Create Price Alert</h4>
                <p className="text-xs text-slate-400">Get notified on price movements</p>
              </div>
            </div>
            <button className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm font-medium transition-all">
              Set Alert
            </button>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 border border-slate-800 hover:border-pink-500/50 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h4 className="font-bold">Watch Proposal</h4>
                <p className="text-xs text-slate-400">Track governance proposals</p>
              </div>
            </div>
            <button className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm font-medium transition-all">
              Add Watch
            </button>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 border border-slate-800 hover:border-green-500/50 transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold">Auto-Actions</h4>
                <p className="text-xs text-slate-400">Automate claim & compound</p>
              </div>
            </div>
            <button className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm font-medium transition-all">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
