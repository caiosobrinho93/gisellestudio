'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { NotificationProvider } from '@/components/ui/NotificationContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      <div className="min-h-[100dvh] bg-bg-primary">
        <Sidebar />
        <main className="md:ml-[280px] transition-all duration-300 pt-16 md:pt-20 px-2.5 pb-8">
          {children}
        </main>
      </div>
    </NotificationProvider>
  )
}