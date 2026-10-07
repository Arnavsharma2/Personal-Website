import Link from 'next/link'
import VisitTracker from '@/components/VisitTracker'

const groups = [
  {
    label: 'work',
    links: [
      { label: 'dynamo diff', href: '/projects' },
    ],
  },
  {
    label: 'about',
    links: [
      { label: 'a little about me', href: '/about' },
      { label: 'experience', href: '/experience' },
    ],
  },
  {
    label: 'elsewhere',
    links: [
      { label: 'email', href: 'mailto:aqs7726@psu.edu' },
      { label: 'github', href: 'https://github.com/Arnavsharma2' },
      { label: 'linkedin', href: 'https://www.linkedin.com/in/arnav-sharma2/' },
    ],
  },
]

export default function Home() {
  return (
    <main id="main" className="landing-page">
      <VisitTracker />
      <h1 className="landing-intro">
        <span>Hi, I’m <em>Arnav</em>,</span>
        <span>I build AI and data systems.</span>
      </h1>
      <nav className="index-nav" aria-label="Portfolio">
        {groups.map((group) => (
          <section className="index-group" key={group.label} aria-labelledby={`label-${group.label}`}>
            <h2 id={`label-${group.label}`} className="index-label">{group.label}</h2>
            <ul className="index-links">
              {group.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link className="index-link" href={link.href}>{link.label}</Link>
                  ) : (
                    <a className="index-link" href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </main>
  )
}
