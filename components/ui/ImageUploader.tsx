'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value?: string
  onChange: (value: string) => void
  label?: string
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem')
      return
    }

    setIsLoading(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      onChange(result)
      setIsLoading(false)
    }
    reader.onerror = () => {
      setIsLoading(false)
      alert('Erro ao ler a imagem')
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onChange('')
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      {label && (
        <label className="block text-sm text-text-secondary mb-2">{label}</label>
      )}
      
      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-bg-secondary border border-border-light">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={handleClick}
              className="p-2 bg-bg-card/90 rounded-lg hover:bg-bg-card transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-text-primary" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-error/90 rounded-lg hover:bg-error transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full h-40 rounded-xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center gap-2",
            isDragging
              ? "border-accent-primary bg-accent-primary/10"
              : "border-border-light hover:border-accent-primary/50 hover:bg-bg-secondary/50"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
              <span className="text-sm text-text-secondary">Processando...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-text-tertiary" />
              <span className="text-sm text-text-secondary">
                Clique ou arraste uma imagem
              </span>
              <span className="text-xs text-text-tertiary">
                PNG, JPG até 5MB
              </span>
            </>
          )}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}