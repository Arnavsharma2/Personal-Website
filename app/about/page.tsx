import type { Metadata } from 'next'
import About from '@/components/About'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'About | Arnav Sharma',
  description: 'Arnav Sharma is a Penn State computer science student building backend services, data pipelines, and ML tools, with interests in language-model evaluation and agent security.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Arnav Sharma',
    description: 'Arnav Sharma is a Penn State computer science student building backend services, data pipelines, and ML tools, with interests in language-model evaluation and agent security.',
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
