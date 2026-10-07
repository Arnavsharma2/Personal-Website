import type { Metadata } from 'next'
import Experience from '@/components/Experience'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Experience | Arnav Sharma',
  description: 'Experience in AI engineering, data infrastructure, and full-stack software development.',
  alternates: { canonical: '/experience' },
  openGraph: {
    title: 'Experience | Arnav Sharma',
    description: 'Experience in AI engineering, data infrastructure, and full-stack software development.',
    url: '/experience',
    type: 'website',
  },
}

export default function ExperiencePage() {
  return (
    <InteriorPage title="Experience" subtitle="What I’ve done. Select an entry to read more.">
      <Experience />
    </InteriorPage>
  )
}
