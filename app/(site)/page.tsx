import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { Faq } from '@/components/home/Faq'


export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Faq />

    </>
  )
}