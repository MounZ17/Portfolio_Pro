import Link from "next/link";
import { asset, profile } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand__mark" aria-hidden="true">
            MC
          </span>
          <span className="brand__name">{profile.name}</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#expertise">Expertise</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <ThemeToggle />
        <a className="btn btn--sm btn--dark" href={asset(profile.cv)} download>
          Résumé <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  );
}
