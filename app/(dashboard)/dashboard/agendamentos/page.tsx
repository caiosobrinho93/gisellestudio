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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [agendamentoToDelete, setAgendamentoToDelete] = useState<any>(null)
  const [selectedAgendamento, setSelectedAgendamento] = useState<any>(null)

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
                <Card 
                  className="p-2 h-[80px] flex items-center overflow-hidden cursor-pointer hover:bg-bg-secondary/50 transition-colors"
                  onClick={() => { setSelectedAgendamento(agend); setIsDetailModalOpen(true) }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-text-primary text-sm truncate">{agend.cliente}</p>
                      <p className="text-xs text-text-secondary truncate">{agend.servico}</p>
                      <p className="text-xs text-text-tertiary">{agend.data} às {agend.horario}</p>
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

      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Detalhes do Agendamento">
        {selectedAgendamento && (
          <div className="p-2 space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Cliente</p>
                  <p className="text-lg font-bold text-text-primary">{selectedAgendamento.cliente}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg-secondary rounded-2xl border border-white/5">
                  <p className="text-xs text-text-secondary mb-1">Data</p>
                  <p className="font-bold text-text-primary">{selectedAgendamento.data}</p>
                </div>
                <div className="p-4 bg-bg-secondary rounded-2xl border border-white/5">
                  <p className="text-xs text-text-secondary mb-1">Horário</p>
                  <p className="font-bold text-text-primary">{selectedAgendamento.horario}</p>
                </div>
              </div>

              <div className="p-4 bg-bg-secondary rounded-2xl border border-white/5">
                <p className="text-sm text-text-secondary mb-1">Serviço</p>
                <p className="text-lg font-bold text-accent-primary">{selectedAgendamento.servico}</p>
              </div>

              <div className="p-4 bg-bg-secondary rounded-2xl border border-white/5">
                <p className="text-sm text-text-secondary mb-1">WhatsApp</p>
                <p className="text-lg font-bold text-text-primary">{selectedAgendamento.telefone}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setIsDetailModalOpen(false)}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  setAgendamentoToDelete(selectedAgendamento);
                  setIsDetailModalOpen(false);
                  setIsDeleteModalOpen(true);
                }}
                className="flex-1"
              >
                Excluir
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}