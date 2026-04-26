'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, User, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useProfissionais, createProfissional, deleteProfissional, updateProfissional } from '@/hooks/useSupabase'

const especialidadeOptions = ['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha', 'Massagem', 'Skincare', 'Depilação', 'Harmonização']

export default function FuncionariosPage() {
  const { profissionais, loading, refetch } = useProfissionais()
  const [itens, setItens] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingFuncionario, setEditingFuncionario] = useState<any>(null)
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const [newNome, setNewNome] = useState('')
  const [newEspecialidade, setNewEspecialidade] = useState('Manicure')
  const [newTelefone, setNewTelefone] = useState('')
  const [newEmail, setNewEmail] = useState('')

  useEffect(() => {
    if (profissionais.length > 0) {
      setItens(profissionais)
    }
  }, [profissionais])

  const filteredFuncionarios = itens.filter(func =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    func.especialidade?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (func?: any) => {
    if (func) {
      setEditingFuncionario(func)
      setNewNome(func.nome)
      setNewEspecialidade(func.especialidade || 'Manicure')
      setNewTelefone(func.telefone || '')
      setNewEmail(func.email || '')
    } else {
      setEditingFuncionario(null)
      setNewNome('')
      setNewEspecialidade('Manicure')
      setNewTelefone('')
      setNewEmail('')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingFuncionario(null)
  }

  const handleSave = async () => {
    if (!newNome || !newEspecialidade) {
      alert('Preencha o nome e especialidade')
      return
    }
    
    setIsSaving(true)
    
    let result
    if (editingFuncionario) {
      result = await updateProfissional(editingFuncionario.id, {
        nome: newNome,
        especialidade: newEspecialidade,
        telefone: newTelefone,
        email: newEmail,
        ativo: editingFuncionario.ativo
      })
    } else {
      result = await createProfissional({
        nome: newNome,
        especialidade: newEspecialidade,
        telefone: newTelefone,
        email: newEmail
      })
    }
    
    setIsSaving(false)
    
    if (result.success) {
      refetch()
      handleCloseModal()
    } else {
      alert('Erro ao salvar. Tente novamente.')
    }
  }

  const handleDelete = async () => {
    if (funcionarioToDelete) {
      const result = await deleteProfissional(funcionarioToDelete.id)
      if (result.success) {
        setItens(prev => prev.filter(f => f.id !== funcionarioToDelete.id))
        refetch()
      }
    }
    setIsDeleteModalOpen(false)
    setFuncionarioToDelete(null)
  }

  const toggleAtivo = (id: string) => {
    setItens(prev => prev.map(f => 
      f.id === id ? { ...f, ativo: !f.ativo } : f
    ))
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Profissionais</h1>
          <p className="text-text-secondary text-sm md:text-base">({itens.length})</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="w-10 h-10 p-0">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
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

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFuncionarios.map((func, i) => (
            <motion.div
              key={func.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`p-4 ${!func.ativo && 'opacity-50'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                    {func.foto ? (
                      <img src={func.foto} alt={func.nome} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <User className="w-8 h-8 text-accent-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-text-primary">{func.nome}</h3>
                      <Badge>{func.especialidade}</Badge>
                    </div>
                    {func.telefone && <p className="text-sm text-text-secondary">{func.telefone}</p>}
                    {func.email && <p className="text-sm text-text-tertiary">{func.email}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAtivo(func.id)}
                      className={`p-2 rounded-lg ${func.ativo ? 'bg-success/20 text-success' : 'bg-bg-secondary text-text-tertiary'}`}
                    >
                      {func.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                    <button
                      onClick={() => handleOpenModal(func)}
                      className="p-2 bg-bg-secondary rounded-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => { setFuncionarioToDelete(func); setIsDeleteModalOpen(true) }}
                      className="p-2 bg-error/20 text-error rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            {editingFuncionario ? 'Editar Profissional' : 'Novo Profissional'}
          </h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={newNome}
              onChange={(e) => setNewNome(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            />
            
            <select
              value={newEspecialidade}
              onChange={(e) => setNewEspecialidade(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            >
              {especialidadeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            
            <input
              type="tel"
              placeholder="Telefone"
              value={newTelefone}
              onChange={(e) => setNewTelefone(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            />
            
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={handleCloseModal} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Excluir Profissional</h2>
          <p className="text-text-secondary mb-6">
            Tem certeza que deseja excluir <strong className="text-text-primary">{funcionarioToDelete?.nome}</strong>?
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
    </div>
  )
}