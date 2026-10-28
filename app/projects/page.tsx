import type { Metadata } from 'next'
import ProjectsGrid from '@/components/ProjectsGrid'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Projects | Arnav Sharma',
  description: 'Projects in ML developer tools, model serving, backend systems, data pipelines and applied AI.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Arnav Sharma',
    description: 'Projects in ML developer tools, model serving, backend systems, data pipelines and applied AI.',
    url: '/projects',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return (
    <InteriorPage title="Projects" subtitle="ML tools, backend systems, and products people use.">
      <ProjectsGrid />
    </InteriorPage>
  )
}
