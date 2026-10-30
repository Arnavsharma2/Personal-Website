interface ExperienceItem {
  id: string
  company: string
  role: string
  date: string
  impact: string
  contribution: string
  technologies: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 'ibm',
    company: 'IBM',
    role: 'Software Development Engineer Intern · Cloud & AI Platform',
    date: 'Aug 2026 – Present',
    impact: 'Sustained 4,800 requests per second with 11 ms p99 routing overhead in load tests.',
    contribution: 'Built a Go/gRPC service on Kubernetes to route language-model requests with per-customer traffic controls and safe retries. Automated model-release checks for output quality, throughput, memory, and latency using mirrored traffic and automatic rollback, cutting validation from 90 to 14 minutes. Replaced a global lock in usage metering with sharded counters and batched writes, reducing CPU utilization by 27%.',
    technologies: ['Go', 'gRPC', 'Kubernetes'],
  },
  {
    id: 'doximity',
    company: 'Doximity',
    role: 'Data Engineering and Analytics Intern',
    date: 'May 2026 – Aug 2026',
    impact: 'Cut refresh time from 74 to 12 minutes for pipelines processing 50 million daily events.',
    contribution: 'Built incremental SQL pipelines with Snowflake and dbt to handle duplicates, late arrivals, and historical backfills. Built A/B-test analysis tools with confidence intervals and checks for inconsistent data and traffic splits, cutting analysis turnaround from two days to three hours.',
    technologies: ['SQL', 'Snowflake', 'dbt'],
  },
  {
    id: 'lockheed-martin',
    company: 'Lockheed Martin',
    role: 'Machine Learning Engineer · Contract',
    date: 'Dec 2025 – Apr 2026',
    impact: 'Reduced vision-pipeline p95 end-to-end latency from 61 to 37 ms.',
    contribution: 'Optimized a C++/CUDA vision pipeline by reusing GPU memory and overlapping data transfers with computation. Improved a PyTorch defect detector by analyzing false alarms and missed defects, raising mAP from 71.8 to 79.4 on manufacturing batches excluded from training.',
    technologies: ['C++', 'CUDA', 'PyTorch'],
  },
  {
    id: 'wefire',
    company: 'WeFire',
    role: 'Machine Learning Engineer Intern',
    date: 'Jan 2025 – Nov 2025',
    impact: 'Automated 76% of transaction-classification decisions at 97% precision on held-out data.',
    contribution: 'Trained a transaction classifier and calibrated confidence thresholds, routing uncertain predictions for review. Served the model with ONNX, batched requests, and cached merchant data, cutting p95 response time from 210 to 64 ms under a load of 100 requests per second.',
    technologies: ['ONNX'],
  },
]


export default function Experience() {
  return (
    <section id="experience" aria-label="Engineering experience" className="experience-list">
      {experiences.map((item) => (
        <details key={item.id} id={item.id} className="experience-item">
          <summary className="experience-summary">
            <span>
              <span className="experience-company">{item.company}</span>
              <span className="experience-role">{item.role}</span>
            </span>
            <span className="experience-meta">{item.date}</span>
          </summary>
          <div className="experience-description">
            <p><strong>{item.impact}</strong></p>
            <p>{item.contribution}</p>
            <ul className="project-technologies" aria-label={`${item.company} technologies`}>
              {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
        </details>
      ))}
    </section>
  )
}
