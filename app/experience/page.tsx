import type { Metadata } from 'next'
import Experience from '@/components/Experience'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Experience | Arnav Sharma',
  description: 'Engineering work at IBM, Doximity, Lockheed Martin, and WeFire: model serving, reliable data pipelines, and applied machine learning.',
  alternates: { canonical: '/experience' },
  openGraph: {
    title: 'Experience | Arnav Sharma',
    description: 'Engineering work at IBM, Doximity, Lockheed Martin, and WeFire: model serving, reliable data pipelines, and applied machine learning.',
    url: '/experience',
    type: 'website',
  },
}

export default function ExperiencePage() {
  return (
    <InteriorPage title="Experience" subtitle="Model serving, reliable data pipelines, and applied ML. Select an entry to read more.">
      <Experience />
    </InteriorPage>
  )
}
