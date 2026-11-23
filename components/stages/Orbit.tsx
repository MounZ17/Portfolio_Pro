import { asset } from "@/lib/content";
import { Hud, Shot, type StageProps } from "./shared";

/** Earth observation: satellite HUD, orbit track, coordinate grid and a scanning line. */
export function Orbit({ project, uid }: StageProps) {
  const { line, accent } = project.theme;
  const media = project.media[0];
  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke={line} strokeOpacity="0.1" />
          </pattern>
          <radialGradient id={`${uid}-limb`} cx="50%" cy="100%" r="75%">
            <stop offset="0" stopColor={line} stopOpacity="0.28" />
            <stop offset="1" stopColor={line} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill={`url(#${uid}-grid)`} />
        <rect width="800" height="500" fill={`url(#${uid}-limb)`} />
        {/* Earth limb */}
        <circle cx="400" cy="1320" r="950" fill={line} fillOpacity="0.05" stroke={line} strokeOpacity="0.45" />
        <circle cx="400" cy="1320" r="975" fill="none" stroke={line} strokeOpacity="0.15" />
        {/* Orbit track */}
        <ellipse cx="400" cy="250" rx="560" ry="140" transform="rotate(-10 400 250)" fill="none" stroke={accent} strokeOpacity="0.55" strokeDasharray="2 7" />
        <g transform="translate(676 132) rotate(-10)" fill="none" stroke={accent} strokeWidth="1.5">
          <rect x="-6" y="-6" width="12" height="12" fill={accent} fillOpacity="0.2" />
          <rect x="-30" y="-4" width="20" height="8" />
          <rect x="10" y="-4" width="20" height="8" />
          <path d="M0 6V16M-5 16H5" />
        </g>
        {/* Swath from the satellite down to the frame */}
        <path d="M676 140 L520 175 L560 330 Z" fill={accent} fillOpacity="0.06" />
        {/* Coordinate ticks */}
        <g fill={line} fillOpacity="0.55" fontFamily="var(--font-mono)" fontSize="9">
          {[80, 160, 240, 320, 400].map((y, i) => (
            <text key={y} x="10" y={y + 3}>
              {(36.74 - i * 0.01).toFixed(2)}°N
            </text>
          ))}
          {[120, 280, 440, 600].map((x, i) => (
            <text key={x} x={x - 14} y="492">
              {(3.15 + i * 0.02).toFixed(2)}°E
            </text>
          ))}
        </g>
      </svg>
      <div className="stage__scan" aria-hidden="true" />
      {media && (
        <figure className="orbit__frame">
          <span className="orbit__tag orbit__tag--a">T₂ image</span>
          <span className="orbit__tag orbit__tag--b">Δ change mask</span>
          <Shot src={asset(media.src)} alt="" />
          <i className="reticle" aria-hidden="true" />
        </figure>
      )}
      <Hud tl="EO-01 · SYSU-CD" tr="36.7125° N · 3.1811° E" bl="GSD 0.5 m/px" br={<b>F1 93.7%</b>} />
    </>
  );
}
