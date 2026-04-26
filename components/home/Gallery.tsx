'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const galleryImages = [
  { src: '/images/pes.jpeg', alt: 'Tratamento de pés', title: 'Spa dos Pés' },
  { src: '/images/fazendo-a-unha.jfif', alt: 'Manicure profissional', title: 'Manicure' },
  { src: '/images/unha1.jfif', alt: 'Design de unhas', title: 'Design' },
]

export function Gallery() {
  return (
    <section id="galeria" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-4">
            Galeria
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Nosso <span className="text-accent-primary">Espaço</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Um ambiente sofisticado pensado especialmente para você
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xl font-bold text-text-primary">{img.title}</p>
                  <p className="text-text-secondary">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}