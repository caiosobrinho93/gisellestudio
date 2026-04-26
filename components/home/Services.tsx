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
    <section id="servicos" className="py-24 relative">
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
                  className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-accent-primary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {service.imagem ? (
                    <div className="w-full h-48 relative overflow-hidden flex-shrink-0">
                      <img 
                        src={service.imagem} 
                        alt={service.nome}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-90" />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-12 h-12 text-accent-primary/20" />
                    </div>
                  )}

                  <div className="p-6 relative z-10 flex-1 flex flex-col">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 backdrop-blur-md hover:bg-accent-primary transition-colors z-20 text-white"
                      title="Detalhes do Serviço"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center justify-between mb-1 pr-10">
                      <h3 className="text-xl font-bold text-text-primary">{service.nome}</h3>
                    </div>
                    <span className="text-accent-primary font-bold text-xl mb-3 block">R$ {service.preco}</span>
                    
                    <p className="text-text-secondary mb-4 flex-1">{service.descricao}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {(service.benefits || defaultBenefits).slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-text-tertiary">
                          <Check className="w-4 h-4 text-accent-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/agendar" className="mt-auto">
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