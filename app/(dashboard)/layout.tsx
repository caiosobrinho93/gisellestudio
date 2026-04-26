'use client'

import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <main className="md:ml-[280px] p-4 md:p-8 pt-16 md:pt-20">
        {children}
      </main>
    </div>
  )
}