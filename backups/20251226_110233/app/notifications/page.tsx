import dynamic from 'next/dynamic';

const NotificationCenter = dynamic(() => import('@/components/NotificationCenter'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
      <div className="text-white">Loading Notifications...</div>
    </div>
  )
});

export default function NotificationsPage() {
  return <NotificationCenter />;
}
