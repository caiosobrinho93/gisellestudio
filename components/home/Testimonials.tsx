'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'

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
  {
    name: 'Juliana Mendes',
    text: 'Extensão de cílios ficou maravilhosa. Funcionárias muito atenciosas.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-24 md:scroll-mt-32 py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent-primary/20 rounded-full text-sm font-medium text-accent-primary mb-4"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-text-primary"
          >
            O que dizem <span className="text-accent-primary">nossas clientes</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <Quote className="w-8 h-8 text-accent-primary mb-4" />
                <p className="text-text-secondary mb-6">{t.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-primary">{t.name}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}