import '../globals.css'
import type { Metadata } from 'next'
import { Sidebar } from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: 'Dashboard - Belleza Premium',
  description: 'Painel de administração',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg-primary">
        <Sidebar />
        <main className="md:ml-[280px] p-4 md:p-8 pt-16 md:pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}