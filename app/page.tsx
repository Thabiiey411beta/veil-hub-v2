'use client'

import { Header } from '../Header'
import { Hero } from '../Hero'
import { UniverseCards } from '../UniverseCards'
import { Stats } from '../Stats'
import { Features } from '../Features'
import { Footer } from '../Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="grid-bg min-h-screen">
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
