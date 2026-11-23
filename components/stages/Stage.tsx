import type { Project, ThemeKind } from "@/lib/content";
import { Blueprint } from "./Blueprint";
import { Cartography } from "./Cartography";
import { Clinic } from "./Clinic";
import { Endoscopy } from "./Endoscopy";
import { Network } from "./Network";
import { Orbit } from "./Orbit";
import { Radar } from "./Radar";
import type { StageProps, StageSize } from "./shared";

const scenes: Record<ThemeKind, (p: StageProps) => React.ReactNode> = {
  clinic: Clinic,
  orbit: Orbit,
  endoscopy: Endoscopy,
  blueprint: Blueprint,
  radar: Radar,
  cartography: Cartography,
  network: Network,
};

/** Inline CSS variables that carry a project's theme into everything inside it. */
export function themeVars(project: Project) {
  const t = project.theme;
  return {
    "--t-bg": t.bg,
    "--t-ink": t.ink,
    "--t-muted": t.muted,
    "--t-accent": t.accent,
    "--t-line": t.line,
    "--t-tone": t.tone,
    "--t-tone-dark": t.toneDark,
  } as React.CSSProperties;
}

/** The themed environment a project lives in. */
export function Stage({ project, size, className }: { project: Project; size: StageSize; className?: string }) {
  const Scene = scenes[project.theme.kind];
  return (
    <div
      className={`stage stage--${size} stage--${project.theme.kind}${project.theme.dark ? " stage--dark" : ""}${className ? ` ${className}` : ""}`}
      style={themeVars(project)}
    >
      <Scene project={project} size={size} uid={`${project.slug}-${size}`} />
    </div>
  );
}
