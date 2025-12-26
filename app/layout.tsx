# Look for <<<<<<< HEAD, =======, >>>>>>> markers
# Keep the desired code (likely the incoming changes for Providers)<<<<<<< Updated upstream
<<<<<<< Updated upstream
'use client';

import React, { useState } from 'react';
import { Home, BarChart3, Target, Lock, Vote, Book, Menu, X, Bell, Settings, User, LogOut, ChevronDown, Wallet } from 'lucide-react';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Trade', href: '/trade', icon: BarChart3 },
    { name: 'Vaults', href: '/vaults', icon: Target },
    { name: 'Borrow', href: '/borrow', icon: Lock },
    { name: 'Governance', href: '/governance', icon: Vote },
    { name: 'Docs', href: '/docs', icon: Book },
  ];
=======
import React from 'react'
>>>>>>> Stashed changes
=======
import React from 'react'
>>>>>>> Stashed changes

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <body className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
        <Providers>
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
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Supra L1</span>
                </div>

                <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
                  <Bell className="w-5 h-5" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

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
=======
=======
>>>>>>> Stashed changes
      <body className="font-sans bg-[#0f0f1a] text-gray-100 antialiased min-h-screen flex flex-col">
        <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-900">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center font-bold text-black">V</div>
            <span className="text-lg font-semibold">Veil Hub</span>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <a href="#" className="text-sm text-gray-300 hover:text-white">Docs</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Whitepaper</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Discord</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">X</a>
          </nav>

          <div className="ml-auto">
            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-pink-500 text-black font-medium shadow-lg">Connect Wallet</button>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="w-full border-t border-gray-900 py-6 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">© {new Date().getFullYear()} Veil Hub</div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-300 hover:text-white">Docs</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Whitepaper</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Discord</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">X</a>
            </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          )}
        </nav>

        {/* Main Content */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>

        {/* Toast Container */}
        <div className="fixed bottom-4 right-4 z-50 space-y-2" />
        </Providers>
=======
          </div>
        </footer>
>>>>>>> Stashed changes
=======
          </div>
        </footer>
>>>>>>> Stashed changes
      </body>
    </html>
  )
}
