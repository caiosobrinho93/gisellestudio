'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles, MessageCircle, Calendar, CreditCard, Car, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'Como funciona o agendamento?',
    answer: 'Você pode agendar diretamente pelo nosso site, selecionando o serviço, profissional e horário disponível. Ou pode entrar em contato pelo WhatsApp.',
    icon: Calendar,
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Aceitamos dinheiro, cartão de débito, cartão de crédito e PIX. Parcelamento disponível em até 6x sem juros.',
    icon: CreditCard,
  },
  {
    question: 'Qual o prazo para extensão de cílios?',
    answer: 'O procedimento completo leva em média 90 minutos para extensão clássica e 120 minutos para volume russo.',
    icon: Sparkles,
  },
  {
    question: 'Os serviços incluem produtos?',
    answer: 'Sim, todos os serviços incluem produtos premium específicos para cada tipo de tratamento.',
    icon: MessageCircle,
  },
  {
    question: 'Possuem estacionamento?',
    answer: 'Sim, temos vagas exclusivas para clientes em frente ao salão.',
    icon: Car,
  },
  {
    question: 'Qual o horário de funcionamento?',
    answer: 'Funcionamos de segunda a sexta das 08h às 20h, e aos sábados das 08h às 18h. Domingos fechados.',
    icon: Clock,
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Perguntas <span className="text-accent-primary">Frequentes</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-5 h-5 text-accent-primary" />
                  </div>
                  <span className="font-medium text-text-primary">{faq.question}</span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-text-tertiary transition-transform duration-300',
                    openIndex === i && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 pl-20 text-text-secondary">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}