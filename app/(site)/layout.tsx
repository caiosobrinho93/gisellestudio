import '../globals.css'
import type { Metadata } from 'next'
import { GradientBackground } from '@/components/animate-ui/GradientBackground'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Belleza Premium',
  description: 'Salão de beleza premium com tratamentos exclusivos',
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <GradientBackground>
          <Navbar />
          {children}
          <Footer />
        </GradientBackground>
      </body>
    </html>
  )
}