'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Hand, 
  Footprints,
  Eye, 
  Sparkles, 
  Waves, 
  Zap,
  ArrowRight,
  Check,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ServiceDetailModal } from '@/components/ui/ServiceDetailModal'
import { useServicos } from '@/hooks/useSupabase'
import Link from 'next/link'

const iconMap: Record<string, any> = {
  Hand,
  Footprints,
  Eye,
  Sparkles,
  Waves,
  Zap,
}

const defaultBenefits = ['Benefício 1', 'Benefício 2', 'Benefício 3']
const defaultProcess = ['Passo 1', 'Passo 2', 'Passo 3']

export function Services() {
  const { servicos, loading } = useServicos()
  const [selectedService, setSelectedService] = useState<any>(null)

  return (
    <section id="servicos" className="scroll-mt-24 md:scroll-mt-32 py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
            O que fazemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Serviços <span className="text-accent-primary">especiais</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Cada tratamento é feito com atenção e carinho. Veja o que temos para você.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((service, i) => {
              const Icon = iconMap[service.categoria] || Sparkles
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-bg-secondary hover:bg-accent-primary/20 transition-colors z-10"
                    >
                      <Info className="w-5 h-5 text-text-secondary" />
                    </button>
                    
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-pink-400 flex items-center justify-center mb-4 shadow-lg shadow-accent-primary/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-text-primary">{service.nome}</h3>
                      <span className="text-accent-primary font-semibold">R$ {service.preco}</span>
                    </div>
                    
                    <p className="text-text-secondary mb-4">{service.descricao}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {(service.benefits || defaultBenefits).slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-text-tertiary">
                          <Check className="w-4 h-4 text-accent-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/agendar">
                      <Button variant="secondary" className="w-full group-hover:bg-accent-primary group-hover:text-white transition-colors">
                        Agendar
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/agendar">
            <Button size="lg" className="px-8">
              Ver Todos os Serviços
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {selectedService && (
        <ServiceDetailModal 
          service={{
            ...selectedService,
            benefits: selectedService.benefits || defaultBenefits,
            process: selectedService.process || defaultProcess
          }} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  )
}