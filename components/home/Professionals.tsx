'use client'

import { motion } from 'framer-motion'
import { Sparkles, Award, Users, Star, ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

const stats = [
  { value: '2.500+', label: 'Satisfeitas', color: 'text-accent-primary' },
  { value: '8+', label: 'Anos', color: 'text-pink-400' },
  { value: '15+', label: 'Serviços', color: 'text-accent-primary' },
  { value: '4.9', label: 'Nota', color: 'text-yellow-400' },
]

const testimonials = [
  {
    name: 'Ana Paula',
    text: 'Sempre venho aqui porque me sinto em casa. As meninas são tão atenciosas...',
    rating: 5,
  },
  {
    name: 'Camila Rodrigues',
    text: 'A sobrancelha ficou exatamente como eu queria. Recomendo!',
    rating: 5,
  },
  {
    name: 'Fernanda Silva',
    text: 'A massagem é um sonho. Vou toda semana agora.',
    rating: 5,
  },
]

export function Professionals() {
  return (
    <section id="sobre" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 via-bg-primary to-bg-secondary/30" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Quem somos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Um espaço feito para <span className="text-accent-primary">mulheres</span>
            </h2>
            <p className="text-text-secondary mb-6 md:mb-8 max-w-xl">
              Aqui é tudo sobre você. Nossa equipe é especializada em fazer você se sentir bem.
            </p>
            
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent-primary">
                <Image
                  src="/gisellestudio/images/giselle-02.png"
                  alt="Giselle Soares"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-text-primary">Giselle Soares</p>
                <p className="text-sm text-text-secondary">Fundadora</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <p className={`text-xl md:text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-xs md:text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-text-secondary text-sm font-medium">
            O que dizem nossas clientes
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <Quote className="w-6 md:w-8 h-6 md:h-8 text-accent-primary mb-3 md:mb-4" />
              <p className="text-text-secondary text-sm md:text-base mb-4 md:mb-6">{t.text}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-text-primary text-sm md:text-base">{t.name}</p>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3 md:w-4 h-3 md:h-4 fill-yellow-400 text-yellow-400" />
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
            <Button size="lg" className="px-6 md:px-8">
              Quero me cuidar
              <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}