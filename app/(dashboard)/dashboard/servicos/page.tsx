'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Clock, DollarSign } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useServicos, createServico, deleteServico, updateServico } from '@/hooks/useSupabase'
import { ImageUploader } from '@/components/ui/ImageUploader'

const categoriaOptions = ['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha', 'Massagem', 'Skincare', 'Depilação', 'Harmonização']

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function ServicosPage() {
  const { servicos, loading, refetch } = useServicos()
  const [itens, setItens] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingServico, setEditingServico] = useState<any>(null)
  const [servicoToDelete, setServicoToDelete] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const [newNome, setNewNome] = useState('')
  const [newPreco, setNewPreco] = useState('')
  const [newDuracao, setNewDuracao] = useState('')
  const [newCategoria, setNewCategoria] = useState('Manicure')
  const [newDescricao, setNewDescricao] = useState('')
  const [newImagem, setNewImagem] = useState('')
  const [newProcesso, setNewProcesso] = useState('')
  const [newBeneficios, setNewBeneficios] = useState('')

  useEffect(() => {
    if (servicos.length > 0) {
      setItens(servicos)
    }
  }, [servicos])

  const filteredServicos = itens.filter(servico =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (servico?: any) => {
    if (servico) {
      setEditingServico(servico)
      setNewNome(servico.nome)
      setNewPreco(String(servico.preco))
      setNewDuracao(String(servico.duracao))
      setNewCategoria(servico.categoria)
      setNewDescricao(servico.descricao || '')
      setNewImagem(servico.imagem || '')
      setNewProcesso(Array.isArray(servico.processo) ? servico.processo.join('\n') : '')
      setNewBeneficios(Array.isArray(servico.beneficios) ? servico.beneficios.join('\n') : '')
    } else {
      setEditingServico(null)
      setNewNome('')
      setNewPreco('')
      setNewDuracao('')
      setNewCategoria('Manicure')
      setNewDescricao('')
      setNewImagem('')
      setNewProcesso('')
      setNewBeneficios('')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingServico(null)
  }

  const handleSave = async () => {
    if (!newNome || !newPreco || !newDuracao) {
      alert('Preencha todos os campos obrigatórios')
      return
    }
    
    setIsSaving(true)
    
    let result
    if (editingServico) {
      result = await updateServico(editingServico.id, {
        nome: newNome,
        preco: Number(newPreco),
        duracao: Number(newDuracao),
        descricao: newDescricao,
        categoria: newCategoria,
        ativo: editingServico.ativo,
        imagem: newImagem,
        processo: newProcesso.split('\n').filter(Boolean),
        beneficios: newBeneficios.split('\n').filter(Boolean)
      })
    } else {
      result = await createServico({
        nome: newNome,
        preco: Number(newPreco),
        duracao: Number(newDuracao),
        descricao: newDescricao,
        categoria: newCategoria,
        imagem: newImagem,
        processo: newProcesso.split('\n').filter(Boolean),
        beneficios: newBeneficios.split('\n').filter(Boolean)
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
    if (servicoToDelete) {
      const result = await deleteServico(servicoToDelete.id)
      if (result.success) {
        setItens(prev => prev.filter(s => s.id !== servicoToDelete.id))
        refetch()
      }
    }
    setIsDeleteModalOpen(false)
    setServicoToDelete(null)
  }

  const toggleAtivo = (id: string) => {
    setItens(prev => prev.map(s => 
      s.id === id ? { ...s, ativo: !s.ativo } : s
    ))
  }

  return (
    <div className="p-2.5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Serviços</h1>
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
            placeholder="Buscar serviço..."
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
          {filteredServicos.map((servico, i) => (
            <motion.div
              key={servico.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`p-2 h-[80px] flex items-center overflow-hidden ${!servico.ativo && 'opacity-50'}`}>
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-text-primary text-sm truncate">{servico.nome}</h3>
                      <Badge className="text-[10px] px-1 py-0">{servico.categoria}</Badge>
                    </div>
                    <p className="text-[11px] text-text-secondary truncate max-w-[150px] md:max-w-md mb-1">{servico.descricao}</p>
                    <div className="flex items-center gap-4 text-[10px]">
                      <span className="flex items-center gap-1 text-accent-primary font-medium">
                        <DollarSign className="w-2.5 h-2.5" />
                        {formatCurrency(servico.preco)}
                      </span>
                      <span className="flex items-center gap-1 text-text-secondary">
                        <Clock className="w-2.5 h-2.5" />
                        {servico.duracao} min
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAtivo(servico.id)}
                      className={`p-2 rounded-lg ${servico.ativo ? 'bg-success/20 text-success' : 'bg-bg-secondary text-text-tertiary'}`}
                    >
                      {servico.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                    <button
                      onClick={() => handleOpenModal(servico)}
                      className="p-2 bg-bg-secondary rounded-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => { setServicoToDelete(servico); setIsDeleteModalOpen(true) }}
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
            {editingServico ? 'Editar Serviço' : 'Novo Serviço'}
          </h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome do serviço"
              value={newNome}
              onChange={(e) => setNewNome(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Preço"
                value={newPreco}
                onChange={(e) => setNewPreco(e.target.value)}
                className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
              />
              <input
                type="number"
                placeholder="Duração (min)"
                value={newDuracao}
                onChange={(e) => setNewDuracao(e.target.value)}
                className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
              />
            </div>
            
            <select
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            >
              {categoriaOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <textarea
              placeholder="Descrição (opcional)"
              value={newDescricao}
              onChange={(e) => setNewDescricao(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl text-text-primary resize-none"
            />

            <textarea
              placeholder="Passo a passo do processo (um por linha)"
              value={newProcesso}
              onChange={(e) => setNewProcesso(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl text-text-primary resize-none"
            />

            <textarea
              placeholder="Benefícios (um por linha)"
              value={newBeneficios}
              onChange={(e) => setNewBeneficios(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl text-text-primary resize-none"
            />
            
            <ImageUploader
              value={newImagem}
              onChange={setNewImagem}
              label="Imagem do serviço"
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
          <h2 className="text-xl font-bold text-text-primary mb-4">Excluir Serviço</h2>
          <p className="text-text-secondary mb-6">
            Tem certeza que deseja excluir <strong className="text-text-primary">{servicoToDelete?.nome}</strong>?
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