'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, Smartphone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

const stats = [
  { label: 'Faturamento Total', value: 24500, icon: DollarSign, change: '+12%' },
  { label: 'Este Mês', value: 8500, icon: TrendingUp, change: '+8%' },
  { label: 'Cartão', value: 15000, icon: CreditCard, change: '+5%' },
  { label: 'Dinheiro', value: 5500, icon: Banknote, change: '+15%' },
  { label: 'PIX', value: 4000, icon: Smartphone, change: '+20%' },
]

const recentTransactions = [
  { id: '1', date: '25/04', description: 'Manicure - Ana Paula', value: 45, method: 'PIX' },
  { id: '2', date: '25/04', description: 'Pedicure - Carla Silva', value: 65, method: 'Cartão' },
  { id: '3', date: '25/04', description: 'Extensão Cílios - Juliana', value: 150, method: 'Cartão' },
  { id: '4', date: '24/04', description: 'Massagem - Marina', value: 80, method: 'Dinheiro' },
  { id: '5', date: '24/04', description: 'Design Sobrancelha', value: 30, method: 'PIX' },
]

export default function FinanceiroPage() {
  return (
    <div className="p-2 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Financeiro</h1>
        <p className="text-text-secondary">Controle financeiro do salão</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.slice(0, 4).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">
                    {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
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
                  {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}