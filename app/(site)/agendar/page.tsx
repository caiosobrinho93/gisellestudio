'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Check, ChevronLeft, ChevronRight, PartyPopper, Home, Plus, X, Calendar, Clock, Scissors, Sparkles, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsPanel } from '@/components/ui/Tabs'
import { ServiceDetailModal } from '@/components/ui/ServiceDetailModal'
import { useServicos, createAgendamento } from '@/hooks/useSupabase'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const steps = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'data', label: 'Data e Hora' },
  { id: 'dados', label: 'Seus Dados' },
]

function generateTimeSlots(start: string, end: string, interval: number) {
  const slots = []
  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)
  
  let currentHour = startHour
  let currentMin = startMin
  
  while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
    slots.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`)
    currentMin += interval
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60)
      currentMin = currentMin % 60
    }
  }
  
  return slots
}

const timeSlots = generateTimeSlots('08:00', '20:00', 30)

export default function AgendamentoPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const { servicos, loading: loadingServicos } = useServicos()
  
  const [activeTab, setActiveTab] = useState('servicos')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const services = servicos.map(s => ({
    id: s.id,
    name: s.nome,
    price: s.preco,
    duration: s.duracao,
    description: s.descricao,
    imagem: s.imagem,
    benefits: s.beneficios || [],
    process: s.processo || []
  }))

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const getTotalPrice = () => {
    return services.filter(s => selectedServices.includes(s.id)).reduce((sum, s) => sum + s.price, 0)
  }

  const getTotalDuration = () => {
    return services.filter(s => selectedServices.includes(s.id)).reduce((sum, s) => sum + s.duration, 0)
  }

  const getSelectedServicesNames = () => {
    return services.filter(s => selectedServices.includes(s.id)).map(s => s.name).join(', ')
  }

  const isStepCompleted = (stepId: string) => {
    if (stepId === 'servicos') return selectedServices.length > 0
    if (stepId === 'data') return !!selectedDate && !!selectedTime
    if (stepId === 'dados') return clientName && clientPhone
    return false
  }

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === activeTab)

  const canProceed = () => {
    return isStepCompleted(activeTab)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = async () => {
    if (!canProceed()) return
    
    if (activeTab === 'servicos') setActiveTab('data')
    else if (activeTab === 'data') setActiveTab('dados')
    else if (activeTab === 'dados') {
      setIsSubmitting(true)
      const result = await createAgendamento({
        servico_id: selectedServices[0],
        data: selectedDate,
        horario: selectedTime,
        telefone: clientPhone,
        cliente: clientName,
      })
      setIsSubmitting(false)
      
      if (result.success) {
        setShowSuccess(true)
      }
    }
    
    setTimeout(scrollToTop, 100)
  }

  const handleBack = () => {
    if (activeTab === 'data') setActiveTab('servicos')
    else if (activeTab === 'dados') setActiveTab('data')
    setTimeout(scrollToTop, 100)
  }

  const resetForm = () => {
    setShowSuccess(false)
    setActiveTab('servicos')
    setSelectedServices([])
    setSelectedDate('')
    setSelectedTime('')
    setClientName('')
    setClientPhone('')
    setClientEmail('')
    setTimeout(scrollToTop, 100)
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const days = []
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isPast = date < today
    const isSunday = date.getDay() === 0
    days.push({ day: i, disabled: isPast || isSunday })
  }

  if (loadingServicos) {
    return (
      <div className="min-h-[100dvh] bg-bg-primary pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-bg-primary pt-24 pb-12" ref={contentRef}>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => {}}
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-bg-card rounded-3xl p-8 max-w-md w-full border border-border-light shadow-2xl"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-bg-secondary hover:bg-accent-primary/20 transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-primary to-pink-400 flex items-center justify-center shadow-lg shadow-accent-primary/50"
              >
                <PartyPopper className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-text-primary text-center mb-2"
              >
                Agendamento Confirmado!
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-text-secondary text-center mb-6"
              >
                Obrigado pela preferência! Seu agendamento foi realizado com sucesso.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 bg-bg-secondary rounded-2xl mb-6 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-5 h-5 text-accent-primary" />
                  <span className="text-text-primary">{getSelectedServicesNames()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent-primary" />
                  <span className="text-text-primary">{selectedDate} às {selectedTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-accent-primary" />
                  <span className="text-accent-primary font-semibold">R$ {getTotalPrice()}</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link href="/" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    <Home className="w-5 h-5 mr-2" />
                    Início
                  </Button>
                </Link>
                <Button onClick={resetForm} className="flex-1">
                  <Plus className="w-5 h-5 mr-2" />
                  Novo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedServiceDetail && (
          <ServiceDetailModal 
            service={selectedServiceDetail} 
            onClose={() => setSelectedServiceDetail(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
            Agende seu <span className="text-accent-primary">horário</span>
          </h1>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            Selecione o tratamento e o momento perfeito para você.
          </p>
        </motion.div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="servicos" className="mb-6">
            <TabsList className="w-full overflow-x-auto justify-center">
              {steps.map((step, index) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  className={cn(
                    'whitespace-nowrap px-6',
                    isStepCompleted(step.id) && 'text-accent-primary',
                    getCurrentStepIndex() > index && isStepCompleted(step.id) && 'text-success'
                  )}
                >
                  {step.label}
                  {isStepCompleted(step.id) && (
                    <Check className="w-3 h-3 ml-1 inline" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <Card className="mt-6 border-white/5 bg-bg-card/40 backdrop-blur-sm">
              <TabsPanel value="servicos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="relative group h-full flex flex-col">
                      <button
                        onClick={() => toggleService(service.id)}
                        className={cn(
                          'w-full h-full flex flex-col rounded-2xl border text-left transition-all overflow-hidden relative',
                          selectedServices.includes(service.id)
                            ? 'border-accent-primary ring-1 ring-accent-primary shadow-[0_0_20px_rgba(255,51,102,0.15)] bg-bg-secondary'
                            : 'border-border-light bg-bg-card hover:border-accent-primary/50'
                        )}
                      >
                        {service.imagem ? (
                          <div className="w-full h-40 sm:h-48 relative overflow-hidden flex-shrink-0">
                            <img 
                              src={service.imagem} 
                              alt={service.name}
                              className={cn(
                                "w-full h-full object-cover transition-transform duration-700",
                                selectedServices.includes(service.id) ? "scale-105" : "group-hover:scale-105"
                              )}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-90" />
                          </div>
                        ) : (
                          <div className="w-full h-40 sm:h-48 bg-bg-secondary flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-8 h-8 text-accent-primary/20" />
                          </div>
                        )}

                        <div className={cn(
                          "flex-1 p-5 sm:p-6 flex flex-col justify-between z-10",
                          service.imagem ? "-mt-16" : ""
                        )}>
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-bold text-text-primary text-lg sm:text-xl drop-shadow-md">{service.name}</p>
                              {selectedServices.includes(service.id) && (
                                <div className="w-6 h-6 rounded-full bg-accent-primary flex items-center justify-center flex-shrink-0">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-text-secondary line-clamp-2 mb-4">{service.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                            <div className="flex items-center gap-1.5 text-text-tertiary">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">{service.duration} min</span>
                            </div>
                            <p className="font-bold text-accent-primary text-lg">R$ {service.price}</p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedServiceDetail(service)
                        }}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-accent-primary transition-colors z-20 text-white"
                        title="Detalhes do Serviço"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {selectedServices.length > 0 && (
                    <div className="col-span-full p-4 sm:p-5 bg-accent-primary/10 border border-accent-primary/20 rounded-2xl mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">Total Selecionado:</span>
                        <div className="text-right">
                          <span className="font-bold text-accent-primary text-xl">R$ {getTotalPrice()}</span>
                          <span className="text-text-secondary text-sm ml-2">({getTotalDuration()} min)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsPanel>

              <TabsPanel value="data">
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-xl bg-bg-secondary hover:bg-accent-primary/20 hover:text-accent-primary transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="font-bold text-lg text-text-primary tracking-wide">
                        {months[currentMonth]} {currentYear}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-xl bg-bg-secondary hover:bg-accent-primary/20 hover:text-accent-primary transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
                        <div key={dia} className="text-center text-xs font-medium text-text-tertiary py-2 uppercase tracking-wider">{dia}</div>
                      ))}
                      {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {days.map((d) => (
                        <button
                          key={d.day}
                          disabled={d.disabled}
                          onClick={() => setSelectedDate(`${d.day} de ${months[currentMonth]}`)}
                          className={cn(
                            'aspect-square p-2 rounded-xl flex items-center justify-center text-sm font-medium transition-all',
                            d.disabled ? 'opacity-20 cursor-not-allowed' :
                            selectedDate === `${d.day} de ${months[currentMonth]}`
                              ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30 scale-105'
                              : 'bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary hover:scale-105'
                          )}
                        >
                          {d.day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-text-primary">
                          Horários Disponíveis
                        </label>
                        <span className="text-xs font-medium text-text-tertiary bg-bg-secondary px-2 py-1 rounded-md">
                          {getTotalDuration()} min
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'py-2.5 rounded-xl text-center text-sm font-medium transition-all border',
                              selectedTime === time
                                ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/30 scale-105'
                                : 'bg-bg-card border-border-light text-text-primary hover:border-accent-primary/50 hover:scale-105'
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsPanel>

              <TabsPanel value="dados">
                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">Nome Completo *</label>
                    <input
                      type="text"
                      placeholder="Ex: Maria Joaquina"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full h-14 px-4 bg-bg-card border border-border-light rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full h-14 px-4 bg-bg-card border border-border-light rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">E-mail (Opcional)</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full h-14 px-4 bg-bg-card border border-border-light rounded-2xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all text-base"
                    />
                  </div>
                  
                  <div className="p-5 sm:p-6 bg-bg-secondary rounded-2xl border border-white/5 mt-6">
                    <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent-primary" />
                      Resumo do seu Momento
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-start pb-3 border-b border-white/5">
                        <span className="text-text-secondary text-sm">Serviço(s)</span>
                        <span className="text-text-primary text-sm font-medium text-right max-w-[60%]">{getSelectedServicesNames()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <span className="text-text-secondary text-sm">Data e Hora</span>
                        <span className="text-text-primary text-sm font-medium">{selectedDate} às {selectedTime}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-text-primary font-medium">Total Estimado</span>
                        <span className="font-bold text-accent-primary text-xl">R$ {getTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsPanel>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
              {activeTab !== 'servicos' ? (
                <Button variant="secondary" onClick={handleBack} className="w-full sm:w-auto h-12 px-8">
                  Voltar
                </Button>
              ) : <div />}
              
              <Button onClick={handleNext} disabled={!canProceed() || isSubmitting} className="w-full sm:w-auto h-12 px-10 text-base font-semibold shadow-lg shadow-accent-primary/20">
                {isSubmitting ? 'Finalizando...' : activeTab === 'dados' ? 'Confirmar Agendamento' : 'Próxima Etapa'}
              </Button>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}