'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const stats = [
  { label: 'Clientes Hoje', value: '12', icon: Users, change: '+3' },
  { label: 'Agendamentos', value: '24', icon: Calendar, change: '+5' },
  { label: 'Faturamento', value: 'R$ 2.450', icon: DollarSign, change: '+12%' },
  { label: 'Confirmados', value: '18', icon: CheckCircle, change: '+8' },
]

const todayAgenda = [
  { time: '09:00', client: 'Ana Paula', service: 'Manicure', status: 'CONFIRMADO' },
  { time: '10:30', client: 'Carla Silva', service: 'Pedicure', status: 'CONFIRMADO' },
  { time: '14:00', client: 'Juliana Santos', service: 'Extensão Cílios', status: 'CONFIRMADO' },
  { time: '15:30', client: 'Marina Oliveira', service: 'Massagem', status: 'CONFIRMADO' },
]

export default function DashboardPage() {
  return (
    <div className="p-2.5">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Visão geral do seu salão</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
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
                  <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAgenda.map((item) => (
                <div
                  key={item.time}
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Manicure', 'Pedicure', 'Massagem', 'Skincare'].map((service) => (
                <div
                  key={service}
                  className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{service}</p>
                      <p className="text-sm text-text-secondary">4 agendamentos</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}