'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Image, Eye, EyeOff } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'

interface GaleriaItem {
  id: string
  titulo: string
  imagem: string
  categoria: string
  ativo: boolean
}

const categorias = ['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha', 'Massagem', 'Geral']

const imagensDefault = [
  '/images/pes.jpeg',
  '/images/fazendo-a-unha.jfif',
  '/images/unha1.jfif',
]

export default function GaleriaPage() {
  const [itens, setItens] = useState<GaleriaItem[]>([
    { id: '1', titulo: 'Spa dos Pés', imagem: '/images/pes.jpeg', categoria: 'Pedicure', ativo: true },
    { id: '2', titulo: 'Manicure Profissional', imagem: '/images/fazendo-a-unha.jfif', categoria: 'Manicure', ativo: true },
    { id: '3', titulo: 'Design de Unhas', imagem: '/images/unha1.jfif', categoria: 'Manicure', ativo: true },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GaleriaItem | null>(null)
  const [itemToDelete, setItemToDelete] = useState<GaleriaItem | null>(null)
  const [filterCategoria, setFilterCategoria] = useState('')

  const [formData, setFormData] = useState({
    titulo: '',
    imagem: '',
    categoria: '',
  })

  const filteredItens = itens.filter(item => 
    !filterCategoria || item.categoria === filterCategoria
  )

  const handleOpenModal = (item?: GaleriaItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        titulo: item.titulo,
        imagem: item.imagem,
        categoria: item.categoria,
      })
    } else {
      setEditingItem(null)
      setFormData({ titulo: '', imagem: imagensDefault[0], categoria: '' })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingItem) {
      setItens(prev => prev.map(i => 
        i.id === editingItem.id 
          ? { ...i, ...formData }
          : i
      ))
    } else {
      const newItem: GaleriaItem = {
        id: Date.now().toString(),
        ...formData,
        ativo: true,
      }
      setItens(prev => [...prev, newItem])
    }
    
    setIsModalOpen(false)
    setFormData({ titulo: '', imagem: '', categoria: '' })
    setEditingItem(null)
  }

  const handleDelete = () => {
    if (itemToDelete) {
      setItens(prev => prev.filter(i => i.id !== itemToDelete.id))
    }
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
  }

  const toggleAtivo = (id: string) => {
    setItens(prev => prev.map(i => 
      i.id === id ? { ...i, ativo: !i.ativo } : i
    ))
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Galeria</h1>
          <p className="text-text-secondary">Gerencie as imagens do site ({itens.length})</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Imagem
        </Button>
      </div>

      <div className="mb-6">
        <select
          value={filterCategoria}
          onChange={(e) => setFilterCategoria(e.target.value)}
          className="h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItens.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn('relative group', !item.ativo && 'opacity-50')}
          >
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-2 bg-bg-card rounded-lg"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => { setItemToDelete(item); setIsDeleteModalOpen(true) }}
                    className="p-2 bg-error rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-text-primary text-sm">{item.titulo}</h3>
                <p className="text-xs text-text-secondary">{item.categoria}</p>
                <button 
                  onClick={() => toggleAtivo(item.id)}
                  className="mt-2 flex items-center gap-1 text-xs"
                >
                  {item.ativo ? (
                    <><Eye className="w-3 h-3 text-success" /> Ativo</>
                  ) : (
                    <><EyeOff className="w-3 h-3 text-text-tertiary" /> Inativo</>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItens.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">Nenhuma imagem encontrada</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Editar Imagem' : 'Nova Imagem'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Título</label>
            <input
              type="text"
              placeholder="Ex: Manicure Rose Gold"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">Imagem</label>
            <select
              value={formData.imagem}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            >
              <option value="">Selecione uma imagem</option>
              {imagensDefault.map(img => (
                <option key={img} value={img}>{img}</option>
              ))}
            </select>
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
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingItem ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Exclusão">
        <div className="text-center py-4">
          <p className="text-text-secondary mb-4">
            Tem certeza que deseja excluir <strong className="text-text-primary">{itemToDelete?.titulo}</strong>?
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