import React, { useState } from 'react';
import { Home, BarChart3, Target, Lock, Vote, Book, Menu, X, Bell, Settings, User, LogOut, ChevronDown, Wallet } from 'lucide-react';

export default function RootLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Trade', href: '/trade', icon: BarChart3 },
    { name: 'Vaults', href: '/vaults', icon: Target },
    { name: 'Borrow', href: '/borrow', icon: Lock },
    { name: 'Governance', href: '/governance', icon: Vote },
    { name: 'Docs', href: '/docs', icon: Book }
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Veil Hub - The Final DeFi Organism</title>
        <meta name="description" content="Zero-liquidation borrowing, perpetual USDC dividends, and privacy-first DeFi on Supra L1" />
      </head>
      <body className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <span className="font-bold text-lg">V</span>
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                    Veil Hub
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                {/* Network Selector */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Supra L1</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
                  <Bell className="w-5 h-5" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Connect Wallet / User Menu */}
                {isConnected ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 rounded-lg transition-all"
                    >
                      <Wallet className="w-4 h-4" />
                      <span className="hidden sm:inline">0x742d...35ba</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Balance</span>
                            <span className="font-bold">$12,456.89</span>
                          </div>
                          <div className="text-xs text-slate-500">0x742d...35ba</div>
                        </div>
                        <div className="p-2">
                          <a href="/portfolio" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                            <User className="w-4 h-4" />
                            <span>Portfolio</span>
                          </a>
                          <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </a>
                          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-red-400">
                            <LogOut className="w-4 h-4" />
                            <span>Disconnect</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsConnected(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/25"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-800 bg-slate-950">
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>

        {/* Toast Notifications Container */}
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {/* Toast notifications will appear here */}
        </div>
      </body>
    </html>
  );
}
