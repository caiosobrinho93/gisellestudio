'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scissors, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#servicos', label: 'Serviços' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#sobre', label: 'Sobre' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-bg-primary/80 backdrop-blur-2xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-pink-400 flex items-center justify-center shadow-lg shadow-accent-primary/30">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-accent-primary/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="text-xl font-bold text-text-primary tracking-wider">BELLEZA</span>
            <p className="text-[10px] text-accent-primary tracking-[0.3em] uppercase">Premium</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block">
            <Button size="sm" variant="secondary">
              Área do Cliente
            </Button>
          </Link>
          <Link href="/dashboard" className="hidden sm:block">
            <Button size="sm" variant="ghost">
              Painel
            </Button>
          </Link>
          <Link href="/agendar" className="hidden sm:block">
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-text-secondary hover:text-accent-primary transition-colors text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/agendar" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full mt-4">Agendar Agora</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}