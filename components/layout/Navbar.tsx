'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scissors } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useConfiguracoes } from '@/hooks/useSupabase'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { config, loading } = useConfiguracoes()

  const isOpen = config.status_loja === 'ABERTO'

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  const navLinks = [
    { href: '#servicos', label: 'Serviços', action: () => scrollTo('servicos') },
    { href: '#galeria', label: 'Galeria', action: () => scrollTo('galeria') },
    { href: '#sobre', label: 'Sobre', action: () => scrollTo('sobre') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/95 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <Link href="/gisellestudio/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-pink-400 flex items-center justify-center shadow-lg shadow-accent-primary/30">
              <Scissors className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold text-text-primary tracking-wider">BELLEZA</span>
            <p className="text-[10px] text-accent-primary tracking-[0.3em] uppercase">Premium</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={link.action}
              className="text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-20 h-8 bg-white/5 animate-pulse rounded-full" />
          ) : (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              isOpen 
                ? 'bg-success/20 text-success' 
                : 'bg-error/20 text-error'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-success' : 'bg-error'} animate-pulse`} />
              {isOpen ? 'ABERTO' : 'FECHADO'}
            </div>
          )}

          <Link href="/gisellestudio/login">
            <Button size="sm" variant="secondary">
              Área do Cliente
            </Button>
          </Link>
          <Link href="/gisellestudio/dashboard">
            <Button size="sm" variant="ghost">
              Painel
            </Button>
          </Link>
          <Link href="/gisellestudio/agendar">
            <Button size="sm" className="px-6">
              Agendar
            </Button>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-secondary/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { link.action(); setIsMobileMenuOpen(false); }}
                  className="block py-3 text-text-secondary hover:text-accent-primary transition-colors text-lg w-full text-left"
                >
                  {link.label}
                </button>
              ))}
              <Link href="/agendar" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full mt-4">Agendar Agora</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}