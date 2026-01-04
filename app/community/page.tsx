'use client'

import React from 'react'
import Link from 'next/link'
import { GradientCard, AnimatedBadge } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

export default function CommunityPage() {
  const channels = [
    { name: 'Discord', members: '12.5K', icon: '💬', href: 'https://discord.gg/veilhub', color: '#5865F2' },
    { name: 'Twitter', followers: '45K', icon: '𝕏', href: 'https://twitter.com/VeilHub', color: '#000000' },
    { name: 'Telegram', members: '8.2K', icon: '✈️', href: 'https://t.me/veilhub', color: '#0088cc' },
    { name: 'GitHub', stars: '2.3K', icon: '🐙', href: 'https://github.com/Thabiiey411beta/veil-hub-v2', color: '#333333' },
  ]

  const contributors = [
    { name: 'Core Team', count: 12, role: 'Development' },
    { name: 'Community', count: 156, role: 'Contributions' },
    { name: 'Auditors', count: 8, role: 'Security' },
    { name: 'Ambassadors', count: 45, role: 'Outreach' },
  ]

  const events = [
    { title: 'AMA Session', date: 'Feb 15', time: '3 PM UTC', icon: '🎤' },
    { title: 'Governance Vote', date: 'Feb 18', time: '12 PM UTC', icon: '🗳️' },
    { title: 'Community Call', date: 'Feb 22', time: '2 PM UTC', icon: '📞' },
    { title: 'Hackathon', date: 'Mar 1-15', time: 'Ongoing', icon: '💻' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Community</h1>
          <p className="text-[#B0B0B0]">Join 70K+ members building the future of DeFi</p>
        </div>

        {/* Social Channels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {channels.map((channel, i) => (
            <a
              key={i}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <GradientCard>
                <div className="text-4xl mb-3">{channel.icon}</div>
                <h3 className="font-bold mb-1">{channel.name}</h3>
                <div className="text-2xl font-bold text-[#FFD700] group-hover:text-[#FFA500] transition-colors">
                  {channel.members || channel.followers || channel.stars}
                </div>
                <div className="text-xs text-[#B0B0B0] mt-2">
                  {channel.members ? 'Members' : channel.followers ? 'Followers' : 'Stars'}
                </div>
              </GradientCard>
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {contributors.map((contrib, i) => (
            <GradientCard key={i}>
              <div className="text-3xl font-bold text-[#FFD700]">{contrib.count}</div>
              <div className="text-sm font-bold mt-1">{contrib.name}</div>
              <div className="text-xs text-[#B0B0B0]">{contrib.role}</div>
            </GradientCard>
          ))}
        </div>

        {/* Upcoming Events */}
        <GradientCard className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📅 Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event, i) => (
              <div key={i} className="p-4 bg-[#0A0A0A] border border-[#FFD700]/10 rounded-lg hover:border-[#FFD700]/50 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl mb-2">{event.icon}</div>
                    <h3 className="font-bold text-[#E0E0E0]">{event.title}</h3>
                    <div className="text-sm text-[#B0B0B0] mt-2">
                      {event.date} • {event.time}
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] rounded text-xs font-bold hover:bg-[#FFD700]/30 transition-all">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* Engagement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">🎯 Get Involved</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700] rounded-lg hover:bg-[#FFD700]/30 transition-all text-sm font-bold">
                Become Ambassador
              </button>
              <button className="w-full px-4 py-2 bg-[#8b5cf6]/20 border border-[#8b5cf6] text-[#8b5cf6] rounded-lg hover:bg-[#8b5cf6]/30 transition-all text-sm font-bold">
                Submit Proposal
              </button>
              <button className="w-full px-4 py-2 bg-[#10b981]/20 border border-[#10b981] text-[#10b981] rounded-lg hover:bg-[#10b981]/30 transition-all text-sm font-bold">
                Contribute Code
              </button>
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4">🏆 Rewards</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Ambassador Bonus</span>
                <span className="text-[#FFD700] font-bold">5% APY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Contributor Rewards</span>
                <span className="text-[#FFD700] font-bold">Variable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Bug Bounty</span>
                <span className="text-[#FFD700] font-bold">Up to $50K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B0B0B0]">Referral Bonus</span>
                <span className="text-[#FFD700] font-bold">10% Fee Share</span>
              </div>
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4">📊 Leaderboard</h3>
            <div className="space-y-2 text-sm">
              {[
                { rank: '1', name: 'VeilMaster', points: '12,500' },
                { rank: '2', name: 'DeFiGuru', points: '11,200' },
                { rank: '3', name: 'CryptoNinja', points: '10,800' },
                { rank: '4', name: 'YieldHunter', points: '9,500' },
              ].map((user, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[#B0B0B0]">#{user.rank} {user.name}</span>
                  <span className="text-[#FFD700] font-bold">{user.points}</span>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* Guidelines */}
        <GradientCard className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📋 Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Be Respectful', desc: 'Treat all members with courtesy' },
              { title: 'No Spam', desc: 'Keep discussions relevant and on-topic' },
              { title: 'Share Knowledge', desc: 'Help others learn and grow' },
              { title: 'Report Issues', desc: 'Use proper channels for concerns' },
            ].map((guideline, i) => (
              <div key={i} className="p-3 bg-[#0A0A0A] border border-[#FFD700]/10 rounded-lg">
                <h4 className="font-bold text-[#FFD700] mb-1">{guideline.title}</h4>
                <p className="text-xs text-[#B0B0B0]">{guideline.desc}</p>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="community" />
      </div>
    </div>
  )
}
