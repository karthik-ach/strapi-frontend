# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

**Stack:** Next.js 16.2.10 · React 19 · Tailwind CSS v4 · App Router

**Source layout:**
- `src/app/` — App Router root: `layout.js` (root layout with Geist fonts), `page.js` (home), `globals.css` (Tailwind entry)
- Path alias `@/*` maps to `src/*` (configured in `jsconfig.json`)

**Styling:** Tailwind v4 via `@tailwindcss/postcss`. The CSS entry point is `src/app/globals.css` using `@import "tailwindcss"` — no `tailwind.config.*` file; configuration is done in CSS directly with `@theme`.

**Data fetching:** Not yet implemented. This project is intended to connect to a Strapi CMS backend. Environment variables for the Strapi API URL will need to be added to `.env.local`.
