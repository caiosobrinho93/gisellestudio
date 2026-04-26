'use client'

import { motion } from 'framer-motion'
import { Sparkles, Award, Users, Star, ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const stats = [
  { value: '2.500+', label: 'Clientes Satisfeitas', color: 'text-accent-primary' },
  { value: '8+', label: 'Anos de Experiência', color: 'text-pink-400' },
  { value: '15+', label: 'Serviços Diferentes', color: 'text-accent-primary' },
  { value: '4.9', label: 'Nota Média', color: 'text-yellow-400' },
]

const testimonials = [
  {
    name: 'Ana Paula',
    text: 'Ambiente incrível, profissionais super capacitadas. Sempre sai daqui me sentindo uma rainha!',
    rating: 5,
  },
  {
    name: 'Camila Rodrigues',
    text: 'Melhor salão que já conheci. O design de sobrancelha ficou perfeito!',
    rating: 5,
  },
  {
    name: 'Fernanda Silva',
    text: 'Serviço de massagem excepcional. Recomendo para todas as minhas amigas.',
    rating: 5,
  },
]

export function Professionals() {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 via-bg-primary to-bg-secondary/30" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Sobre Nós
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Especialistas em <span className="text-accent-primary">Beleza</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Somos um salão de beleza premium dedicado a proporcionar experiências 
            transformadoras. Nossa equipe altamente qualificada utiliza tecnologia de ponta.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center"
            >
              <p className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
              <p className="text-text-secondary text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-text-secondary text-sm font-medium">
            O que dizem nossas clientes
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10"
            >
              <Quote className="w-8 h-8 text-accent-primary mb-4" />
              <p className="text-text-secondary mb-6">{t.text}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-text-primary">{t.name}</p>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/agendar">
            <Button size="lg" className="px-8">
              Agendar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}