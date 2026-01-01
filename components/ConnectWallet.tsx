'use client'

import { useSupraWallet } from '@/hooks/useSupraWallet'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ConnectWallet() {
  const { account, isConnected, isInstalled, connect, disconnect } = useSupraWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    if (!isInstalled) {
      toast.error('Please install StarKey Wallet')
      window.open('https://starkey.app', '_blank')
      return
    }

    try {
      setIsLoading(true)
      await connect()
      toast.success('Wallet connected successfully')
    } catch (error) {
      console.error('Connection error:', error)
      toast.error('Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      toast.success('Wallet disconnected')
    } catch (error) {
      console.error('Disconnect error:', error)
      toast.error('Failed to disconnect wallet')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {isConnected && account ? (
        <button
          onClick={handleDisconnect}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl font-bold text-white transition-all duration-300 shadow-lg"
        >
          {account.slice(0, 6)}...{account.slice(-4)}
        </button>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Connecting...' : 'Connect StarKey Wallet'}
        </button>
      )}
    </div>
  )
}