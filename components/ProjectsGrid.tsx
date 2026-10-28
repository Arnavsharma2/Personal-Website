export default function ProjectsGrid() {
  return (
    <section id="projects" aria-label="Selected projects" className="project-list">
      <nav className="project-jump-links" aria-label="Jump to a project">
        <a className="text-link" href="#dynamo-diff">Dynamo Diff</a>
        <a className="text-link" href="#llm-serving-engine">LLM Serving Engine</a>
        <a className="text-link" href="#gatekeeper">GateKeeper</a>
        <a className="text-link" href="#streaming-lakehouse">Streaming Lakehouse</a>
        <a className="text-link" href="#psumenu">PSUMenu</a>
      </nav>
      <article id="dynamo-diff" className="project-entry" aria-labelledby="dynamo-diff-heading">
        <h2 id="dynamo-diff-heading" className="project-title">Dynamo Diff</h2>
        <p className="project-description">
          A published developer tool for comparing recorded PyTorch compiler runs
          and seeing what changed. Built with a Python analyzer, a command-line
          interface, tools for AI agents, and a TypeScript VS Code extension.
        </p>
        <p className="project-description">
          Recompilation reports can be difficult to connect to a code edit. I
          built comparisons that link compiler events to saved source and the
          original evidence, while keeping failures and uncertain matches
          visible. Saved captures can be inspected without PyTorch or a GPU.
        </p>
        <p className="project-description">
          <strong>Validated with 96 core tests and 12 recorded compiler scenarios,</strong>
          {' '}plus a Transformers generation case study.
        </p>
        <ul className="project-technologies" aria-label="Dynamo Diff technologies">
          <li>Python</li><li>TypeScript</li><li>PyTorch Dynamo</li><li>VS Code</li><li>MCP</li>
        </ul>
        <div className="project-links">
          <a
            href="https://github.com/Arnavsharma2/dynamo-diff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Source &amp; documentation ↗
          </a>
          <a
            href="https://pypi.org/project/dynamo-diff/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Python package ↗
          </a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=dynamo-diff.dynamo-diff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Install for VS Code ↗
          </a>
        </div>
      </article>
      <article id="llm-serving-engine" className="project-entry" aria-labelledby="llm-serving-engine-heading">
        <h2 id="llm-serving-engine-heading" className="project-title">LLM Serving Engine</h2>
        <p className="project-description">
          An experimental language-model server with its own decoder, request
          scheduler and GPU kernels. I used repeatable benchmarks to study the
          tradeoffs between memory use, batching and response time.
        </p>
        <p className="project-description">
          The engine runs Qwen models with a block-based memory cache and accepts
          new requests while a batch is running. The repository includes GPU
          benchmark records, correctness tests and a streaming API.
        </p>
        <ul className="project-technologies" aria-label="LLM Serving Engine technologies">
          <li>Python</li><li>PyTorch</li><li>Triton</li><li>FastAPI</li><li>Prometheus</li>
        </ul>
        <div className="project-links">
          <a href="https://github.com/Arnavsharma2/llm-serving-engine" target="_blank" rel="noopener noreferrer" className="text-link">
            Source &amp; documentation ↗
          </a>
        </div>
      </article>
      <article id="gatekeeper" className="project-entry" aria-labelledby="gatekeeper-heading">
        <h2 id="gatekeeper-heading" className="project-title">GateKeeper</h2>
        <p className="project-description">
          A Go API gateway with shared rate limits, caching and failure recovery
          across replicas, plus dashboards and repeatable load tests.
        </p>
        <p className="project-description">
          Redis coordinates request limits across servers. Retries handle
          temporary failures, while circuit breakers stop repeated requests to
          an unhealthy service. Separate tests cover these failure paths.
        </p>
        <ul className="project-technologies" aria-label="GateKeeper technologies">
          <li>Go</li><li>Redis</li><li>Docker</li><li>Prometheus</li><li>Grafana</li><li>k6</li>
        </ul>
        <div className="project-links">
          <a href="https://github.com/Arnavsharma2/Distributed-API-Gateway" target="_blank" rel="noopener noreferrer" className="text-link">
            Source &amp; documentation ↗
          </a>
        </div>
      </article>
      <article id="streaming-lakehouse" className="project-entry" aria-labelledby="streaming-lakehouse-heading">
        <h2 id="streaming-lakehouse-heading" className="project-title">Streaming Lakehouse</h2>
        <p className="project-description">
          A data pipeline that moves Postgres changes into queryable tables.
          Updates can be safely rerun, historical imports cannot overwrite newer
          data, and tests cover malformed or late records.
        </p>
        <p className="project-description">
          Kafka and Spark carry changes into Iceberg tables, then dbt and Trino
          make them available for analysis. Failure drills check that rerunning
          updates does not create duplicates or overwrite newer records.
        </p>
        <ul className="project-technologies" aria-label="Streaming Lakehouse technologies">
          <li>Python</li><li>SQL</li><li>Kafka</li><li>Spark</li><li>Iceberg</li><li>dbt</li><li>Trino</li>
        </ul>
        <div className="project-links">
          <a href="https://github.com/Arnavsharma2/streaming-lakehouse-pipeline" target="_blank" rel="noopener noreferrer" className="text-link">
            Source &amp; documentation ↗
          </a>
        </div>
      </article>
      <article id="psumenu" className="project-entry" aria-labelledby="psumenu-heading">
        <h2 id="psumenu-heading" className="project-title">PSUMenu</h2>
        <p className="project-description">
          A campus dining app used by <strong>1,500 monthly active Penn State
          students.</strong> It helps students find meals that fit their preferences
          using official dining menus and Gemini-powered recommendations.
        </p>
        <p className="project-description">
          I built a Python/Flask backend that gathers menus concurrently and
          caches results in SQLite. Recommendations are checked against the
          available menu, with a fallback when Gemini is unavailable.
        </p>
        <ul className="project-technologies" aria-label="PSUMenu technologies">
          <li>Python</li><li>Flask</li><li>Gemini</li><li>SQLite</li><li>Recommendations</li>
        </ul>
        <div className="project-links">
          <a href="https://github.com/Arnavsharma2/PSUMenuAnalyzerWebsite" target="_blank" rel="noopener noreferrer" className="text-link">
            Source &amp; documentation ↗
          </a>
        </div>
      </article>
    </section>
  )
}
