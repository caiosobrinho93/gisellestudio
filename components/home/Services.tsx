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
    description: 'Cuidados completos para suas mãos, com atenção especial às cutículas e unhas.',
    benefits: ['Limpeza das unhas', 'Cutícula tratada', 'Esmalte simples', 'Hidratação das mãos'],
    process: ['Higienização', 'Cutícula', 'Modelagem', 'Esmalte', 'Hidratação']
  },
  { 
    id: '2', 
    name: 'Manicure + Esmaltação', 
    price: 45, 
    duration: 45,
    description: 'Manicure completa com esmaltação profissional e duração prolongada.',
    benefits: ['Tudo da manicure simples', 'Esmalte gel', 'Maior durabilidade', 'Brilho intenso'],
    process: ['Higienização', 'Cutícula', 'Modelagem', 'Esmalte Profissional', 'Secagem UV', 'Hidratação']
  },
  { 
    id: '3', 
    name: 'Pedicure SPA', 
    price: 65, 
    duration: 60,
    description: 'Tratamento relaxante e rejuvenescente para os pés com produtos premium.',
    benefits: ['Esfoliação profunda', 'Hidratação intensiva', 'Massagem relaxante', 'Esmalte premium'],
    process: ['Banho de pés', 'Esfoliação', 'Remoção de calos', 'Hidratação', 'Massagem', 'Esmalte']
  },
  { 
    id: '4', 
    name: 'Extensão de Cílios', 
    price: 150, 
    duration: 90,
    description: 'Olhares mais marcantes e naturais com técnica profissional.',
    benefits: ['Volume natural', 'Cílios mais longos', 'Sem necessidade de rímel', 'Duração de 30 dias'],
    process: ['Consulta inicial', 'Preparação dos cílios', 'Aplicação fio a fio', 'Secagem', 'Recomendações']
  },
  { 
    id: '5', 
    name: 'Design de Sobrancelha', 
    price: 30, 
    duration: 20,
    description: 'Designer personalizado para valorizar seu rosto.',
    benefits: ['Formato ideal para seu rosto', 'Simetria perfeita', 'Produto henna natural', 'Duração de 15 dias'],
    process: ['Avaliação do rosto', 'Desenho inicial', 'Ajuste', 'Aplicação de henna', 'Finalização']
  },
  { 
    id: '6', 
    name: 'Massagem Relaxante', 
    price: 80, 
    duration: 60,
    description: 'Massagem profissional para relaxamento completo do corpo.',
    benefits: ['Alívio do estresse', 'Melhora da circulação', 'Relaxamento muscular', 'Sensação de bem-estar'],
    process: ['Aromaterapia', 'Massagem corporal', 'Foco em áreas tensionadas', 'Hidratação corporal']
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
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Tratamentos <span className="text-accent-primary">Exclusivos</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Serviços premium desenvolvidos para destacar sua beleza natural
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