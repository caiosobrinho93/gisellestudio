'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { useGaleria, deleteGaleriaItem, createGaleriaItem, updateGaleriaItem } from '@/hooks/useSupabase'
import { cn } from '@/lib/utils'

const categorias = ['Manicure', 'Pedicure', 'Cílios', 'Sobrancelha', 'Massagem', 'Geral']

export default function GaleriaPage() {
  const { galeria, loading, refetch } = useGaleria()
  const [itens, setItens] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [filterCategoria, setFilterCategoria] = useState('')
  const [newTitulo, setNewTitulo] = useState('')
  const [newCategoria, setNewCategoria] = useState('Geral')
  const [newImagem, setNewImagem] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (galeria.length > 0) {
      const fixedItens = galeria.map((item: any) => {
        let imgPath = item.imagem || ''
        if (imgPath.startsWith('data:')) {
          return { ...item }
        }
        if (imgPath && !imgPath.startsWith('/gisellestudio/') && !imgPath.startsWith('http')) {
          if (imgPath.startsWith('/images/')) {
            imgPath = '/gisellestudio' + imgPath
          } else if (imgPath.startsWith('/')) {
            imgPath = '/gisellestudio' + imgPath
          } else {
            imgPath = '/gisellestudio/images/' + imgPath
          }
        }
        return { ...item, imagem: imgPath }
      })
      setItens(fixedItens)
    }
  }, [galeria])

  const filteredItens = filterCategoria 
    ? itens.filter(i => i.categoria === filterCategoria)
    : itens

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setNewTitulo(item.titulo)
      setNewCategoria(item.categoria)
      setNewImagem(item.imagem)
    } else {
      setEditingItem(null)
      setNewTitulo('')
      setNewCategoria('Geral')
      setNewImagem('')
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleSave = async () => {
    if (!newTitulo || !newImagem) {
      alert('Preencha o título e selecione uma imagem')
      return
    }
    
    setIsSaving(true)
    
    let result
    if (editingItem) {
      result = await updateGaleriaItem(editingItem.id, {
        titulo: newTitulo,
        imagem: newImagem,
        categoria: newCategoria,
        ativo: editingItem.ativo
      })
    } else {
      result = await createGaleriaItem({
        titulo: newTitulo,
        imagem: newImagem,
        categoria: newCategoria
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
    if (itemToDelete) {
      const result = await deleteGaleriaItem(itemToDelete.id)
      if (result.success) {
        setItens(prev => prev.filter(i => i.id !== itemToDelete.id))
        refetch()
      }
    }
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
  }

  const toggleAtivo = async (id: string) => {
    setItens(prev => prev.map(i => 
      i.id === id ? { ...i, ativo: !i.ativo } : i
    ))
  }

  return (
    <div className="p-2.5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary">Galeria</h1>
          <p className="text-text-secondary text-sm md:text-base">({itens.length})</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="w-10 h-10 p-0">
          <Plus className="w-5 h-5" />
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

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItens.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn('relative group', !item.ativo && 'opacity-50')}
            >
              <Card className="overflow-hidden p-0">
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
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => { setItemToDelete(item); setIsDeleteModalOpen(true) }}
                      className="p-2 bg-error rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-text-primary text-sm">{item.titulo}</h3>
                  <p className="text-xs text-text-secondary">{item.categoria}</p>
                  <button 
                    onClick={() => toggleAtivo(item.id)}
                    className="mt-2 flex items-center gap-1 text-xs"
                  >
                    {item.ativo ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span className="text-success">Ativo</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span className="text-text-tertiary">Inativo</span>
                      </>
                    )}
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">
            {editingItem ? 'Editar Imagem' : 'Nova Imagem'}
          </h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={newTitulo}
              onChange={(e) => setNewTitulo(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            />
            
            <select
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              className="w-full h-12 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <ImageUploader value={newImagem} onChange={setNewImagem} />
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
          <h2 className="text-xl font-bold text-text-primary mb-4">Excluir Imagem</h2>
          <p className="text-text-secondary mb-6">
            Tem certeza que deseja excluir <strong className="text-text-primary">{itemToDelete?.titulo}</strong>?
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