'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useNotification } from '@/components/ui/NotificationContext'
import { useAgendamentos, useServicos, useProfissionais, deleteAgendamento } from '@/hooks/useSupabase'

export default function AgendamentosPage() {
  const { showNotification } = useNotification()
  const { agendamentos, loading, refetch } = useAgendamentos()
  const { servicos } = useServicos()
  const { profissionais } = useProfissionais()
  const [itens, setItens] = useState<any[]>([])
  const [filtro, setFiltro] = useState('todos')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [agendamentoToDelete, setAgendamentoToDelete] = useState<any>(null)

  useEffect(() => {
    if (agendamentos.length > 0) {
      setItens(agendamentos)
    }
  }, [agendamentos])

  const getServicoNome = (id: string) => {
    const s = servicos.find(s => s.id === id)
    return s?.nome || id
  }

  const getProfissionalNome = (id: string) => {
    const p = profissionais.find(p => p.id === id)
    return p?.nome || id
  }

  const displayItens = itens.map(a => ({
    ...a,
    cliente: a.cliente || a.telefone,
    servico: getServicoNome(a.servico_id),
    profissional: getProfissionalNome(a.profissional_id)
  }))

  const filteredAgendamentos = useMemo(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }

    const todayStr = formatDate(today)
    const tomorrowStr = formatDate(tomorrow)

    if (filtro === 'todos') return displayItens
    
    return displayItens.filter(agend => {
      if (filtro === 'hoje') return agend.data === todayStr
      if (filtro === 'amanha') return agend.data === tomorrowStr
      if (filtro === 'semana') {
        const agendDate = new Date(agend.data.split('/').reverse().join('-'))
        return agendDate >= today && agendDate <= nextWeek
      }
      return true
    })
  }, [displayItens, filtro])

  const handleDelete = async () => {
    if (agendamentoToDelete) {
      const result = await deleteAgendamento(agendamentoToDelete.id)
      if (result.success) {
        setItens(prev => prev.filter(a => a.id !== agendamentoToDelete.id))
        refetch()
        showNotification('success', 'Agendamento removido!')
      }
    }
    setIsDeleteModalOpen(false)
    setAgendamentoToDelete(null)
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Agendamentos</h1>
          <p className="text-text-secondary text-sm md:text-base">({displayItens.length})</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {['todos', 'hoje', 'amanha', 'semana'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              filtro === f 
                ? 'bg-accent-primary text-white' 
                : 'bg-bg-card text-text-secondary'
            }`}
          >
            {f === 'todos' ? 'Todos' : f === 'hoje' ? 'Hoje' : f === 'amanha' ? 'Amanhã' : 'Esta semana'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid gap-2">
          {filteredAgendamentos.map((agend, i) => (
              <motion.div
                key={agend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="p-3 max-h-[100px]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-accent-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-text-primary text-sm truncate">{agend.cliente}</p>
                        <p className="text-xs text-text-secondary truncate">{agend.servico} por {agend.profissionais}</p>
                        <p className="text-xs text-text-tertiary">{agend.data} às {agend.horario}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={agend.status === 'CONFIRMADO' ? 'success' : agend.status === 'PENDENTE' ? 'warning' : agend.status === 'CANCELADO' ? 'error' : 'primary'} className="text-xs">
                        {agend.status}
                      </Badge>
                      <button
                        onClick={() => { setAgendamentoToDelete(agend); setIsDeleteModalOpen(true) }}
                        className="p-1.5 bg-error/20 text-error rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Excluir Agendamento</h2>
          <p className="text-text-secondary mb-6">
            Tem certeza que deseja excluir o agendamento de <strong className="text-text-primary">{agendamentoToDelete?.cliente}</strong>?
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete} className="flex-1">
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}