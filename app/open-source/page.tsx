import type { Metadata } from 'next'
import InteriorPage from '@/components/InteriorPage'

export const metadata: Metadata = {
  title: 'Open Source | Arnav Sharma',
  description: 'Merged contributions to Hugging Face Transformers, Ray Data and SMG, covering model inputs, data correctness and streaming responses.',
  alternates: { canonical: '/open-source' },
  openGraph: {
    title: 'Open Source | Arnav Sharma',
    description: 'Merged fixes and regression tests for ML and backend infrastructure.',
    url: '/open-source',
    type: 'website',
  },
}

const contributions = [
  {
    id: 'transformers',
    project: 'Hugging Face Transformers',
    merged: 'September 17, 2026',
    description: 'Fixed image preprocessing for batches containing both text-only and image examples, preventing crashes when the first example has no image. Added regression tests for the affected image processors.',
    technologies: ['Python', 'PyTorch', 'Image processing'],
    number: 48753,
    href: 'https://github.com/huggingface/transformers/pull/48753',
  },
  {
    id: 'ray',
    project: 'Ray Data',
    merged: 'October 1, 2026',
    description: 'Fixed a data correctness bug that could turn missing values into populated records when combining datasets. Preserved missing-value information while aligning nested records, with tests for nested, sliced and chunked data.',
    technologies: ['Python', 'Apache Arrow', 'Data correctness'],
    number: 65961,
    href: 'https://github.com/ray-project/ray/pull/65961',
  },
  {
    id: 'smg',
    project: 'Shepherd Model Gateway (SMG)',
    merged: 'September 13, 2026',
    description: 'Fixed Go streaming responses losing their final content and usage information. Made sure buffered responses are delivered before the stream closes, with tests for completion, errors, cancellation and deadlines.',
    technologies: ['Go', 'Streaming', 'Concurrency'],
    number: 2519,
    href: 'https://github.com/smg-project/smg/pull/2519',
  },
]

export default function OpenSourcePage() {
  return (
    <InteriorPage title="Open source" subtitle="A few fixes I’ve contributed to the tools other engineers build on.">
      <section className="project-list" aria-label="Merged contributions">
        {contributions.map((contribution) => (
          <article key={contribution.id} id={contribution.id} className="project-entry" aria-labelledby={`${contribution.id}-heading`}>
            <h2 id={`${contribution.id}-heading`} className="project-title">{contribution.project}</h2>
            <p className="contribution-status">Merged · {contribution.merged}</p>
            <p className="project-description">{contribution.description}</p>
            <ul className="project-technologies" aria-label={`${contribution.project} technologies`}>
              {contribution.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            <div className="project-links">
              <a href={contribution.href} target="_blank" rel="noopener noreferrer">View merged PR #{contribution.number} ↗</a>
            </div>
          </article>
        ))}
      </section>
    </InteriorPage>
  )
}
