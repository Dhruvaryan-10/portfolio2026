# Dhruvaryan Chugh — Portfolio

Live: https://portfoliodac.vercel.app

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, GSAP, Framer Motion and a Spline 3D keyboard. Each project has its own case-study page at `/projects/<slug>`.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Where to edit content

| What | File |
| --- | --- |
| Name, role line, SEO text, site URL, resume path, social links | `src/data/config.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Project images (cover + screens) | `public/assets/projects/<slug>/` |
| Experience timeline and skills keyboard labels | `src/data/constants.ts` |
| Footer links | `src/components/footer/config.ts` |
| Proof badges, availability, Now, certifications, testimonials | `src/data/config.ts` |
| Writing (articles) | `src/data/writing.ts` |
| Resume PDF | `public/assets/DAC_Res.pdf` |

### Adding a project

1. Create `public/assets/projects/<slug>/` with `cover.webp` (1600×1000) and numbered screenshots (`1.webp`, `2.webp`, …).
2. Add an entry to `PROJECTS` in `src/data/projects.ts`. The card, filter count, case-study page and sitemap entry are generated from it.

## Environment variables (Vercel)

| Name | Used for |
| --- | --- |
| `NEXT_PUBLIC_USER_ID`, `NEXT_PUBLIC_SERVICE_ID`, `NEXT_PUBLIC_TEMPLATE_ID` | EmailJS contact form |
| `UMAMI_DOMAIN`, `UMAMI_SITE_ID` | Optional Umami analytics |
| `GEMINI_API_KEY` (optional `GEMINI_MODEL`) | AI answers for the "Ask about me" assistant |
| or `OPENAI_API_KEY` (optional `OPENAI_MODEL`, `OPENAI_BASE_URL`) | Same, with an OpenAI-compatible API |

The assistant (`src/app/api/ask/route.ts`) works without any key: it answers straight from the site's data. With a key it writes answers with the AI model, grounded only in that data, and falls back to the data-only answer if the provider fails. Check which mode is live at `/api/ask`.

## Tailored links

Add `?for=ai`, `?for=data` or `?for=fullstack` to the site URL to change the headline and put the most relevant projects first. Edit the views in `src/data/config.ts`.

## Notes

- The 3D scene is wrapped in an error boundary, so the site still works if WebGL or the Spline runtime fails to load.
- `public/sitemap.xml` lists every page; add a line when you add a project.
- Particles and the custom cursor are turned off when the visitor's system asks for reduced motion.

## Credits

Started from Naresh Khatri's open-source 3D portfolio template; content, project pages and design changes are my own.
