export default function About() {
  return (
    <div id="about" className="prose">
      <p>
        I&apos;m Arnav, a computer science student at Penn State, graduating in
        May 2028. I build backend and ML systems, with a focus on model serving,
        reproducible evaluation, and developer tools.
      </p>
      <p>
        Across IBM, Doximity, Lockheed Martin, and WeFire, I&apos;ve worked on
        routing model requests, processing large datasets, and making ML
        pipelines faster. I like work where a clear test can show whether a
        change improved quality, reliability, or performance.
      </p>
      <section id="research-interests" className="about-section" aria-labelledby="research-heading">
        <h2 id="research-heading" className="section-heading">Research</h2>
        <p>
          At Penn State, I evaluate multi-agent systems against prompt injection
          in tool results and messages between agents. I measure unauthorized
          actions, task completion, and added latency on tasks excluded from
          development.
        </p>
        <p>
          I built a Python evaluation framework for 12 code-generating language
          models across six programming languages. It saves inputs, model
          settings, tool calls, and results so failures can be reproduced and
          model versions compared.
        </p>
        <aside className="research-case-study" aria-labelledby="research-case-study-heading">
          <h3 id="research-case-study-heading">More reliable API use</h3>
          <p>
            Retrieving library documentation and validating API calls reduced
            calls to nonexistent APIs by 31% relative. First-attempt success on
            valid tasks stayed within 1 percentage point of baseline.
          </p>
        </aside>
        <p>
          In a separate{' '}
          <a className="text-link" href="https://github.com/Arnavsharma2/sdxl-skin-tone-steering" target="_blank" rel="noopener noreferrer">SDXL steering study</a>,
          I tested controlled edits to skin tone in synthetic portraits using
          fixed test conditions and saved results. Replication was inconclusive;
          I documented the limits and built checks for the report&apos;s numerical claims.
        </p>
      </section>
      <section className="about-section" aria-labelledby="interests-heading">
        <h2 id="interests-heading" className="section-heading">What I want to work on</h2>
        <p>
          I&apos;m interested in research engineering at Google DeepMind,
          especially evaluating generative models and agents, improving tool
          use, and building the ML infrastructure behind reliable experiments.
        </p>
        <p>
          I also enjoy backend and cloud systems, data engineering, and
          recommendation systems. I like connecting model behavior to the
          systems that serve it and the products people use.
        </p>
      </section>
      <section className="about-section" aria-labelledby="outside-work-heading">
        <h2 id="outside-work-heading" className="section-heading">Outside of work</h2>
        <p>
          You&apos;ll find me hiking, cooking, or trying new foods.
        </p>
      </section>
    </div>
  )
}
