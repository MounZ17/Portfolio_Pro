import { asset } from "@/lib/content";
import { Hud, Shot, type StageProps } from "./shared";

/** A closed, wobbly contour line around a centre. */
function contour(cx: number, cy: number, r: number, k: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const rr = r * (1 + 0.13 * Math.sin(3 * a + k * 0.5) + 0.07 * Math.cos(5 * a - k * 0.3) + 0.04 * Math.sin(7 * a + k));
    pts.push(`${(cx + Math.cos(a) * rr * 1.25).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

/** Cartography: a topographic sheet with contour lines, compass, scale and legend. */
export function Cartography({ project }: StageProps) {
  const { line, accent, ink, muted } = project.theme;
  const media = project.media[0];
  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke={line}>
          {Array.from({ length: 9 }, (_, k) => (
            <path key={`a${k}`} d={contour(180, 140, 24 + k * 26, k)} strokeWidth={k % 4 === 0 ? 1.6 : 0.9} />
          ))}
          {Array.from({ length: 8 }, (_, k) => (
            <path key={`b${k}`} d={contour(650, 380, 20 + k * 24, k + 3)} strokeWidth={k % 4 === 0 ? 1.6 : 0.9} />
          ))}
        </g>
        {/* Graticule ticks */}
        <g stroke={muted} strokeOpacity="0.5">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`t${i}`} x1={80 + i * 80} y1="0" x2={80 + i * 80} y2="8" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`l${i}`} x1="0" y1={80 + i * 80} x2="8" y2={80 + i * 80} />
          ))}
        </g>
        {/* Compass */}
        <g transform="translate(730 80)">
          <circle r="26" fill="none" stroke={muted} strokeOpacity="0.6" />
          <path d="M0 -34 L7 0 L0 6 L-7 0 Z" fill={accent} />
          <path d="M0 34 L7 0 L0 -6 L-7 0 Z" fill={ink} fillOpacity="0.35" />
          <text y="-40" textAnchor="middle" fill={ink} fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
            N
          </text>
        </g>
        {/* Scale bar */}
        <g transform="translate(40 450)" fontFamily="var(--font-mono)" fontSize="9" fill={ink}>
          <rect width="40" height="6" fill={ink} />
          <rect x="40" width="40" height="6" fill="none" stroke={ink} />
          <rect x="80" width="40" height="6" fill={ink} />
          <text y="20">0</text>
          <text x="112" y="20">150 m</text>
        </g>
        {/* Legend */}
        <g transform="translate(610 150)" fontFamily="var(--font-mono)" fontSize="9" fill={ink}>
          <rect width="150" height="78" fill="#fffdf6" fillOpacity="0.85" stroke={muted} strokeOpacity="0.5" />
          <text x="10" y="16" fontWeight="600">
            LEGEND
          </text>
          <rect x="10" y="26" width="10" height="10" fill={accent} />
          <text x="26" y="35">Occupied room</text>
          <rect x="10" y="42" width="10" height="10" fill="#7fa77a" />
          <text x="26" y="51">Free room</text>
          <path d="M10 64 H20" stroke={line} strokeWidth="2" />
          <text x="26" y="67">Contour</text>
        </g>
      </svg>
      {media && (
        <figure className="map__sheet">
          <span className="map__pin" aria-hidden="true" />
          <Shot src={asset(media.src)} alt="" />
          <figcaption>USTHB · Bab Ezzouar</figcaption>
        </figure>
      )}
      <Hud tl="GeoJSON → D3.js" br="36.71° N · 3.18° E" />
    </>
  );
}
