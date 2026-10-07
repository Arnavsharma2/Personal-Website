export default function ProjectsGrid() {
  return (
    <section id="projects" aria-label="Dynamo Diff" className="project-list">
      <article className="project-entry">
        <h2 className="project-title">Compiler changes, with the evidence.</h2>
        <p className="project-description">
          Compare two recorded PyTorch Dynamo runs and inspect the compiler evidence
          behind the difference. A local Python analyzer powers a command-line tool,
          an MCP server, and a VS Code extension.
        </p>
        <p className="project-description">
          Follow recompilations, graph breaks, and recorded guard reasons back to
          captured source and immutable artifacts. Saved captures can be inspected
          without PyTorch or a GPU.
        </p>
        <p className="project-technologies">Python · PyTorch Dynamo · CLI · MCP · VS Code</p>
        <div className="project-links">
          <a
            href="https://github.com/Arnavsharma2/dynamo-diff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            GitHub ↗
          </a>
          <a
            href="https://pypi.org/project/dynamo-diff/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            PyPI ↗
          </a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=dynamo-diff.dynamo-diff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            VS Code Marketplace ↗
          </a>
        </div>
      </article>
    </section>
  )
}
