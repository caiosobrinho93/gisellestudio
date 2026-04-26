'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Check, ChevronLeft, ChevronRight, PartyPopper, Home, Plus, X, Calendar, Clock, Scissors, Sparkles, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsPanel } from '@/components/ui/Tabs'
import { ServiceDetailModal } from '@/components/ui/ServiceDetailModal'
import { useServicos, useProfissionais, createAgendamento } from '@/hooks/useSupabase'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const steps = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'profissional', label: 'Profissional' },
  { id: 'data', label: 'Data/Hora' },
  { id: 'dados', label: 'Dados' },
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
  const { profissionais, loading: loadingProfissionais } = useProfissionais()
  
  const [activeTab, setActiveTab] = useState('servicos')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedProfessional, setSelectedProfessional] = useState<string>('')
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

  const professionals = profissionais.map(p => ({
    id: p.id,
    name: p.nome,
    specialty: p.especialidade
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

  const getSelectedProfessionalName = () => {
    return professionals.find(p => p.id === selectedProfessional)?.name || ''
  }

  const isStepCompleted = (stepId: string) => {
    if (stepId === 'servicos') return selectedServices.length > 0
    if (stepId === 'profissional') return !!selectedProfessional
    if (stepId === 'data') return !!selectedDate && !!selectedTime
    if (stepId === 'dados') return clientName && clientPhone && clientEmail
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
    
    if (activeTab === 'servicos') setActiveTab('profissional')
    else if (activeTab === 'profissional') setActiveTab('data')
    else if (activeTab === 'data') setActiveTab('dados')
    else if (activeTab === 'dados') {
      setIsSubmitting(true)
      const result = await createAgendamento({
        servico_id: selectedServices[0],
        profissional_id: selectedProfessional,
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
    if (activeTab === 'profissional') setActiveTab('servicos')
    else if (activeTab === 'data') setActiveTab('profissional')
    else if (activeTab === 'dados') setActiveTab('data')
    setTimeout(scrollToTop, 100)
  }

  const resetForm = () => {
    setShowSuccess(false)
    setActiveTab('servicos')
    setSelectedServices([])
    setSelectedProfessional('')
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

  if (loadingServicos || loadingProfissionais) {
    return (
      <div className="min-h-screen bg-bg-primary pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-12" ref={contentRef}>
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
                  <User className="w-5 h-5 text-accent-primary" />
                  <span className="text-text-primary">{getSelectedProfessionalName()}</span>
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
                <Link href="/gisellestudio/" className="flex-1">
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
            Escolha os serviços e encontre o melhor horário
          </p>
        </motion.div>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="servicos" className="mb-6">
            <TabsList className="w-full overflow-x-auto">
              {steps.map((step, index) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  className={cn(
                    'whitespace-nowrap',
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

            <Card className="mt-6">
              <TabsPanel value="servicos">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service.id} className="relative group">
                      <button
                        onClick={() => toggleService(service.id)}
                        className={cn(
                          'w-full p-3 sm:p-4 rounded-xl border text-left transition-all overflow-hidden',
                          selectedServices.includes(service.id)
                            ? 'border-accent-primary bg-accent-primary/20'
                            : 'border-border-light hover:border-accent-primary'
                        )}
                      >
                        {service.imagem && (
                          <div className="w-full h-20 sm:h-24 mb-3 rounded-lg overflow-hidden">
                            <img 
                              src={service.imagem} 
                              alt={service.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-text-primary text-sm sm:text-base">{service.name}</p>
                            <p className="text-xs sm:text-sm text-text-secondary">{service.duration} min</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-accent-primary text-sm sm:text-base">R$ {service.price}</p>
                            {selectedServices.includes(service.id) && (
                              <Check className="w-4 h-4 text-accent-primary ml-auto mt-1" />
                            )}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedServiceDetail(service)
                        }}
                        className="absolute top-3 right-3 p-2 rounded-lg bg-bg-secondary/80 hover:bg-accent-primary/20 transition-colors z-10"
                      >
                        <Info className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  ))}
                  {selectedServices.length > 0 && (
                    <div className="col-span-full p-3 sm:p-4 bg-bg-secondary rounded-xl mt-2 sm:mt-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary text-sm">Total:</span>
                        <span className="font-semibold text-accent-primary text-sm sm:text-base">R$ {getTotalPrice()} ({getTotalDuration()} min)</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsPanel>

              <TabsPanel value="profissional">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {professionals.map((pro) => (
                    <button
                      key={pro.id}
                      onClick={() => setSelectedProfessional(pro.id)}
                      className={cn(
                        'p-3 sm:p-4 rounded-xl border text-left transition-all',
                        selectedProfessional === pro.id
                          ? 'border-accent-primary bg-accent-primary/20'
                          : 'border-border-light hover:border-accent-primary'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-accent-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text-primary text-sm sm:text-base truncate">{pro.name}</p>
                          <p className="text-xs sm:text-sm text-text-secondary">{pro.specialty}</p>
                        </div>
                        {selectedProfessional === pro.id && (
                          <Check className="w-4 h-4 text-accent-primary ml-auto flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsPanel>

              <TabsPanel value="data">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-lg bg-bg-secondary hover:bg-accent-primary/20 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-text-secondary" />
                      </button>
                      <span className="font-medium text-text-primary">
                        {months[currentMonth]} {currentYear}
                      </span>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-lg bg-bg-secondary hover:bg-accent-primary/20 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-text-secondary" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      <div className="text-center text-xs text-text-tertiary py-2">Dom</div>
                      <div className="text-center text-xs text-text-tertiary py-2">Seg</div>
                      <div className="text-center text-xs text-text-tertiary py-2">Ter</div>
                      <div className="text-center text-xs text-text-tertiary py-2">Qua</div>
                      <div className="text-center text-xs text-text-tertiary py-2">Qui</div>
                      <div className="text-center text-xs text-text-tertiary py-2">Sex</div>
                      <div className="text-center text-xs text-text-tertiary py-2">Sáb</div>
                      {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {days.map((d) => (
                        <button
                          key={d.day}
                          disabled={d.disabled}
                          onClick={() => setSelectedDate(`${d.day} de ${months[currentMonth]}`)}
                          className={cn(
                            'p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm transition-all',
                            d.disabled ? 'opacity-30 cursor-not-allowed' :
                            selectedDate === `${d.day} de ${months[currentMonth]}`
                              ? 'bg-accent-primary text-text-primary'
                              : 'bg-bg-secondary hover:bg-accent-primary/20 text-text-primary'
                          )}
                        >
                          {d.day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-3">
                        Horário disponível ({getTotalDuration()} min total)
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'p-2 rounded-lg text-center text-xs sm:text-sm transition-all',
                              selectedTime === time
                                ? 'bg-accent-primary text-text-primary'
                                : 'bg-bg-secondary hover:bg-accent-primary/20'
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
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm sm:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Seu telefone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Seu email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm sm:text-base"
                  />
                  
                  <div className="p-3 sm:p-4 bg-bg-secondary rounded-xl">
                    <h4 className="font-medium text-text-primary mb-2 text-sm sm:text-base">Resumo do Agendamento</h4>
                    <p className="text-xs sm:text-sm text-text-secondary">Serviços: {getSelectedServicesNames()}</p>
                    <p className="text-xs sm:text-sm text-text-secondary">Profissional: {getSelectedProfessionalName()}</p>
                    <p className="text-xs sm:text-sm text-text-secondary">Data: {selectedDate}</p>
                    <p className="text-xs sm:text-sm text-text-secondary">Horário: {selectedTime}</p>
                    <p className="font-semibold text-accent-primary mt-2 text-sm sm:text-base">Total: R$ {getTotalPrice()}</p>
                  </div>
                </div>
              </TabsPanel>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              {activeTab !== 'servicos' ? (
                <Button variant="secondary" onClick={handleBack} className="w-full sm:w-auto">
                  Voltar
                </Button>
              ) : <div />}
              
              <Button onClick={handleNext} disabled={!canProceed() || isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Salvando...' : activeTab === 'dados' ? 'Confirmar Agendamento' : 'Continuar'}
              </Button>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}