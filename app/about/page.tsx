import type { Metadata } from 'next'
import About from '@/components/About'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'About | Arnav Sharma',
  description: 'Arnav Sharma studies multi-agent security and language-model evaluation at Penn State, with interests in research engineering, ML infrastructure, and reliable tool use.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Arnav Sharma',
    description: 'Arnav Sharma studies multi-agent security and language-model evaluation at Penn State, with interests in research engineering, ML infrastructure, and reliable tool use.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <InteriorPage title="About">
      <About />
    </InteriorPage>
  )
}
