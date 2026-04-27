'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, Bell, CreditCard, Building, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function ConfiguracoesPage() {
  const [horarioAbertura, setHorarioAbertura] = useState('08:00')
  const [horarioFechamento, setHorarioFechamento] = useState('20:00')
  const [diasAtivos, setDiasAtivos] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'])
  const [notificacoes, setNotificacoes] = useState({
    lembretesEmail: true,
    novosAgendamentos: true,
    confirmacaoOrcamento: false,
  })
  const [salvo, setSalvo] = useState<string | null>(null)

  const toggleDia = (dia: string) => {
    if (diasAtivos.includes(dia)) {
      if (diasAtivos.length > 1) {
        setDiasAtivos(diasAtivos.filter(d => d !== dia))
      }
    } else {
      setDiasAtivos([...diasAtivos, dia])
    }
  }

  const handleSalvar = (tipo: string) => {
    setSalvo(tipo)
    setTimeout(() => setSalvo(null), 2000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Configurações</h1>
        <p className="text-text-secondary">Configure o sistema</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-primary" />
                </div>
                <CardTitle>Horário de Funcionamento</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Abertura</label>
                  <input
                    type="time"
                    value={horarioAbertura}
                    onChange={(e) => setHorarioAbertura(e.target.value)}
                    className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Fechamento</label>
                  <input
                    type="time"
                    value={horarioFechamento}
                    onChange={(e) => setHorarioFechamento(e.target.value)}
                    className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
              </div>
              <Button onClick={() => handleSalvar('horario')} className="mt-4">
                {salvo === 'horario' ? (
                  <><Check className="w-4 h-4 mr-2" /> Salvo!</>
                ) : 'Salvar'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent-primary" />
                </div>
                <CardTitle>Dias de Funcionamento</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {diasSemana.map((dia) => (
                  <button
                    key={dia}
                    onClick={() => toggleDia(dia)}
                    className={`w-12 h-12 rounded-xl font-medium transition-all ${
                      diasAtivos.includes(dia)
                        ? 'bg-accent-primary text-text-primary'
                        : 'bg-bg-secondary text-text-secondary'
                    }`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
              <Button onClick={() => handleSalvar('dias')} className="mt-4">
                {salvo === 'dias' ? (
                  <><Check className="w-4 h-4 mr-2" /> Salvo!</>
                ) : 'Salvar'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent-primary" />
                </div>
                <CardTitle>Notificações</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-text-primary">Lembretes por email</span>
                  <input 
                    type="checkbox" 
                    checked={notificacoes.lembretesEmail}
                    onChange={(e) => setNotificacoes({ ...notificacoes, lembretesEmail: e.target.checked })}
                    className="w-5 h-5 accent-accent-primary" 
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-text-primary">Novos agendamentos</span>
                  <input 
                    type="checkbox" 
                    checked={notificacoes.novosAgendamentos}
                    onChange={(e) => setNotificacoes({ ...notificacoes, novosAgendamentos: e.target.checked })}
                    className="w-5 h-5 accent-accent-primary" 
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-text-primary">Confirmação de orçamento</span>
                  <input 
                    type="checkbox" 
                    checked={notificacoes.confirmacaoOrcamento}
                    onChange={(e) => setNotificacoes({ ...notificacoes, confirmacaoOrcamento: e.target.checked })}
                    className="w-5 h-5 accent-accent-primary" 
                  />
                </label>
              </div>
              <Button onClick={() => handleSalvar('notificacoes')} className="mt-4">
                {salvo === 'notificacoes' ? (
                  <><Check className="w-4 h-4 mr-2" /> Salvo!</>
                ) : 'Salvar'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}