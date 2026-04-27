'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAgendamentos, useClientes, useServicos } from '@/hooks/useSupabase'
import { useMemo } from 'react'

const stats = [
  { label: 'Clientes Hoje', value: '12', icon: Users, change: '+3' },
  { label: 'Agendamentos', value: '24', icon: Calendar, change: '+5' },
  { label: 'Faturamento', value: 'R$ 2.450', icon: DollarSign, change: '+12%' },
  { label: 'Confirmados', value: '18', icon: CheckCircle, change: '+8' },
]

export default function DashboardPage() {
  const { agendamentos, loading: loadingAgend } = useAgendamentos()
  const { clientes, loading: loadingClientes } = useClientes()
  const { servicos } = useServicos(false)

  const stats = useMemo(() => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    const agendamentosHoje = agendamentos.filter(a => a.data === hoje).length
    const totalClientes = clientes.length
    const confirmados = agendamentos.filter(a => a.status === 'CONFIRMADO').length
    
    // Simplificado para demonstração, idealmente viria do financeiro
    const faturamentoTotal = agendamentos
      .filter(a => a.status === 'CONFIRMADO')
      .reduce((acc, a) => {
        const s = servicos.find(s => s.id === a.servico_id)
        return acc + (s?.preco || 0)
      }, 0)

    return [
      { label: 'Clientes Total', value: totalClientes.toString(), icon: Users, change: '+0' },
      { label: 'Agendamentos', value: agendamentos.length.toString(), icon: Calendar, change: `+${agendamentosHoje} hoje` },
      { label: 'Estimativa Faturamento', value: `R$ ${faturamentoTotal.toLocaleString('pt-BR')}`, icon: DollarSign, change: 'total' },
      { label: 'Confirmados', value: confirmados.toString(), icon: CheckCircle, change: 'votos' },
    ]
  }, [agendamentos, clientes, servicos])

  const todayAgenda = useMemo(() => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    return agendamentos
      .filter(a => a.data === hoje)
      .map(a => {
        const s = servicos.find(s => s.id === a.servico_id)
        return {
          time: a.horario,
          client: a.cliente || a.telefone,
          service: s?.nome || 'Serviço',
          status: a.status
        }
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }, [agendamentos, servicos])

  const isLoading = loadingAgend || loadingClientes

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Visão geral do seu salão</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success text-sm">{stat.change}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full" />
              </div>
            ) : todayAgenda.length === 0 ? (
              <p className="text-center py-10 text-text-secondary">Nenhum agendamento para hoje</p>
            ) : (
              <div className="space-y-4">
                {todayAgenda.map((item, i) => (
                  <motion.div
                    key={`${item.time}-${item.client}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 text-center">
                        <p className="text-sm font-medium text-text-primary">{item.time}</p>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item.client}</p>
                        <p className="text-sm text-text-secondary">{item.service}</p>
                      </div>
                    </div>
                    <Badge variant={item.status === 'CONFIRMADO' ? 'success' : 'warning'}>
                      {item.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha'].map((cat, i) => {
                const count = servicos.filter(s => s.categoria === cat).length
                return (
                  <div
                    key={cat}
                    className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-accent-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{cat}</p>
                        <p className="text-sm text-text-secondary">{count} serviços cadastrados</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}