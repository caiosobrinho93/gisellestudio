'use client'

import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, CreditCard, Smartphone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { useAgendamentos, useServicos } from '@/hooks/useSupabase'
import { useMemo } from 'react'

export default function FinanceiroPage() {
  const { agendamentos, loading: loadingAgend } = useAgendamentos()
  const { servicos } = useServicos(false)

  const { stats, recentTransactions } = useMemo(() => {
    const confirmados = agendamentos.filter(a => a.status === 'CONFIRMADO')
    
    let faturamentoTotal = 0
    let faturamentoMes = 0
    let faturamentoCartao = 0
    let faturamentoDinheiro = 0
    let faturamentoPix = 0

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const transactions = confirmados.map(a => {
      const s = servicos.find(s => s.id === a.servico_id)
      const valor = s?.preco || 0
      faturamentoTotal += valor

      const [day, month, year] = a.data.split('/')
      if (parseInt(month) - 1 === currentMonth && parseInt(year) === currentYear) {
        faturamentoMes += valor
      }

      // Dummy distribution for visualization since we don't have payment method in DB yet
      // In a real app, this would be a field in the agendamentos table
      faturamentoPix += valor // Assuming all as PIX for now for simplicity

      return {
        id: a.id,
        date: a.data.split('/').slice(0, 2).join('/'),
        description: `${s?.nome || 'Serviço'} - ${a.cliente || a.telefone}`,
        value: valor,
        method: 'PIX'
      }
    }).sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5)

    const statsArray = [
      { label: 'Faturamento Total', value: faturamentoTotal, icon: DollarSign, change: 'total' },
      { label: 'Este Mês', value: faturamentoMes, icon: TrendingUp, change: 'atual' },
      { label: 'PIX', value: faturamentoPix, icon: Smartphone, change: '100%' },
      { label: 'Cartão/Dinheiro', value: 0, icon: CreditCard, change: '0%' },
    ]

    return { stats: statsArray, recentTransactions: transactions }
  }, [agendamentos, servicos])

  const isLoading = loadingAgend

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Financeiro</h1>
        <p className="text-text-secondary">Controle financeiro do salão</p>
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
                  <p className="text-2xl font-bold text-text-primary mt-1">
                    {formatCurrency(stat.value)}
                  </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Receitas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full" />
              </div>
            ) : recentTransactions.length === 0 ? (
              <p className="text-center py-10 text-text-secondary">Nenhuma receita registrada</p>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                  >
                    <div>
                      <p className="font-medium text-text-primary">{t.description}</p>
                      <p className="text-sm text-text-secondary">{t.date} • {t.method}</p>
                    </div>
                    <p className="font-medium text-success">+ {formatCurrency(t.value)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formas de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.slice(2).map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-text-secondary" />
                  </div>
                  <span className="text-text-primary">{stat.label}</span>
                </div>
                <span className="font-medium text-text-primary">
                  {formatCurrency(stat.value)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}