import type { Metadata } from 'next'
import Experience from '@/components/Experience'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Experience | Arnav Sharma',
  description: 'Engineering at IBM, Doximity, Lockheed Martin, and WeFire: cloud model serving, large-scale data pipelines, C++/CUDA performance, and applied ML evaluation.',
  alternates: { canonical: '/experience' },
  openGraph: {
    title: 'Experience | Arnav Sharma',
    description: 'Engineering at IBM, Doximity, Lockheed Martin, and WeFire: cloud model serving, large-scale data pipelines, C++/CUDA performance, and applied ML evaluation.',
    url: '/experience',
    type: 'website',
  },
}

export default function ExperiencePage() {
  return (
    <InteriorPage title="Experience" subtitle="Cloud model serving, data systems, and applied ML—with performance and evaluation built in. Select an entry to read more.">
      <Experience />
    </InteriorPage>
  )
}
