'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Calendar as CalIcon, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const mockAgendamentos = [
  { id: '1', data: '25/04/2026', horario: '09:00', cliente: 'Ana Paula', servico: 'Manicure', profissional: 'Carla', status: 'CONFIRMADO' },
  { id: '2', data: '25/04/2026', horario: '10:30', cliente: 'Carla Silva', servico: 'Pedicure', profissional: 'Juliana', status: 'PENDENTE' },
  { id: '3', data: '25/04/2026', horario: '14:00', cliente: 'Juliana Santos', servico: 'Extensão Cílios', profissional: 'Patrícia', status: 'CONFIRMADO' },
  { id: '4', data: '25/04/2026', horario: '15:30', cliente: 'Marina Oliveira', servico: 'Massagem', profissional: 'Marina', status: 'CONFIRMADO' },
  { id: '5', data: '26/04/2026', horario: '09:00', cliente: 'Ana Paula', servico: 'Design Sobrancelha', profissional: 'Juliana', status: 'PENDENTE' },
]

const statusConfig = {
  PENDENTE: { variant: 'warning' as const, icon: AlertCircle },
  CONFIRMADO: { variant: 'success' as const, icon: CheckCircle },
  CANCELADO: { variant: 'error' as const, icon: XCircle },
  CONCLUIDO: { variant: 'primary' as const, icon: CheckCircle },
}

export default function AgendamentosPage() {
  const [filtro, setFiltro] = useState('todos')

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Agendamentos</h1>
          <p className="text-text-secondary">Gerencie a agenda</p>
        </div>
        <Button>
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
              {mockAgendamentos.map((agend) => {
                const status = statusConfig[agend.status as keyof typeof statusConfig]
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
                        <Button size="sm" variant="secondary">Editar</Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}