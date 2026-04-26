'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, User, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { useNotification } from '@/components/ui/NotificationContext'

interface Funcionario {
  id: string
  nome: string
  email: string
  telefone: string
  especialidade: string
  ativo: boolean
  foto?: string
}

const especialidadeOptions = ['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha', 'Massagem', 'Skincare', 'Depilação', 'Harmonização']

export default function FuncionariosPage() {
  const { showNotification } = useNotification()
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: '1', nome: 'Carla Silva', email: 'carla@email.com', telefone: '(11) 99999-9999', especialidade: 'Manicure', ativo: true, foto: '/gisellestudio/images/pes.jpeg' },
    { id: '2', nome: 'Juliana Santos', email: 'juliana@email.com', telefone: '(11) 98888-8888', especialidade: 'Sobrancelha', ativo: true, foto: '' },
    { id: '3', nome: 'Marina Oliveira', email: 'marina@email.com', telefone: '(11) 97777-7777', especialidade: 'Massagem', ativo: true, foto: '' },
    { id: '4', nome: 'Patrícia Lima', email: 'patricia@email.com', telefone: '(11) 96666-6666', especialidade: 'Cílios', ativo: true, foto: '' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null)
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<Funcionario | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    foto: '',
  })

  const filteredFuncionarios = funcionarios.filter(func => 
    func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    func.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    func.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (func?: Funcionario) => {
    if (func) {
      setEditingFuncionario(func)
      setFormData({
        nome: func.nome,
        email: func.email,
        telefone: func.telefone,
        especialidade: func.especialidade,
        foto: func.foto || '',
      })
    } else {
      setEditingFuncionario(null)
      setFormData({ nome: '', email: '', telefone: '', especialidade: '', foto: '' })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingFuncionario) {
      setFuncionarios(prev => prev.map(f => 
        f.id === editingFuncionario.id 
          ? { ...f, ...formData }
          : f
      ))
      showNotification('success', 'Profissional atualizado!')
    } else {
      const newFuncionario: Funcionario = {
        id: Date.now().toString(),
        ...formData,
        ativo: true,
      }
      setFuncionarios(prev => [...prev, newFuncionario])
      showNotification('success', 'Profissional adicionado!')
    }
    
    setIsModalOpen(false)
    setFormData({ nome: '', email: '', telefone: '', especialidade: '', foto: '' })
    setEditingFuncionario(null)
  }

  const handleDelete = () => {
    if (funcionarioToDelete) {
      setFuncionarios(prev => prev.filter(f => f.id !== funcionarioToDelete.id))
      showNotification('success', 'Profissional removido!')
    }
    setIsDeleteModalOpen(false)
    setFuncionarioToDelete(null)
  }

  const toggleAtivo = (id: string) => {
    setFuncionarios(prev => prev.map(f => 
      f.id === id ? { ...f, ativo: !f.ativo } : f
    ))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Profissionais</h1>
          <p className="text-text-secondary text-sm md:text-base">({funcionarios.length})</p>
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
            placeholder="Buscar profissional..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFuncionarios.map((func, i) => (
          <motion.div
            key={func.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full">
              <div className="flex items-start gap-4">
                {func.foto ? (
                  <img 
                    src={func.foto} 
                    alt={func.nome}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-accent-primary" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">{func.nome}</h3>
                  <p className="text-sm text-text-secondary">{func.email}</p>
                  <p className="text-sm text-text-secondary">{func.telefone}</p>
                  <button 
                    onClick={() => toggleAtivo(func.id)}
                    className="mt-2"
                  >
                    <Badge variant={func.ativo ? 'success' : 'default'}>
                      {func.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Especialidade</p>
                  <p className="font-medium text-text-primary">{func.especialidade}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleOpenModal(func)} 
                    className="p-2 rounded-lg hover:bg-bg-secondary"
                  >
                    <Edit2 className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button 
                    onClick={() => { setFuncionarioToDelete(func); setIsDeleteModalOpen(true) }}
                    className="p-2 rounded-lg hover:bg-error/10"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredFuncionarios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">Nenhum profissional encontrado</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingFuncionario ? 'Editar Profissional' : 'Novo Profissional'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploader
            value={formData.foto}
            onChange={(foto) => setFormData({ ...formData, foto })}
            label="Foto de perfil"
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
              required
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
            <label className="block text-sm text-text-secondary mb-2">Especialidade</label>
            <select
              value={formData.especialidade}
              onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            >
              <option value="">Selecione a especialidade</option>
              {especialidadeOptions.map(esp => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingFuncionario ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Exclusão">
        <div className="text-center py-4">
          <p className="text-text-secondary mb-4">
            Tem certeza que deseja excluir o profissional <strong className="text-text-primary">{funcionarioToDelete?.nome}</strong>?
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