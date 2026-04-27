import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { Faq } from '@/components/home/Faq'


import { AboutGiselle } from '@/components/home/AboutGiselle'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutGiselle />
      <Gallery />
      <Testimonials />
      <Faq />

    </>
  )
}