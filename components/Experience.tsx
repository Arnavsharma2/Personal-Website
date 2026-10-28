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
    impact: 'Reached 4,800 requests per second with 11 ms p99 routing overhead in load tests.',
    contribution: 'Built a Go/gRPC inference gateway that controls incoming traffic for each tenant. Automated checks with copied production traffic and rollbacks for new model releases, cutting validation from 90 to 14 minutes. Reworked usage tracking to reduce CPU utilization by 27%.',
    technologies: ['Go', 'gRPC', 'Model serving', 'Performance evaluation'],
  },
  {
    id: 'doximity',
    company: 'Doximity',
    role: 'Data Engineering and Analytics Intern',
    date: 'May 2026 – Aug 2026',
    impact: 'Cut engagement-data refresh time from 74 to 12 minutes.',
    contribution: 'Rebuilt Snowflake/dbt datasets to process only new or changed records. Standardized how duplicate events and user sessions were handled, reducing dashboard discrepancies from 11% to under 1%. Built experiment-analysis checks and reports that cut turnaround from two days to three hours.',
    technologies: ['SQL', 'Snowflake', 'dbt', 'Experimentation'],
  },
  {
    id: 'lockheed-martin',
    company: 'Lockheed Martin',
    role: 'Machine Learning Engineer · Contract',
    date: 'Dec 2025 – Apr 2026',
    impact: 'Reduced vision-pipeline p95 latency from 61 to 37 ms.',
    contribution: 'Reused GPU buffers and overlapped data transfers in a C++/OpenCV pipeline. Reduced Jetson Orin p95 inference latency from 24 to 14 ms with INT8 quantization, with a 0.7-point mAP loss. Separately, fine-tuned a PyTorch defect detector to improve held-out mAP from 71.8 to 79.4.',
    technologies: ['C++', 'CUDA', 'PyTorch', 'TensorRT', 'Jetson Orin'],
  },
  {
    id: 'wefire',
    company: 'WeFire',
    role: 'Machine Learning Engineer Intern',
    date: 'Jan 2025 – Nov 2025',
    impact: 'Improved transaction-classification macro-F1 from 0.73 to 0.89 on unseen merchants.',
    contribution: 'Built a LightGBM classifier and routed uncertain predictions for review, automating 76% of decisions at 97% precision on held-out data. Added batching and cached merchant features to ONNX serving, cutting p95 latency from 210 to 64 ms at 100 requests per second.',
    technologies: ['Python', 'LightGBM', 'ONNX Runtime', 'Model evaluation'],
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
