import { asset } from "@/lib/content";
import { Hud, rng, Shot, type StageProps } from "./shared";

/** Multi-view geometry: an engineering drawing with two cameras triangulating a point cloud. */
export function Blueprint({ project, uid }: StageProps) {
  const { line, accent } = project.theme;
  const media = project.media[0];
  const r = rng(3);
  // A lumpy blob of points, roughly a figurine seen from the front.
  const cloud = Array.from({ length: 170 }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const lump = 1 + 0.25 * Math.sin(a * 3) + 0.12 * Math.cos(a * 5);
    return { x: 400 + Math.cos(a) * d * 95 * lump, y: 128 + Math.sin(a) * d * 62 * lump };
  });
  const c1 = { x: 110, y: 250 };
  const c2 = { x: 690, y: 250 };
  const targets = [cloud[3], cloud[17], cloud[40], cloud[88], cloud[120]];

  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`${uid}-fine`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke={line} strokeOpacity="0.1" />
          </pattern>
          <pattern id={`${uid}-coarse`} width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M100 0H0V100" fill="none" stroke={line} strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#${uid}-fine)`} />
        <rect width="800" height="500" fill={`url(#${uid}-coarse)`} />
        <rect x="14" y="14" width="772" height="472" fill="none" stroke={line} strokeOpacity="0.5" />

        {/* Rays from both cameras to a few points */}
        <g stroke={accent} strokeOpacity="0.5" strokeWidth="0.8">
          {targets.map((t, i) => (
            <g key={i}>
              <line x1={c1.x} y1={c1.y} x2={t.x.toFixed(1)} y2={t.y.toFixed(1)} />
              <line x1={c2.x} y1={c2.y} x2={t.x.toFixed(1)} y2={t.y.toFixed(1)} />
            </g>
          ))}
        </g>
        {/* Baseline */}
        <line x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} stroke={line} strokeDasharray="6 5" strokeOpacity="0.7" />
        <text x="400" y="242" textAnchor="middle" fill={line} fontFamily="var(--font-mono)" fontSize="10">
          baseline · E = [t]ₓR
        </text>

        {/* Point cloud */}
        <g fill={line}>
          {cloud.map((p, i) => (
            <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={i % 9 === 0 ? 2.2 : 1.3} fillOpacity={0.55 + (i % 5) * 0.09} />
          ))}
        </g>
        {targets.map((t, i) => (
          <circle key={i} cx={t.x.toFixed(1)} cy={t.y.toFixed(1)} r="3.5" fill="none" stroke={accent} />
        ))}

        {/* Camera frustums */}
        {[
          { c: c1, rot: -35, label: "C₁" },
          { c: c2, rot: 35, label: "C₂" },
        ].map(({ c, rot, label }) => (
          <g key={label} transform={`translate(${c.x} ${c.y}) rotate(${rot})`} fill="none" stroke={line} strokeWidth="1.4">
            <path d="M0 0 L-26 -46 L26 -46 Z" fill={line} fillOpacity="0.08" />
            <rect x="-14" y="0" width="28" height="18" fill={line} fillOpacity="0.15" />
            <text x="0" y="36" textAnchor="middle" stroke="none" fill={line} fontFamily="var(--font-mono)" fontSize="12">
              {label}
            </text>
          </g>
        ))}

        {/* Title block */}
        <g transform="translate(586 418)" fontFamily="var(--font-mono)" fontSize="9" fill={line}>
          <rect width="200" height="68" fill="none" stroke={line} strokeOpacity="0.6" />
          <line x1="0" y1="24" x2="200" y2="24" stroke={line} strokeOpacity="0.6" />
          <line x1="110" y1="24" x2="110" y2="68" stroke={line} strokeOpacity="0.6" />
          <text x="8" y="16">TWO-VIEW TRIANGULATION</text>
          <text x="8" y="40">DWG 3D-REC-01</text>
          <text x="8" y="56">SCALE 1:1</text>
          <text x="118" y="40">SHEET 1 / 1</text>
          <text x="118" y="56" fill={accent}>
            SIFT · RATIO TEST
          </text>
        </g>
      </svg>
      {media && (
        <figure className="blueprint__print">
          <Shot src={asset(media.src)} alt="" />
          <figcaption>FIG. 1: SIFT correspondences, view 1 ↔ view 2</figcaption>
        </figure>
      )}
      <Hud tl="K · intrinsics calibrated" tr="P = K [R | t]" />
    </>
  );
}
