import { Hud, type StageProps } from "./shared";

const flights = [
  { x: 520, y: 150, call: "DAH1042", fl: "FL320", hdg: 225 },
  { x: 300, y: 330, call: "DAH2207", fl: "FL280", hdg: 60 },
  { x: 470, y: 360, call: "AFR315", fl: "FL350", hdg: 320 },
  { x: 330, y: 160, call: "TAR704", fl: "FL240", hdg: 140 },
];

/** Air traffic control: a radar scope with tracked flights, and the RMI calls behind them. */
export function Radar({ project }: StageProps) {
  const { line, accent, muted } = project.theme;
  const cx = 420;
  const cy = 250;
  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke={line}>
          {[60, 120, 180, 240].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} strokeOpacity="0.28" />
          ))}
          <line x1={cx - 250} y1={cy} x2={cx + 250} y2={cy} strokeOpacity="0.2" />
          <line x1={cx} y1={cy - 250} x2={cx} y2={cy + 250} strokeOpacity="0.2" />
          {Array.from({ length: 36 }, (_, i) => {
            const a = (i / 36) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={(cx + Math.cos(a) * 240).toFixed(1)}
                y1={(cy + Math.sin(a) * 240).toFixed(1)}
                x2={(cx + Math.cos(a) * (i % 3 === 0 ? 228 : 234)).toFixed(1)}
                y2={(cy + Math.sin(a) * (i % 3 === 0 ? 228 : 234)).toFixed(1)}
                strokeOpacity="0.5"
              />
            );
          })}
        </g>
        <g fill={muted} fontFamily="var(--font-mono)" fontSize="9">
          {[20, 40, 60, 80].map((nm, i) => (
            <text key={nm} x={cx + 4} y={cy - 60 * (i + 1) + 12}>
              {nm}NM
            </text>
          ))}
        </g>
        {flights.map((f) => {
          const a = ((f.hdg - 90) * Math.PI) / 180;
          return (
            <g key={f.call}>
              {/* Trail */}
              {[1, 2, 3].map((k) => (
                <rect
                  key={k}
                  x={(f.x - Math.cos(a) * 9 * k - 1.5).toFixed(1)}
                  y={(f.y - Math.sin(a) * 9 * k - 1.5).toFixed(1)}
                  width="3"
                  height="3"
                  fill={line}
                  fillOpacity={0.5 - k * 0.12}
                />
              ))}
              <rect x={f.x - 4} y={f.y - 4} width="8" height="8" fill="none" stroke={accent} strokeWidth="1.5" />
              <line x1={f.x} y1={f.y} x2={(f.x + Math.cos(a) * 22).toFixed(1)} y2={(f.y + Math.sin(a) * 22).toFixed(1)} stroke={accent} />
              <line x1={f.x + 5} y1={f.y - 5} x2={f.x + 18} y2={f.y - 18} stroke={line} strokeOpacity="0.6" />
              <text x={f.x + 20} y={f.y - 26} fill={accent} fontFamily="var(--font-mono)" fontSize="10">
                {f.call}
              </text>
              <text x={f.x + 20} y={f.y - 14} fill={line} fontFamily="var(--font-mono)" fontSize="9">
                {f.fl} · {String(f.hdg).padStart(3, "0")}°
              </text>
            </g>
          );
        })}
      </svg>
      <div className="radar__sweep" aria-hidden="true" style={{ left: `${(cx / 800) * 100}%` }} />
      <pre className="radar__log" aria-hidden="true">
        {`> Naming.lookup("rmi://atc/Airspace")
< AirspaceServer@stub  connected
> airspace.assign("DAH1042", FL320)
< OK  · 4 flights tracked`}
        <span className="cursor">▍</span>
      </pre>
      <Hud tl="ATC · Sector ALG-1" tr="Java RMI · N clients : 1 server" />
    </>
  );
}
