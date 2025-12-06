'use client';

import { useSupraWallet } from '@/hooks/useSupraWallet';
import toast from 'react-hot-toast';

export default function ConnectWallet() {
  const { account, isConnected, isInstalled, connect, disconnect } = useSupraWallet();

  const handleConnect = async () => {
    if (!isInstalled) {
      toast.error('Please install StarKey Wallet');
      window.open('https://starkey.app', '_blank');
      return;
    }
    await connect();
  };

  return (
    <div className="flex flex-col gap-3">
      {isConnected ? (
        <div className="flex items-center gap-3">
          <button
            onClick={disconnect}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-white hover:scale-105 transition"
          >
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-2xl"
        >
          Connect StarKey Wallet
        </button>
      )}
    </div>
  );
}