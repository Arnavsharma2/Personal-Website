import type { Metadata } from 'next'
import ProjectsGrid from '@/components/ProjectsGrid'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Dynamo Diff | Arnav Sharma',
  description: 'Compare recorded PyTorch Dynamo runs with source-linked compiler evidence. A local Python analyzer, CLI, MCP server, and VS Code extension.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Dynamo Diff | Arnav Sharma',
    description: 'Compare recorded PyTorch Dynamo runs with source-linked compiler evidence. A local Python analyzer, CLI, MCP server, and VS Code extension.',
    url: '/projects',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return (
    <InteriorPage title="Dynamo Diff" subtitle="A closer look at what changed between two PyTorch Dynamo runs.">
      <ProjectsGrid />
    </InteriorPage>
  )
}
