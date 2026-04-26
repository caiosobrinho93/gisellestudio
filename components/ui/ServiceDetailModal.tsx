'use client'

import { X, Clock, DollarSign, Check, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ServiceDetailModalProps {
  service: {
    id: string
    name: string
    price: number
    duration: number
    description: string
    benefits: string[]
    process: string[]
  } | null
  onClose: () => void
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  if (!service) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-bg-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-border-light shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-bg-secondary hover:bg-accent-primary/20 transition-colors"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-pink-400 flex items-center justify-center mb-4 shadow-lg shadow-accent-primary/30">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {service.name}
        </h2>

        <p className="text-text-secondary mb-6">
          {service.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-xl">
            <Clock className="w-5 h-5 text-accent-primary" />
            <span className="text-text-primary font-medium">{service.duration} min</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-xl">
            <DollarSign className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-bold">R$ {service.price}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-text-primary font-semibold mb-3">Inclui:</h3>
          <ul className="space-y-2">
            {service.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-text-secondary">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-text-primary font-semibold mb-3">Como funciona:</h3>
          <ol className="space-y-2">
            {service.process.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-text-secondary">
                <span className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            Fechar
          </Button>
          <Link href="/agendar" className="flex-1" onClick={onClose}>
            <Button className="w-full">
              Agendar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}