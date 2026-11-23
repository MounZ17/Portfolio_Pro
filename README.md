# Mounir Chemloul — Portfolio (pro)

A clean, corporate-facing portfolio where **each project lives inside its own themed environment**
(satellite HUD, endoscopy viewport, blueprint, clinical SaaS, radar scope, topographic map, network graph).

## Stack
- Next.js 16 (App Router) with `output: "export"` — fully static
- Hand-written CSS (`app/globals.css`), environments drawn as inline SVG + CSS
- Fonts: Inter Variable, JetBrains Mono (Fontsource)

## Where things live
| What | Where |
| --- | --- |
| Projects, experience, expertise, links | `lib/content.ts` |
| Project environments (one file each) | `components/stages/*.tsx` |
| Screenshots / CV | `public/media/`, `public/cv/` |

Add a project: append to `projects` in `lib/content.ts` and choose a `theme.kind`
(or create a new stage in `components/stages/` and register it in `Stage.tsx`).

## Develop
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/  (BASE_PATH=/repo-name for a GitHub Pages project URL)
```
