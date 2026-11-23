import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { themeVars } from "@/components/stages/Stage";
import { asset, education, experience, expertise, getProject, profile, projects } from "@/lib/content";

export default function Home() {
  const [featured, ...rest] = projects;
  return (
    <>
      <section className="hero container">
        <div className="hero__text">
          <p className="hero__where">
            {profile.role}, based in {profile.location}
          </p>
          <h1 className="hero__title">
            I train computer-vision models, then build the software that <em>puts them to use.</em>
          </h1>
          <p className="hero__lede">
            I work at Algérie Poste headquarters, building prototypes for compliance, customer flow and access control.
            Before that I did deep learning research at the Algerian Space Agency, and I also build full-stack products
            like MedBoard.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--dark" href="/#work">
              See my work
            </Link>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              Email me
            </a>
          </div>
        </div>

        <aside className="facts" aria-label="At a glance">
          <dl>
            <div>
              <dt>Now</dt>
              <dd>
                AI & Software Engineer
                <small>Algérie Poste, Headquarters</small>
              </dd>
            </div>
            <div>
              <dt>Before</dt>
              <dd>
                Deep Learning Intern
                <small>Algerian Space Agency (ASAL)</small>
              </dd>
            </div>
            <div>
              <dt>Studied</dt>
              <dd>
                M.Sc. Computer Science
                <small>Visual Computing, USTHB</small>
              </dd>
            </div>
          </dl>
          <div className="facts__index">
            <p className="facts__label">Projects</p>
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

      <section id="work" className="section container" aria-labelledby="work-title">
        <header className="section__head">
          <h2 id="work-title">Selected work</h2>
          <p className="section__lede">
            Some of it research, some of it production. Each project is drawn in the setting it was built for, from
            satellite imagery to radar scopes. Open one to read about the problem, what I did and how it turned out.
          </p>
        </header>
        <div className="grid">
          <ProjectCard project={featured} index={0} wide />
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
      </section>

      <section id="experience" className="section container" aria-labelledby="xp-title">
        <header className="section__head">
          <h2 id="xp-title">Experience</h2>
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
                    {r.title} <span className="timeline__org">at {r.org}</span>
                  </h3>
                  <ul>
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  {linked && (
                    <Link className="inline-link" href={`/work/${linked.slug}/`} style={themeVars(linked)}>
                      <span className="swatch" aria-hidden="true" /> Read the {linked.title} case study
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
                  {e.degree} <span className="timeline__org">at {e.school}</span>
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="expertise" className="section container" aria-labelledby="skills-title">
        <header className="section__head">
          <h2 id="skills-title">What I work with</h2>
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
        <p className="skills__soft">
          Away from the keyboard, I mentor interns on their final-year projects and helped organise the InnovPost
          Hackathon.
        </p>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="container contact__inner">
          <div>
            <h2 id="contact-title">Get in touch</h2>
            <p>
              Email is the best way to reach me. I&apos;m always happy to talk about AI engineering, computer vision or
              full-stack product work.
            </p>
          </div>
          <div className="contact__actions">
            <a className="btn btn--light" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact__row">
              <a className="btn btn--outline-light" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="btn btn--outline-light" href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="btn btn--outline-light" href={asset(profile.cv)} download>
                Résumé (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
