'use client';

import { ConnectKitButton } from "connectkit";
import { useAccount, useSwitchChain } from "wagmi";
import toast from "react-hot-toast";

export default function ConnectWallet() {
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleSwitch = () => {
    switchChain({ chainId: 9999 }); // Supra L1 testnet
    toast.success('Switching to Supra L1...');
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress }) => (
        <div className="flex flex-col gap-3">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <button
                onClick={show}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:scale-105 transition"
              >
                {truncatedAddress}
              </button>
              {chain?.id !== 999 && chain?.id !== 9999 && (
                <button
                  onClick={handleSwitch}
                  className="px-4 py-3 bg-orange-600 rounded-xl text-sm font-medium hover:bg-orange-700"
                >
                  Switch to Supra
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={show}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-2xl"
            >
              Connect StarKey Wallet
            </button>
          )}
        </div>
      )}
    </ConnectKitButton.Custom>
  );
}