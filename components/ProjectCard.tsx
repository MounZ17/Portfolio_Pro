import Link from "next/link";
import type { Project } from "@/lib/content";
import { Stage, themeVars } from "./stages/Stage";

export function ProjectCard({ project, index, wide }: { project: Project; index: number; wide?: boolean }) {
  return (
    <article className={`card${wide ? " card--wide" : ""}`} style={themeVars(project)}>
      <Link href={`/work/${project.slug}/`} className="card__link" aria-label={`${project.title} — read the case study`}>
        <Stage project={project} size="card" className="card__stage" />
        <div className="card__body">
          <p className="card__meta">
            <span className="card__no">{String(index + 1).padStart(2, "0")}</span>
            <span className="swatch" aria-hidden="true" />
            {project.theme.label}
            {project.year && <span className="card__year">{project.year}</span>}
          </p>
          <h3 className="card__title">{project.title}</h3>
          <p className="card__context">{project.context}</p>
          <p className="card__summary">{project.summary}</p>
          {wide && (
            <dl className="card__metrics">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <ul className="tags">
            {project.stack.slice(0, wide ? 6 : 4).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <span className="card__cta">
            Read case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
