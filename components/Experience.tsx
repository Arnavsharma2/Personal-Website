interface ExperienceItem {
  company: string
  role: string
  date: string
  location: string
  color: string
  initials: string
  logo?: string
  logoVariant?: 'ibm'
  description?: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'IBM',
    role: 'Intern',
    date: '08/2026 - Present',
    location: 'Chicago, Illinois',
    color: '#0f62fe',
    initials: 'IBM',
    logo: '/ibm-logo.svg',
    logoVariant: 'ibm',
    description: [
      'AI engineering focused on LLM inference, model serving, and evaluation for IBM Granite using Python, PyTorch, vLLM, TensorRT-LLM, OpenShift, and Kubernetes.',
      'Working on inference performance, tool use, groundedness, safety, and production ML reliability.',
    ],
  },
  {
    company: 'Doximity',
    role: 'Intern',
    date: '05/2026 - 08/2026',
    location: 'San Francisco, California',
    color: '#0d3c61',
    initials: 'DX',
    logo: '/doximity-logo.jpg',
    description: [
      'Worked on clinical LLM evaluation and data infrastructure using Python, Kafka, Snowflake, Airflow, PySpark, and Great Expectations.',
      'Built model-quality checks and production data pipelines with clinicians, product managers, and engineers.',
    ],
  },
  {
    company: 'Students for Society SFORS',
    role: 'Activity Coordinator',
    date: '01/2022 - 01/2026',
    location: '',
    color: '#2F855A',
    initials: 'SF',
    description: [
      'Led planning and execution for five environmental events involving 200 volunteers and reaching 2,000+ participants.',
      'Managed scheduling, logistics, outreach, and external partnerships.',
    ],
  },
  {
    company: 'WeFIRE',
    role: 'Intern',
    date: '01/2025 - 11/2025',
    location: 'Hayward, California',
    color: '#FF6F00',
    initials: 'WF',
    logo: '/wefirelogo.jpeg',
    description: [
      'Built backend and full-stack systems using Python, TypeScript, React, FastAPI, PostgreSQL, Docker, and AWS.',
      'Integrated Plaid and Stripe and worked on APIs, financial data workflows, and reliability.',
    ],
  },
]


export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="experience-list">
      {experiences.map((item) => (
        <details key={item.company} className="experience-item">
          <summary className="experience-summary">
            <span>
              <span className="experience-company">{item.company}</span>
              <span className="experience-role">{item.role}</span>
            </span>
            <span className="experience-meta">
              <span>{item.date}</span>
              {item.location && <span>{item.location}</span>}
            </span>
          </summary>
          <div className="experience-description">
            {item.description?.map((description) => (
              <p key={description}>{description}</p>
            ))}
          </div>
        </details>
      ))}
    </section>
  )
}
