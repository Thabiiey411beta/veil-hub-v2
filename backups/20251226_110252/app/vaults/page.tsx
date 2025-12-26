import dynamic from 'next/dynamic';

const VaultManager = dynamic(() => import('@/components/VaultManager'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
      <div className="text-white">Loading Vaults...</div>
    </div>
  )
});

export default function VaultsPage() {
  return <VaultManager />;
}
