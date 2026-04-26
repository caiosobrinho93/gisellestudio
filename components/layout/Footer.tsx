'use client'

import Link from 'next/link'
import { Scissors, Instagram, Facebook, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-bg-secondary border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-pink-400 flex items-center justify-center shadow-lg shadow-accent-primary/30">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-text-primary tracking-wider">BELLEZA</span>
                <p className="text-[10px] text-accent-primary tracking-[0.3em] uppercase">Premium</p>
              </div>
            </Link>
            <p className="text-text-secondary max-w-md mb-6">
              Um refúgio de beleza e bem-estar. Venha nos fazer uma visita e se cuidar.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent-primary/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-text-secondary hover:text-accent-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent-primary/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5 text-text-secondary hover:text-accent-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <span className="text-sm">Rua Example, 123 - Centro</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Phone className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <span className="text-sm">contato@bellezapremium.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Horário</h4>
            <div className="space-y-2 text-text-secondary">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <span className="text-sm">Seg - Sex: 08h às 20h</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <span className="text-sm">Sáb: 08h às 18h</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                <span className="text-sm text-text-tertiary">Dom: Fechado</span>
              </div>
            </div>
            
            <Link href="/agendar">
              <Button className="w-full mt-6">
                Quero me cuidar
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-tertiary text-sm">
            © {currentYear} Belleza Premium. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacidade" className="text-text-tertiary hover:text-accent-primary transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="text-text-tertiary hover:text-accent-primary transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}