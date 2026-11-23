import { Hud, rng, type StageProps } from "./shared";

/** An irregular ring, like a mucosal fold seen down the tract. */
function fold(cx: number, cy: number, r: number, k: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const rr = r * (1 + 0.1 * Math.sin(4 * a + k) + 0.06 * Math.cos(7 * a - k * 0.7));
    pts.push(`${(cx + Math.cos(a) * rr * 1.08).toFixed(1)} ${(cy + Math.sin(a) * rr * 0.92).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

/** Medical imaging: a capsule-endoscopy viewport with a segmented lesion and its fitted ellipse. */
export function Endoscopy({ project, uid }: StageProps) {
  const { line, accent, muted } = project.theme;
  const r = rng(7);
  const scatter = Array.from({ length: 70 }, () => {
    const lesion = r() < 0.3;
    return {
      x: lesion ? 70 + r() * 40 : 18 + r() * 60,
      y: lesion ? 18 + r() * 34 : 46 + r() * 50,
      lesion,
    };
  });

  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}-tissue`} cx="35%" cy="58%" r="70%">
            <stop offset="0" stopColor="#1a0308" />
            <stop offset="0.12" stopColor="#4a0f1c" />
            <stop offset="0.35" stopColor="#a63a4e" />
            <stop offset="0.7" stopColor="#e27f86" />
            <stop offset="1" stopColor="#f6b8a8" />
          </radialGradient>
          <radialGradient id={`${uid}-vignette`} cx="50%" cy="50%" r="50%">
            <stop offset="0.72" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.85" />
          </radialGradient>
          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <clipPath id={`${uid}-lens`}>
            <circle cx="330" cy="250" r="200" />
          </clipPath>
        </defs>

        {/* Dial ring */}
        <g stroke={muted} strokeOpacity="0.5">
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const r1 = 214;
            const r2 = i % 6 === 0 ? 226 : 219;
            return (
              <line
                key={i}
                x1={(330 + Math.cos(a) * r1).toFixed(1)}
                y1={(250 + Math.sin(a) * r1).toFixed(1)}
                x2={(330 + Math.cos(a) * r2).toFixed(1)}
                y2={(250 + Math.sin(a) * r2).toFixed(1)}
              />
            );
          })}
        </g>

        <g clipPath={`url(#${uid}-lens)`}>
          <rect x="120" y="40" width="420" height="420" fill={`url(#${uid}-tissue)`} />
          {/* Haustral folds, ringing the lumen */}
          {[46, 92, 140, 196, 260].map((r, k) => {
            const d = fold(260, 292, r, k);
            return (
              <g key={r} filter={`url(#${uid}-soft)`} fill="none">
                <path d={d} stroke="#2a0610" strokeOpacity="0.45" strokeWidth={6 + k * 3} transform="translate(0 6)" />
                <path d={d} stroke="#ffd6cf" strokeOpacity={0.22 + k * 0.05} strokeWidth={3 + k * 1.5} />
              </g>
            );
          })}
          {/* Lesion */}
          <path
            d="M392 196 C410 176 446 178 458 196 C474 214 470 240 452 252 C436 264 404 262 392 246 C380 232 378 212 392 196 Z"
            fill="#f2c46b"
            fillOpacity="0.85"
          />
          <path
            d="M392 196 C410 176 446 178 458 196 C474 214 470 240 452 252 C436 264 404 262 392 246 C380 232 378 212 392 196 Z"
            fill="none"
            stroke={line}
            strokeWidth="2"
            strokeDasharray="5 4"
            className="ants"
          />
          {/* Fitted ellipse + axes (the geometric descriptors) */}
          <g transform="rotate(-18 425 222)" stroke={line} fill="none">
            <ellipse cx="425" cy="222" rx="50" ry="36" strokeOpacity="0.8" />
            <line x1="365" y1="222" x2="485" y2="222" strokeOpacity="0.9" />
            <line x1="425" y1="178" x2="425" y2="266" strokeOpacity="0.9" />
          </g>
          {/* Specular highlights */}
          <ellipse cx="270" cy="200" rx="14" ry="6" fill="#fff" fillOpacity="0.55" transform="rotate(-30 270 200)" />
          <ellipse cx="300" cy="350" rx="8" ry="3" fill="#fff" fillOpacity="0.45" />
          <rect x="120" y="40" width="420" height="420" fill={`url(#${uid}-vignette)`} />
        </g>
        <circle cx="330" cy="250" r="200" fill="none" stroke={muted} strokeOpacity="0.6" />

        {/* Leader + label */}
        <path d="M470 196 L560 140 H600" fill="none" stroke={line} />
        <text x="604" y="137" fill={line} fontFamily="var(--font-mono)" fontSize="11">
          ROI 01 · lesion
        </text>
        <text x="604" y="152" fill={muted} fontFamily="var(--font-mono)" fontSize="9">
          area · axes · θ · ecc.
        </text>

        {/* a-star / b-star chrominance plot */}
        <g transform="translate(590 250)">
          <rect width="150" height="120" fill="none" stroke={muted} strokeOpacity="0.5" />
          {scatter.map((d, i) => (
            <circle key={i} cx={(d.x * 1.3).toFixed(1)} cy={(d.y * 1.1).toFixed(1)} r="2" fill={d.lesion ? accent : muted} fillOpacity={d.lesion ? 0.95 : 0.6} />
          ))}
          <line x1="78" y1="0" x2="78" y2="120" stroke={line} strokeDasharray="3 3" />
          <text x="0" y="136" fill={muted} fontFamily="var(--font-mono)" fontSize="9">
            a* →
          </text>
          <text x="84" y="12" fill={line} fontFamily="var(--font-mono)" fontSize="9">
            threshold
          </text>
          <text x="-14" y="10" fill={muted} fontFamily="var(--font-mono)" fontSize="9">
            b*
          </text>
        </g>
      </svg>
      <Hud tl="WCE · capsule frame" tr="CIELAB · a/b fusion" bl="Top-hat · bottom-hat · median" br="Sharif et al., 2019" />
    </>
  );
}
