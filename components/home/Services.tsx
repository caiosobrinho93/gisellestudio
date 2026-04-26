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
import Link from 'next/link'

const servicesData = [
  { 
    id: '1', 
    name: 'Manicure', 
    price: 35, 
    duration: 30,
    description: 'Suas mãos merecem atenção especial. Cuidação completo com acabamento impecável.',
    benefits: ['Esmalte tradicional', 'Cutícula tratada', 'Hidratação', 'Modelagem perfeita'],
    process: ['Higienização', 'Cutícula', 'Modelagem', 'Esmalte', 'Hidratação']
  },
  { 
    id: '2', 
    name: 'Manicure + Esmaltação', 
    price: 45, 
    duration: 45,
    description: 'O toque final perfeito. Esmalte gel que dura semanas e brilha mais.',
    benefits: ['Esmalte gel', 'Duração prolongada', 'Brilho intenso', 'Sem precisar retocar'],
    process: ['Higienização', 'Cutícula', 'Modelagem', 'Esmalte', 'Secagem UV', 'Hidratação']
  },
  { 
    id: '3', 
    name: 'Pedicure SPA', 
    price: 65, 
    duration: 60,
    description: 'Pés renovada e relaxamento garantido. Você vai sair daqui se sentindo outra pessoa.',
    benefits: ['Esfoliação suave', 'Hidratação intensiva', 'Massagem', 'Esmalte'],
    process: ['Banho de pés', 'Esfoliação', 'Calos', 'Hidratação', 'Massagem', 'Esmalte']
  },
  { 
    id: '4', 
    name: 'Extensão de Cílios', 
    price: 150, 
    duration: 90,
    description: 'Olhar mais bonito, sem esforço. Acorda pronta e lindas todos os dias.',
    benefits: ['Volume natural', 'Acorda pronta', 'Sem rímel', 'Dura até 30 dias'],
    process: ['Consulta', 'Preparação', 'Aplicação', 'Secagem', 'Instruções']
  },
  { 
    id: '5', 
    name: 'Design de Sobrancelha', 
    price: 30, 
    duration: 20,
    description: 'O formato ideal para o seu rosto. Olhar mais definido e、自然.',
    benefits: ['Feito para seu rosto', 'Simetria perfeita', 'Henna natural', 'Dura 15 dias'],
    process: ['Análise facial', 'Desenho', 'Ajuste', 'Henna', 'Finalização']
  },
  { 
    id: '6', 
    name: 'Massagem Relaxante', 
    price: 80, 
    duration: 60,
    description: 'Uma hora só para você. Desconectar do mundo e se cuidar.',
    benefits: ['Alívio tensão', 'Melhora circulação', 'Relaxamento', 'Bem-estar'],
    process: ['Aromaterapia', 'Massagem', 'Áreas tensionadas', 'Hidratação']
  },
]

const iconMap: Record<string, any> = {
  Hand,
  Footprints,
  Eye,
  Sparkles,
  Waves,
  Zap,
}

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null)

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
            Servicios <span className="text-accent-primary">especiais</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Cada tratamento é feito com atenção e carinho. Veja o que temos para você.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.id] || Sparkles
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
                    <h3 className="text-xl font-bold text-text-primary">{service.name}</h3>
                    <span className="text-accent-primary font-semibold">R$ {service.price}</span>
                  </div>
                  
                  <p className="text-text-secondary mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.benefits.slice(0, 3).map((feature, idx) => (
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
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  )
}