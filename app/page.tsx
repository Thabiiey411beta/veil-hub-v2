'use client'

import { Header } from '../Header'
import { Hero } from '../Hero'
import { UniverseCards } from '../UniverseCards'
import { Stats } from '../Stats'
import { Features } from '../Features'
import { Footer } from '../Footer'

export default function Home() {
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)'}}>
      <div style={{minHeight: '100vh', color: 'white'}}>
        <Header />
        <main>
          <Hero />
          <Stats />
          <UniverseCards />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  )
}// Build Sat Dec  6 07:06:34 UTC 2025
