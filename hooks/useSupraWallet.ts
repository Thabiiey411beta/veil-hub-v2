import { useState, useEffect } from 'react';
import { SupraAccount, HexString } from 'supra-l1-sdk';

declare global {
  interface Window {
    starKeyWallet?: any;
    starKey?: any;
  }
}

export function useSupraWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkWallet = () => {
      const installed = !!(window?.starKeyWallet || window?.starKey);
      setIsInstalled(installed);
    };

    checkWallet();
    
    if (window?.starKeyWallet) {
      window.starKeyWallet.onMessage((message: any) => {
        if (message.type === 'starkey-wallet-connected') {
          setAccount(message.address);
          setIsConnected(true);
        } else if (message.type === 'starkey-wallet-disconnected') {
          setAccount(null);
          setIsConnected(false);
        }
      });
    }
  }, []);

  const connect = async () => {
    if (!window?.starKeyWallet) {
      alert('Please install StarKey Wallet');
      return;
    }

    try {
      const result = await window.starKeyWallet.connectWallet({
        multiple: false,
        network: 'SUPRA',
      });
      
      if (result?.address) {
        setAccount(result.address);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
  };

  const sendTransaction = async (tx: any) => {
    if (!window?.starKeyWallet || !account) {
      throw new Error('Wallet not connected');
    }

    return await window.starKeyWallet.sendTokenAmount(tx);
  };

  return {
    account,
    isConnected,
    isInstalled,
    connect,
    disconnect,
    sendTransaction,
  };
}
