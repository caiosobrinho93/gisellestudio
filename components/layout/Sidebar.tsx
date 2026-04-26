'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false)
    }
  }, [isMobile])

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-bg-card rounded-lg border border-border-light"
        style={{ display: isMobile ? 'block' : 'none' }}
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
          "max-md:w-[280px]",
          isMobile && !mobileOpen && "max-md:translate-x-[-100%]"
        )}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="h-18 flex items-center justify-between px-4 py-3 border-b border-border-light">
          <Link href="/" className="font-display font-bold text-lg text-text-primary overflow-hidden whitespace-nowrap">
            <motion.span
              animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
              className="block"
            >
              Belleza
            </motion.span>
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
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                  collapsed && 'justify-center px-3'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                  className="text-sm font-medium overflow-hidden whitespace-nowrap block"
                >
                  {item.label}
                </motion.span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border-light">
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors',
              collapsed && 'justify-center px-3'
            )}
          >
            <LogOut className="w-5 h-5" />
            <motion.span
              animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
              className="text-sm font-medium overflow-hidden whitespace-nowrap block"
            >
              Sair
            </motion.span>
          </Link>
        </div>
      </motion.aside>

      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}