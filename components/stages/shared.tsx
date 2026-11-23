import type { Project } from "@/lib/content";

export type StageSize = "card" | "hero";

export interface StageProps {
  project: Project;
  size: StageSize;
  /** Unique per rendered instance (SVG ids must not collide on a page). */
  uid: string;
}

/** Small deterministic PRNG so generated art is identical on server and client. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Monospace labels pinned to the corners of a stage. */
export function Hud({ tl, tr, bl, br }: { tl?: React.ReactNode; tr?: React.ReactNode; bl?: React.ReactNode; br?: React.ReactNode }) {
  return (
    <div className="hud" aria-hidden="true">
      {tl && <span className="hud__tl">{tl}</span>}
      {tr && <span className="hud__tr">{tr}</span>}
      {bl && <span className="hud__bl">{bl}</span>}
      {br && <span className="hud__br">{br}</span>}
    </div>
  );
}

/** A screenshot inside the stage; decorative in cards, described on the case-study page. */
export function Shot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; images are small and pre-sized
    <img className={className} src={src} alt={alt} loading="lazy" decoding="async" draggable={false} />
  );
}
