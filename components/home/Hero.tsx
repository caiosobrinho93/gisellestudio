'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Sparkles, Award, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const stats = [
  { icon: Users, value: '2.500+', label: 'Clientes' },
  { icon: Award, value: '8+', label: 'Anos' },
  { icon: Star, value: '4.9', label: 'Nota' },
]

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary pointer-events-none" />
      
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-primary/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-6"
            >
              <Sparkles className="w-3 h-3 text-accent-primary" />
              <span className="text-xs md:text-sm text-text-secondary">Seu refúgio de beleza</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-[1.1] mb-4 md:mb-6"
            >
              Cuidar de você é{' '}
              <span className="relative">
                <span className="relative z-10 text-accent-primary">nosso</span>
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-accent-primary/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M2 8 Q 50 2, 100 8 T 198 8" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              <br />
              prazer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-lg text-text-secondary max-w-lg mb-6 md:mb-8"
            >
              Um espaço pensado para você relaxar, se cuidar e sair ainda mais bonita.
              Tratamentos personalizados com atenção aos detalhes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12"
            >
              <Link href="/agendar">
                <Button size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg">
                  Agendar
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#servicos">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:text-lg">
                  Ver tratamentos
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 md:gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent-primary/10 mb-1 md:mb-2 mx-auto">
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-accent-primary" />
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs md:text-sm text-text-tertiary">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 via-pink-500/20 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 bg-bg-card/50 backdrop-blur-sm">
                <Image
                  src="/gisellestudio/images/giselle-01.png"
                  alt="Giselle Soares - Dono(a) do salão"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-8 left-6 right-6 p-6 rounded-2xl bg-bg-primary/80 backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Serviço Premium</p>
                      <p className="text-sm text-text-secondary">Extensão de Cílios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-primary text-accent-primary" />
                    ))}
                    <span className="text-sm text-text-secondary ml-2">(4.9)</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-8 top-1/4 p-4 rounded-2xl bg-bg-card/80 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Aberto</p>
                    <p className="text-sm text-text-secondary">Seg-Sáb: 08h-20h</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  )
}