import type { Metadata } from 'next'
import About from '@/components/About'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'About | Arnav Sharma',
  description: 'Arnav Sharma is a Computer Science student at Penn State working on AI engineering and reliable data systems.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Arnav Sharma',
    description: 'Arnav Sharma is a Computer Science student at Penn State working on AI engineering and reliable data systems.',
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
