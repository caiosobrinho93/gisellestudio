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

  const hoje = new Date().toLocaleDateString('pt-BR')
  const amanha = new Date(Date.now() + 86400000).toLocaleDateString('pt-BR')
  const proximaSemana = new Date(Date.now() + 7 * 86400000).toLocaleDateString('pt-BR')

  const filteredAgendamentos = displayItens.filter(agend => {
    if (filtro === 'todos') return true
    if (filtro === 'hoje') return agend.data === hoje
    if (filtro === 'amanha') return agend.data === amanha
    if (filtro === 'semana') return agend.data >= hoje && agend.data <= proximaSemana
    return true
  })

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
    <div className="p-2.5 page-content">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Agendamentos</h1>
          <p className="text-text-secondary text-sm md:text-base">({displayItens.length})</p>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {['todos', 'hoje', 'amanha', 'semana'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm whitespace-nowrap transition-colors ${
              filtro === f 
                ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/20' 
                : 'bg-bg-card text-text-secondary border border-border-light'
            }`}
          >
            {f === 'todos' ? 'Todos' : f === 'hoje' ? 'Hoje' : f === 'amanha' ? 'Amanhã' : 'Semana'}
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
                <Card className="p-2 h-[80px] flex items-center overflow-hidden">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-accent-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-text-primary text-sm truncate">{agend.cliente}</p>
                        <p className="text-xs text-text-secondary truncate">{agend.servico}</p>
                        <p className="text-xs text-text-tertiary">{agend.data} às {agend.horario}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={agend.status === 'CANCELADO' ? 'error' : 'success'} className="text-[10px] px-1.5 py-0">
                        {agend.status === 'CANCELADO' ? 'CANCELADO' : 'CONFIRMADO'}
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