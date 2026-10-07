import Link from 'next/link'
import type { ReactNode } from 'react'

interface InteriorPageProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function InteriorPage({ title, subtitle, children }: InteriorPageProps) {
  return (
    <main id="main" className="interior-page">
      <Link href="/" className="back-link">← index</Link>
      <header>
        <h1 className="page-heading">{title}</h1>
        {subtitle && <p className="page-intro">{subtitle}</p>}
      </header>
      {children}
    </main>
  )
}
