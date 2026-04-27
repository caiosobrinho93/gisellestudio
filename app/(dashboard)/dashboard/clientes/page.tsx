'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Phone, Mail, Edit2, Trash2, User, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { useNotification } from '@/components/ui/NotificationContext'
import { useClientes, createCliente, updateCliente, deleteCliente } from '@/hooks/useSupabase'

interface Cliente {
  id: string
  nome: string
  email: string
  telefone: string
  observacoes: string
  ativo: boolean
  dataCadastro: string
  foto?: string
}

export default function ClientesPage() {
  const { showNotification } = useNotification()
  const { clientes, loading, refetch } = useClientes()

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    observacoes: '',
    foto: '',
  })

  const filteredClientes = clientes.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone.includes(searchTerm)
  )

  const handleOpenModal = (cliente?: Cliente) => {
    if (cliente) {
      setEditingCliente(cliente)
      setFormData({
        nome: cliente.nome,
        email: cliente.email || '',
        telefone: cliente.telefone,
        observacoes: cliente.observacoes || '',
        foto: cliente.foto || '',
      })
    } else {
      setEditingCliente(null)
      setFormData({ nome: '', email: '', telefone: '', observacoes: '', foto: '' })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let result
    if (editingCliente) {
      result = await updateCliente(editingCliente.id, {
        ...formData,
        ativo: editingCliente.ativo
      })
      if (result.success) showNotification('success', 'Cliente atualizado!')
    } else {
      result = await createCliente(formData)
      if (result.success) showNotification('success', 'Cliente adicionado!')
    }
    
    if (result.success) {
      refetch()
      setIsModalOpen(false)
      setFormData({ nome: '', email: '', telefone: '', observacoes: '', foto: '' })
      setEditingCliente(null)
    } else {
      showNotification('error', 'Erro ao salvar cliente')
    }
  }

  const handleDelete = async () => {
    if (clienteToDelete) {
      const result = await deleteCliente(clienteToDelete.id)
      if (result.success) {
        showNotification('success', 'Cliente removido!')
        refetch()
      } else {
        showNotification('error', 'Erro ao remover cliente')
      }
    }
    setIsDeleteModalOpen(false)
    setClienteToDelete(null)
  }

  const toggleAtivo = async (cliente: Cliente) => {
    const result = await updateCliente(cliente.id, {
      nome: cliente.nome,
      telefone: cliente.telefone,
      ativo: !cliente.ativo
    })
    if (result.success) refetch()
  }

  return (
    <div className="p-2.5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Clientes</h1>
          <p className="text-text-secondary text-sm md:text-base">({clientes.length})</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="w-10 h-10 p-0">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-border-light">
          {filteredClientes.map((cliente) => (
            <motion.div 
              key={cliente.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 flex items-center justify-between gap-3 h-[80px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                {cliente.foto ? (
                  <img src={cliente.foto} alt={cliente.nome} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-accent-primary" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-medium text-text-primary text-sm truncate">{cliente.nome}</p>
                  <p className="text-[11px] text-text-secondary truncate">{cliente.telefone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleAtivo(cliente)}>
                  <Badge variant={cliente.ativo ? 'success' : 'default'} className="text-[10px] px-1.5 py-0">
                    {cliente.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </button>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleOpenModal(cliente)} 
                    className="p-1.5 rounded-lg hover:bg-bg-secondary"
                  >
                    <Edit2 className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button 
                    onClick={() => { setClienteToDelete(cliente); setIsDeleteModalOpen(true) }}
                    className="p-1.5 rounded-lg hover:bg-error/10"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Nome</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Telefone</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Observações</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-primary">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-text-primary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente) => (
                <motion.tr 
                  key={cliente.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border-light hover:bg-bg-secondary/50"
                >
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-3">
                      {cliente.foto ? (
                        <img src={cliente.foto} alt={cliente.nome} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-accent-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-text-primary">{cliente.nome}</p>
                        <p className="text-xs text-text-tertiary">Cadastro: {cliente.dataCadastro}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Mail className="w-4 h-4" />
                      {cliente.email}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone className="w-4 h-4" />
                      {cliente.telefone}
                    </div>
                  </td>
                  <td className="py-2 px-4 text-text-secondary text-sm max-w-xs truncate">
                    {cliente.observacoes || '-'}
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => toggleAtivo(cliente)}>
                      <Badge variant={cliente.ativo ? 'success' : 'default'}>
                        {cliente.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(cliente)} 
                        className="p-2 rounded-lg hover:bg-bg-secondary"
                      >
                        <Edit2 className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button 
                        onClick={() => { setClienteToDelete(cliente); setIsDeleteModalOpen(true) }}
                        className="p-2 rounded-lg hover:bg-error/10"
                      >
                        <Trash2 className="w-4 h-4 text-error" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClientes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">Nenhum cliente encontrado</p>
          </div>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCliente ? 'Editar Cliente' : 'Novo Cliente'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploader
            value={formData.foto}
            onChange={(foto) => setFormData({ ...formData, foto })}
            label="Foto do cliente"
          />
          <div>
            <label className="block text-sm text-text-secondary mb-2">Nome</label>
            <input
              type="text"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required={false}
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Telefone</label>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Observações</label>
            <textarea
              placeholder="Observações sobre o cliente..."
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="w-full h-20 px-4 py-3 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingCliente ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Exclusão">
        <div className="text-center py-4">
          <p className="text-text-secondary mb-4">
            Tem certeza que deseja excluir o cliente <strong className="text-text-primary">{clienteToDelete?.nome}</strong>?
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