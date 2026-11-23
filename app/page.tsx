import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { themeVars } from "@/components/stages/Stage";
import { asset, education, experience, expertise, getProject, profile, projects } from "@/lib/content";

export default function Home() {
  const [featured, ...rest] = projects;
  return (
    <>
      {/* ——— Intro ——— */}
      <section className="hero container">
        <div className="hero__text">
          <p className="eyebrow">
            <span className="status" aria-hidden="true" /> {profile.role} · {profile.location}
          </p>
          <h1 className="hero__title">
            I build computer-vision models <span className="dim">and the production software around them.</span>
          </h1>
          <p className="hero__lede">
            AI engineer at Algérie Poste headquarters, delivering prototypes for compliance, customer flow and access
            control. Background in deep learning research at the Algerian Space Agency and full-stack product
            development.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--dark" href="/#work">
              View selected work
            </Link>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </div>
        </div>

        <aside className="facts" aria-label="At a glance">
          <dl>
            <div>
              <dt>Current</dt>
              <dd>
                AI & Software Engineer
                <small>Algérie Poste — Headquarters</small>
              </dd>
            </div>
            <div>
              <dt>Previously</dt>
              <dd>
                Deep Learning Intern
                <small>Algerian Space Agency (ASAL)</small>
              </dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                M.Sc. Computer Science
                <small>Visual Computing · USTHB</small>
              </dd>
            </div>
          </dl>
          <div className="facts__index">
            <p className="facts__label">
              {projects.length} projects · {projects.length} environments
            </p>
            <ul>
              {projects.map((p) => (
                <li key={p.slug} style={themeVars(p)}>
                  <Link href={`/work/${p.slug}/`}>
                    <span className="swatch swatch--lg" aria-hidden="true" />
                    <span>{p.title}</span>
                    <span className="facts__kind">{p.theme.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* ——— Work ——— */}
      <section id="work" className="section container" aria-labelledby="work-title">
        <header className="section__head">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Each project, in its own environment.</h2>
          <p className="section__lede">
            Satellite imagery, clinical software, radar scopes, engineering drawings — every case study is framed by the
            world it was built for. Open one for the problem, the approach and the results.
          </p>
        </header>
        <div className="grid">
          <ProjectCard project={featured} index={0} wide />
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* ——— Experience ——— */}
      <section id="experience" className="section container" aria-labelledby="xp-title">
        <header className="section__head">
          <p className="eyebrow">Experience</p>
          <h2 id="xp-title">Where I&apos;ve worked.</h2>
        </header>
        <ol className="timeline">
          {experience.map((r) => {
            const linked = r.project ? getProject(r.project) : undefined;
            return (
              <li key={r.org} className="timeline__item">
                <div className="timeline__when">
                  <span>{r.period}</span>
                  <small>{r.location}</small>
                </div>
                <div className="timeline__what">
                  <h3>
                    {r.title} <span className="timeline__org">· {r.org}</span>
                  </h3>
                  <ul>
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  {linked && (
                    <Link className="inline-link" href={`/work/${linked.slug}/`} style={themeVars(linked)}>
                      <span className="swatch" aria-hidden="true" /> Case study: {linked.title} →
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
          {education.map((e) => (
            <li key={e.degree} className="timeline__item timeline__item--edu">
              <div className="timeline__when">
                <span>{e.period}</span>
                <small>Education</small>
              </div>
              <div className="timeline__what">
                <h3>
                  {e.degree} <span className="timeline__org">· {e.school}</span>
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ——— Expertise ——— */}
      <section id="expertise" className="section container" aria-labelledby="skills-title">
        <header className="section__head">
          <p className="eyebrow">Expertise</p>
          <h2 id="skills-title">From model to production.</h2>
        </header>
        <div className="skills">
          {expertise.map((g) => (
            <div key={g.area} className="skills__group">
              <h3>{g.area}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="skills__soft">Also: leadership, mentoring interns, hackathon organisation, technical communication.</p>
      </section>

      {/* ——— Contact ——— */}
      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="container contact__inner">
          <div>
            <p className="eyebrow eyebrow--light">Contact</p>
            <h2 id="contact-title">Have a role or a project in mind?</h2>
            <p>I&apos;m happy to talk about AI engineering, computer vision and full-stack product work.</p>
          </div>
          <div className="contact__actions">
            <a className="btn btn--light" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact__row">
              <a className="btn btn--outline-light" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a className="btn btn--outline-light" href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a className="btn btn--outline-light" href={asset(profile.cv)} download>
                Résumé ↓
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
