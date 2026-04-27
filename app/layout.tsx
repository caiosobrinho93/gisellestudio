import './globals.css'
import type { Metadata } from 'next'
import { AppDataProvider } from '@/components/providers/AppDataProvider'

export const metadata: Metadata = {
  title: 'Belleza Premium',
  description: 'Salão de beleza premium com tratamentos exclusivos',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AppDataProvider>
          {children}
        </AppDataProvider>
      </body>
    </html>
  )
}