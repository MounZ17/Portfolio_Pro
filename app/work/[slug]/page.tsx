import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stage, themeVars } from "@/components/stages/Stage";
import { asset, getProject, projects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const t = project.theme;

  return (
    <article className={`case${t.dark ? " case--dark" : ""}`} style={themeVars(project)}>
      {/* Themed environment wraps the whole header */}
      <header className={`case__hero case__hero--${t.kind}`}>
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/#work">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <div className="case__intro">
            <div>
              <p className="case__kind">
                <span className="swatch" aria-hidden="true" /> {t.label} · {project.domain}
              </p>
              <h1>{project.title}</h1>
              <p className="case__summary">{project.summary}</p>
            </div>
            <dl className="case__facts">
              <div>
                <dt>Context</dt>
                <dd>{project.context}</dd>
              </div>
              {project.year && (
                <div>
                  <dt>Timeline</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{project.team}</dd>
              </div>
            </dl>
          </div>
          <Stage project={project} size="hero" className="case__stage" />
        </div>
      </header>

      <div className="container case__body">
        <dl className="metrics">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt>{m.value}</dt>
              <dd>{m.label}</dd>
            </div>
          ))}
        </dl>

        <div className="case__cols">
          <div className="prose">
            <section aria-labelledby="challenge">
              <h2 id="challenge">
                <span className="step">01</span> The challenge
              </h2>
              <p>{project.challenge}</p>
            </section>
            <section aria-labelledby="approach">
              <h2 id="approach">
                <span className="step">02</span> Approach
              </h2>
              <ol className="approach">
                {project.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </section>
            <section aria-labelledby="outcome">
              <h2 id="outcome">
                <span className="step">03</span> Outcome
              </h2>
              <p className="outcome">{project.outcome}</p>
            </section>
          </div>

          <aside className="case__side">
            <section aria-labelledby="highlights">
              <h2 id="highlights">Highlights</h2>
              <ul className="checks">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="stack">
              <h2 id="stack">Technology</h2>
              <ul className="tags">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="links">
              <h2 id="links">Resources</h2>
              {project.links.length > 0 ? (
                <ul className="links">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">The code is private, but I can walk you through it on request.</p>
              )}
            </section>
          </aside>
        </div>

        {project.media.length > 0 && (
          <section className="gallery" aria-labelledby="gallery">
            <h2 id="gallery">Gallery</h2>
            <div className="gallery__grid">
              {project.media.map((m) => (
                <figure key={m.src} className={m.wide ? "is-wide" : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                  <img src={asset(m.src)} alt={m.alt} loading="lazy" />
                  <figcaption>{m.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>

      <nav className="pager container" aria-label="More projects">
        {[
          { p: prev, dir: "← Previous" },
          { p: next, dir: "Next →" },
        ].map(({ p, dir }) => (
          <Link key={dir} href={`/work/${p.slug}/`} className="pager__item" style={themeVars(p)}>
            <Stage project={p} size="card" className="pager__stage" />
            <span className="pager__dir">{dir}</span>
            <span className="pager__title">{p.title}</span>
            <span className="pager__kind">{p.theme.label}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
