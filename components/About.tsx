export default function About() {
  return (
    <div id="about" className="prose">
      <p>
        I&apos;m Arnav, a computer science student at Penn State, graduating in
        May 2028. I build backend services, data pipelines, and tools that help
        people understand and improve machine learning systems.
      </p>
      <p>
        Across IBM, Doximity, Lockheed Martin, and WeFire, I&apos;ve worked on
        serving models, making data more reliable, and getting ML systems to run
        faster. I like work where a clear test can show whether a change helped.
      </p>
      <section id="research-interests" className="about-section" aria-labelledby="research-heading">
        <h2 id="research-heading" className="section-heading">Research</h2>
        <p>
          At Penn State, I&apos;m researching security in multi-agent AI systems.
          I&apos;m especially interested in evaluating language models, understanding
          how agents use tools, and making failures easier to reproduce and fix.
        </p>
        <p>
          In my own projects, I build tools for inspecting ML systems and
          connecting results to evidence. Dynamo Diff is one example: it compares
          recorded PyTorch compiler runs and traces differences back to the source.
        </p>
        <p>
          In a separate{' '}
          <a className="text-link" href="https://github.com/Arnavsharma2/sdxl-skin-tone-steering" target="_blank" rel="noopener noreferrer">SDXL steering study</a>,
          I tested controlled edits to skin tone in synthetic portraits using
          fixed test conditions and saved results. Replication was inconclusive;
          I documented the limits and built checks for the report&apos;s numerical claims.
        </p>
        <aside className="research-case-study" aria-labelledby="research-case-study-heading">
          <h3 id="research-case-study-heading">Multi-agent security case study</h3>
          <p>
            Studied how malicious instructions spread between AI agents that use
            tools. Built repeatable tests on tasks and models excluded from
            development, then tested safeguards on messages passed to tools.
            Attack success fell from 41% to 12%, while task
            completion stayed within 2 percentage points of the original system.
            Tested each safeguard separately to understand its contribution.
          </p>
          <p>Manuscript under review; benchmark open source.</p>
        </aside>
      </section>
      <section className="about-section" aria-labelledby="toolbox-heading">
        <h2 id="toolbox-heading" className="section-heading">How I work</h2>
        <p>
          Outside of work, you&apos;ll find me hiking, cooking, or trying new foods.
        </p>
      </section>
    </div>
  )
}
