'use client'

import { Github, Twitter, MessageCircle, FileText, ExternalLink } from 'lucide-react'

export function Footer() {
  const links = {
    protocol: [
      { name: 'Documentation', href: '#', icon: FileText },
      { name: 'Whitepaper', href: '#', icon: FileText },
      { name: 'Audits', href: '#', icon: FileText },
      { name: 'Bug Bounty', href: '#', icon: ExternalLink }
    ],
    community: [
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Discord', href: '#', icon: MessageCircle },
      { name: 'GitHub', href: '#', icon: Github },
      { name: 'Governance', href: '#', icon: ExternalLink }
    ],
    resources: [
      { name: 'Universe B Guide', href: '#' },
      { name: 'Immortal Path', href: '#' },
      { name: 'Whale Mode', href: '#' },
      { name: 'LP VACUUM', href: '#' }
    ]
  }

  return (
    <footer className="border-t border-cyber-border bg-cyber-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 animate-pulse-slow" />
              <span className="text-xl font-bold neon-text text-cyber-accent">VEIL HUB</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The Final DeFi Organism. Zero liquidations, perpetual yield, and unstoppable money legos.
            </p>
            <div className="text-xs text-gray-500">
              Built on SupraEVM • Audited by Trail of Bits
            </div>
          </div>

          {/* Protocol Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Protocol</h3>
            <ul className="space-y-3">
              {links.protocol.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyber-accent transition-colors text-sm"
                  >
                    <link.icon size={14} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {links.community.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyber-accent transition-colors text-sm"
                  >
                    <link.icon size={14} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-cyber-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cyber-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Veil Hub. Built in public. Immortal by design.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyber-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyber-accent transition-colors">Terms of Service</a>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}