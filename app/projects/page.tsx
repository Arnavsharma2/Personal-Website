import type { Metadata } from 'next'
import ProjectsGrid from '@/components/ProjectsGrid'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Projects | Arnav Sharma',
  description: 'Dynamo Diff and PSUMenu: PyTorch debugging tools, cloud applications, and recommendation systems, alongside model-serving, backend, and data projects.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Arnav Sharma',
    description: 'Dynamo Diff and PSUMenu: PyTorch debugging tools, cloud applications, and recommendation systems, alongside model-serving, backend, and data projects.',
    url: '/projects',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return (
    <InteriorPage title="Projects" subtitle="Tools for understanding model behavior, infrastructure for serving it, and applications people use.">
      <ProjectsGrid />
    </InteriorPage>
  )
}
