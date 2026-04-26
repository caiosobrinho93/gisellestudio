'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Scissors,
  UserCog,
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Image,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/clientes', icon: Users, label: 'Clientes' },
  { href: '/dashboard/agendamentos', icon: Calendar, label: 'Agendamentos' },
  { href: '/dashboard/servicos', icon: Scissors, label: 'Serviços' },
  { href: '/dashboard/funcionarios', icon: UserCog, label: 'Profissionais' },
  { href: '/dashboard/galeria', icon: Image, label: 'Galeria' },
  { href: '/dashboard/financeiro', icon: DollarSign, label: 'Financeiro' },
  { href: '/dashboard/configuracoes', icon: Settings, label: 'Configurações' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile && mounted) {
      setMobileOpen(false)
    }
  }, [isMobile, mounted])

  if (!mounted) return null

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-bg-card rounded-lg border border-border-light md:hidden"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 280,
          x: isMobile ? (mobileOpen ? 0 : -320) : 0
        }}
        className={cn(
          "fixed left-0 top-0 bottom-0 bg-bg-card border-r border-border-light z-40 flex flex-col",
          "w-[280px] md:w-auto",
          isMobile && !mobileOpen && "hidden"
        )}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="h-18 flex items-center justify-between px-4 py-3 border-b border-border-light">
          <Link href="/" className="font-display font-bold text-lg text-text-primary">
            <span className={cn(collapsed && "hidden")}>Belleza</span>
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-bg-secondary transition-colors hidden md:block"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                  collapsed && 'justify-center px-0'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border-light">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-xl text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors',
              collapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">Sair</span>}
          </Link>
        </div>
      </motion.aside>

      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}