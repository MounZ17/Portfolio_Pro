import { asset } from "@/lib/content";
import { Hud, Shot, type StageProps } from "./shared";

const faculties = ["Computer Science", "Mathematics", "Physics", "Biology", "Chemistry", "Electronics"];

/** Social platform: the university as a graph (faculties, sections, groups) around the product. */
export function Network({ project }: StageProps) {
  const { line, accent, ink } = project.theme;
  const media = project.media[0];
  const cx = 400;
  const cy = 250;
  const inner = faculties.map((name, i) => {
    const a = (i / faculties.length) * Math.PI * 2 - Math.PI / 2 + 0.3;
    return { name, a, x: cx + Math.cos(a) * 230, y: cy + Math.sin(a) * 160 };
  });
  const outer = inner.flatMap((f, i) =>
    [-0.22, 0, 0.22].map((d, j) => ({
      parent: f,
      x: cx + Math.cos(f.a + d) * 345,
      y: cy + Math.sin(f.a + d) * 235,
      key: `${i}-${j}`,
    })),
  );

  return (
    <>
      <svg className="stage__bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke={line} strokeWidth="1.2">
          {inner.map((f) => (
            <line key={f.name} x1={cx} y1={cy} x2={f.x.toFixed(1)} y2={f.y.toFixed(1)} />
          ))}
          {outer.map((g) => (
            <line key={g.key} x1={g.parent.x.toFixed(1)} y1={g.parent.y.toFixed(1)} x2={g.x.toFixed(1)} y2={g.y.toFixed(1)} strokeOpacity="0.7" />
          ))}
        </g>
        {outer.map((g) => (
          <circle key={g.key} cx={g.x.toFixed(1)} cy={g.y.toFixed(1)} r="5" fill="#fff" stroke={accent} strokeOpacity="0.6" />
        ))}
        {inner.map((f) => (
          <g key={f.name}>
            <circle cx={f.x.toFixed(1)} cy={f.y.toFixed(1)} r="10" fill={accent} />
            <text
              x={f.x.toFixed(1)}
              y={(f.y + (f.y > cy ? 24 : -16)).toFixed(1)}
              textAnchor="middle"
              fill={ink}
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {f.name}
            </text>
          </g>
        ))}
      </svg>
      {media && (
        <figure className="network__app">
          <Shot src={asset(media.src)} alt="" />
        </figure>
      )}
      <span className="bubble bubble--a" aria-hidden="true">
        <b>Prof. · Section B</b> New lab schedule posted
      </span>
      <span className="bubble bubble--b" aria-hidden="true">
        <b>Group 2</b> 3 new messages
      </span>
      <Hud tl="Faculty → section → group" br="Student · Teacher · Admin" />
    </>
  );
}
