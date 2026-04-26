'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Calendar as CalIcon, Clock, CheckCircle, XCircle, AlertCircle, Edit2, Trash2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'

interface Agendamento {
  id: string
  data: string
  horario: string
  cliente: string
  servico: string
  profissional: string
  status: 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'
  telefone: string
}

const mockClientes = ['Ana Paula', 'Carla Silva', 'Juliana Santos', 'Marina Oliveira']
const mockServicos = ['Manicure', 'Pedicure', 'Extensão Cílios', 'Design Sobrancelha', 'Massagem']
const mockProfissionais = ['Carla', 'Juliana', 'Patrícia', 'Marina']

const statusConfig = {
  PENDENTE: { variant: 'warning' as const, icon: AlertCircle },
  CONFIRMADO: { variant: 'success' as const, icon: CheckCircle },
  CANCELADO: { variant: 'error' as const, icon: XCircle },
  CONCLUIDO: { variant: 'primary' as const, icon: CheckCircle },
}

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    { id: '1', data: '25/04/2026', horario: '09:00', cliente: 'Ana Paula', servico: 'Manicure', profissional: 'Carla', status: 'CONFIRMADO', telefone: '(11) 99999-9999' },
    { id: '2', data: '25/04/2026', horario: '10:30', cliente: 'Carla Silva', servico: 'Pedicure', profissional: 'Juliana', status: 'PENDENTE', telefone: '(11) 98888-8888' },
    { id: '3', data: '25/04/2026', horario: '14:00', cliente: 'Juliana Santos', servico: 'Extensão Cílios', profissional: 'Patrícia', status: 'CONFIRMADO', telefone: '(11) 97777-7777' },
    { id: '4', data: '25/04/2026', horario: '15:30', cliente: 'Marina Oliveira', servico: 'Massagem', profissional: 'Marina', status: 'CONFIRMADO', telefone: '(11) 96666-6666' },
    { id: '5', data: '26/04/2026', horario: '09:00', cliente: 'Ana Paula', servico: 'Design Sobrancelha', profissional: 'Juliana', status: 'PENDENTE', telefone: '(11) 99999-9999' },
  ])

  const [filtro, setFiltro] = useState('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null)
  const [agendamentoToDelete, setAgendamentoToDelete] = useState<Agendamento | null>(null)

  const [formData, setFormData] = useState({
    data: '',
    horario: '',
    cliente: '',
    servico: '',
    profissional: '',
  })

  const handleOpenModal = (agendamento?: Agendamento) => {
    if (agendamento) {
      setEditingAgendamento(agendamento)
      setFormData({
        data: agendamento.data,
        horario: agendamento.horario,
        cliente: agendamento.cliente,
        servico: agendamento.servico,
        profissional: agendamento.profissional,
      })
    } else {
      setEditingAgendamento(null)
      setFormData({
        data: '',
        horario: '',
        cliente: '',
        servico: '',
        profissional: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const novoAgendamento: Agendamento = {
      id: editingAgendamento?.id || Date.now().toString(),
      ...formData,
      status: 'PENDENTE',
      telefone: '(11) 99999-9999',
    }
    
    if (editingAgendamento) {
      setAgendamentos(prev => prev.map(a => 
        a.id === editingAgendamento.id ? novoAgendamento : a
      ))
    } else {
      setAgendamentos(prev => [...prev, novoAgendamento])
    }
    
    setIsModalOpen(false)
    setFormData({ data: '', horario: '', cliente: '', servico: '', profissional: '' })
    setEditingAgendamento(null)
  }

  const handleDelete = () => {
    if (agendamentoToDelete) {
      setAgendamentos(prev => prev.filter(a => a.id !== agendamentoToDelete.id))
    }
    setIsDeleteModalOpen(false)
    setAgendamentoToDelete(null)
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Agendamentos</h1>
          <p className="text-text-secondary">Gerencie a agenda</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {['todos', 'hoje', 'amanhã', 'semana'].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtro === f
                ? 'bg-accent-primary text-text-primary'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Data</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Horário</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Cliente</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Serviço</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Profissional</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-text-primary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((agend) => {
                const status = statusConfig[agend.status]
                const StatusIcon = status.icon
                return (
                  <tr key={agend.id} className="border-b border-border-light hover:bg-bg-secondary/50">
                    <td className="py-4 px-6 text-text-primary">{agend.data}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-text-primary">
                        <Clock className="w-4 h-4 text-text-tertiary" />
                        {agend.horario}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-text-primary">{agend.cliente}</td>
                    <td className="py-4 px-6 text-text-secondary">{agend.servico}</td>
                    <td className="py-4 px-6 text-text-secondary">{agend.profissional}</td>
                    <td className="py-4 px-6">
                      <Badge variant={status.variant}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {agend.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="secondary" onClick={() => handleOpenModal(agend)}>
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => { setAgendamentoToDelete(agend); setIsDeleteModalOpen(true) }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAgendamento ? 'Editar Agendamento' : 'Novo Agendamento'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Data</label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Horário</label>
              <input
                type="time"
                value={formData.horario}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Cliente</label>
            <select
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            >
              <option value="">Selecione o cliente</option>
              {mockClientes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Serviço</label>
            <select
              value={formData.servico}
              onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            >
              <option value="">Selecione o serviço</option>
              {mockServicos.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Profissional</label>
            <select
              value={formData.profissional}
              onChange={(e) => setFormData({ ...formData, profissional: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            >
              <option value="">Selecione o profissional</option>
              {mockProfissionais.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingAgendamento ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Exclusão">
        <div className="text-center py-4">
          <p className="text-text-secondary mb-4">
            Tem certeza que deseja excluir o agendamento de <strong className="text-text-primary">{agendamentoToDelete?.cliente}</strong>?
          </p>
          <p className="text-sm text-error">Esta ação não pode ser desfeita.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} className="flex-1">
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete} className="flex-1">
            Excluir
          </Button>
        </div>
      </Modal>
    </div>
  )
}