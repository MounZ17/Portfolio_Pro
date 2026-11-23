import { asset } from "@/lib/content";
import { Hud, Shot, type StageProps } from "./shared";

/** Clinical SaaS: ECG paper, a live trace, and two clinics' workspaces on separate tenant schemas. */
export function Clinic({ project, uid }: StageProps) {
  const { line } = project.theme;
  const [front, back] = [project.media[1], project.media[0]];
  // One heartbeat, repeated across the width.
  const beat = "h34 l6 -6 l6 6 h10 l4 10 l8 -62 l8 74 l6 -22 h12 l10 -10 l10 10 h40";
  const trace = `M0 96 ${Array.from({ length: 6 }, () => beat).join(" ")}`;

  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`${uid}-minor`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" fill="none" stroke={line} strokeOpacity="0.07" />
          </pattern>
          <pattern id={`${uid}-major`} width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0H0V50" fill="none" stroke={line} strokeOpacity="0.14" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#${uid}-minor)`} />
        <rect width="800" height="500" fill={`url(#${uid}-major)`} />
        <path d={trace} fill="none" stroke={line} strokeOpacity="0.18" strokeWidth="2" strokeLinejoin="round" />
        <path d={trace} fill="none" stroke={line} strokeWidth="2.2" strokeLinejoin="round" className="ecg" pathLength={1} />
      </svg>

      {back && (
        <div className="window window--back">
          <div className="window__bar">
            <i />
            <i />
            <i />
            <span>cabinet-b.medboard.app</span>
          </div>
          <Shot src={asset(back.src)} alt="" />
          <span className="tenant">schema · cabinet_b</span>
        </div>
      )}
      {front && (
        <div className="window window--front">
          <div className="window__bar">
            <i />
            <i />
            <i />
            <span>cabinet-a.medboard.app</span>
          </div>
          <Shot src={asset(front.src)} alt="" />
          <span className="tenant">schema · cabinet_a</span>
        </div>
      )}
      <Hud tl="Multi-tenant · 1 schema per clinic" br="TLS · nginx · Docker" />
    </>
  );
}
