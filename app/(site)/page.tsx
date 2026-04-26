import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'
import { Professionals } from '@/components/home/Professionals'
import { Gallery } from '@/components/home/Gallery'
import { Faq } from '@/components/home/Faq'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Professionals />
      <Gallery />
      <Faq />
    </>
  )
}