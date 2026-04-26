'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Clock, DollarSign } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'

interface Servico {
  id: string
  nome: string
  preco: number
  duracao: number
  categoria: string
  ativo: boolean
  descricao?: string
}

const categoriaOptions = ['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha', 'Massagem', 'Skincare', 'Depilação', 'Harmonização']

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>([
    { id: '1', nome: 'Manicure Simples', preco: 35, duracao: 30, categoria: 'Manicure', ativo: true, descricao: 'Corte e pintura básica' },
    { id: '2', nome: 'Manicure + Esmaltação', preco: 45, duracao: 45, categoria: 'Manicure', ativo: true, descricao: 'Manicure com escolha de cor' },
    { id: '3', nome: 'Pedicure Spa', preco: 65, duracao: 60, categoria: 'Pedicure', ativo: true, descricao: 'Tratamento completo dos pés' },
    { id: '4', nome: 'Extensão de Cílios', preco: 150, duracao: 90, categoria: 'Cílios', ativo: true, descricao: 'Aplicação fio a fio' },
    { id: '5', nome: 'Design de Sobrancelha', preco: 30, duracao: 20, categoria: 'Sobrancelha', ativo: true, descricao: 'Designer profissional' },
    { id: '6', nome: 'Massagem Relaxante', preco: 80, duracao: 60, categoria: 'Massagem', ativo: true, descricao: 'Massagem corporal' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingServico, setEditingServico] = useState<Servico | null>(null)
  const [servicoToDelete, setServicoToDelete] = useState<Servico | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategoria, setFilterCategoria] = useState('')

  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    duracao: '',
    categoria: '',
    descricao: '',
  })

  const filteredServicos = servicos.filter(servico => {
    const matchesSearch = servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servico.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = !filterCategoria || servico.categoria === filterCategoria
    return matchesSearch && matchesCategoria
  })

  const handleOpenModal = (servico?: Servico) => {
    if (servico) {
      setEditingServico(servico)
      setFormData({
        nome: servico.nome,
        preco: servico.preco.toString(),
        duracao: servico.duracao.toString(),
        categoria: servico.categoria,
        descricao: servico.descricao || '',
      })
    } else {
      setEditingServico(null)
      setFormData({ nome: '', preco: '', duracao: '', categoria: '', descricao: '' })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const servicoData = {
      nome: formData.nome,
      preco: parseFloat(formData.preco),
      duracao: parseInt(formData.duracao),
      categoria: formData.categoria,
      descricao: formData.descricao,
    }
    
    if (editingServico) {
      setServicos(prev => prev.map(s => 
        s.id === editingServico.id 
          ? { ...s, ...servicoData }
          : s
      ))
    } else {
      const newServico: Servico = {
        id: Date.now().toString(),
        ...servicoData,
        ativo: true,
      }
      setServicos(prev => [...prev, newServico])
    }
    
    setIsModalOpen(false)
    setFormData({ nome: '', preco: '', duracao: '', categoria: '', descricao: '' })
    setEditingServico(null)
  }

  const handleDelete = () => {
    if (servicoToDelete) {
      setServicos(prev => prev.filter(s => s.id !== servicoToDelete.id))
    }
    setIsDeleteModalOpen(false)
    setServicoToDelete(null)
  }

  const toggleAtivo = (id: string) => {
    setServicos(prev => prev.map(s => 
      s.id === id ? { ...s, ativo: !s.ativo } : s
    ))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Serviços</h1>
          <p className="text-text-secondary text-sm md:text-base">({servicos.length})</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="w-10 h-10 p-0">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Buscar serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
        <select
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
          className="h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
        >
          <option value="">Todas as categorias</option>
          {categoriaOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServicos.map((servico, i) => (
          <motion.div
            key={servico.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-text-primary">{servico.nome}</h3>
                    <button onClick={() => toggleAtivo(servico.id)}>
                      <Badge variant={servico.ativo ? 'success' : 'default'}>
                        {servico.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </button>
                  </div>
                  <Badge variant="primary" className="mt-2">{servico.categoria}</Badge>
                  {servico.descricao && (
                    <p className="text-sm text-text-secondary mt-2">{servico.descricao}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleOpenModal(servico)} 
                    className="p-2 rounded-lg hover:bg-bg-secondary"
                  >
                    <Edit2 className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button 
                    onClick={() => { setServicoToDelete(servico); setIsDeleteModalOpen(true) }}
                    className="p-2 rounded-lg hover:bg-error/10"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-xl font-bold text-success">{formatCurrency(servico.preco)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">{servico.duracao} min</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredServicos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">Nenhum serviço encontrado</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingServico ? 'Editar Serviço' : 'Novo Serviço'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Nome do Serviço</label>
            <input
              type="text"
              placeholder="Ex: Manicure Simples"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Descrição</label>
            <textarea
              placeholder="Descrição do serviço..."
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full h-20 px-4 py-3 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Preço (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">Duração (min)</label>
              <input
                type="number"
                placeholder="0"
                value={formData.duracao}
                onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                required
                min="1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            >
              <option value="">Selecione a categoria</option>
              {categoriaOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingServico ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Exclusão">
        <div className="text-center py-4">
          <p className="text-text-secondary mb-4">
            Tem certeza que deseja excluir o serviço <strong className="text-text-primary">{servicoToDelete?.nome}</strong>?
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