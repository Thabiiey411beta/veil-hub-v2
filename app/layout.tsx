import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Veil Hub - The Final DeFi Organism',
  description: 'Zero-liquidation borrowing, perpetual USDC dividends, and privacy-first DeFi on Supra L1',
  keywords: ['DeFi', 'Supra L1', 'veVEIL', 'Borrowing', 'Yield', 'Vaults', 'Trading'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950`}>
        {children}
      </body>
    </html>
  );
}
