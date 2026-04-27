'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Ana Paula',
    text: 'A Giselle é maravilhosa! O atendimento é super exclusivo e impecável...',
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
  {
    name: 'Juliana Costa',
    text: 'A Giselle é incrível! Agora só confio nela as minhas unhas.',
    rating: 5,
  },
  {
    name: 'Patrícia Lima',
    text: 'Saio de lá me sentindo renovada. Atendimento premium de verdade!',
    rating: 5,
  },
  {
    name: 'Carla M.',
    text: 'Atendimento impecável. Recomendo para todas as minhas amigas.',
    rating: 5,
  },
]

export function AboutGiselle() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const prevTestimonial = () => {
    setIsAutoPlaying(false)
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextTestimonial = () => {
    setIsAutoPlaying(false)
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="sobre" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 via-bg-primary to-bg-secondary/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Quem somos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 md:mb-6">
            Giselle <span className="text-accent-primary">Soares</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-transparent opacity-50 transition-opacity group-hover:opacity-70"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-accent-primary/50 shadow-[0_0_50px_rgba(238,175,210,0.5)] mb-8 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/gisellestudio/images/giselle-02.png"
                alt="Giselle Soares"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/20 to-transparent" />
            </div>
            <div className="text-center max-w-md relative z-10">
              <h3 className="text-3xl md:text-4xl text-text-primary font-display font-bold mb-2 tracking-tight">Giselle Soares</h3>
              <p className="text-accent-primary font-medium mb-4 tracking-widest uppercase text-xs">Especialista em Estética Avançada</p>
              <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                Unindo técnica refinada e um olhar artístico, Giselle dedica sua carreira a proporcionar experiências 
                que transcendem o cuidado estético. Cada detalhe no Studio é pensado para que você se sinta 
                única, valorizada e em sua melhor versão.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-6 text-center">
                O que dizem nossas clientes
              </h3>
              
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <Quote className="w-10 h-10 text-accent-primary mx-auto mb-4" />
                    <p className="text-lg md:text-xl text-text-secondary mb-6 italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="font-semibold text-text-primary">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 p-2 rounded-full bg-bg-card border border-white/10 hover:bg-accent-primary/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 p-2 rounded-full bg-bg-card border border-white/10 hover:bg-accent-primary/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentTestimonial(idx); setIsAutoPlaying(false) }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentTestimonial 
                        ? 'bg-accent-primary w-6' 
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
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