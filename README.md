# Atul Lilhare — Portfolio

Personal portfolio built with React 19, Vite and [Tailwind CSS 4](https://tailwindcss.com), using [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling and [Motion](https://motion.dev) for scroll-linked animation.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/, prerendered (see SEO below)
npm run preview   # serve the build locally
```

## Edit the content

Everything the site says lives in [`src/data.js`](src/data.js): name, the roles typed out in the hero, GitHub and LeetCode links, the ticker stack, about text, stats, skills (with logos), experience and projects. Change it there and the page updates.

- **Skills:** each item's `logo` is a [Simple Icons](https://simpleicons.org) slug (imported in `src/components/SkillChip.jsx`) or one of the line icons defined there.
- **Projects:** `categories` drive the filter tabs; `projectFilters` sets their order, and a tab only shows when a project uses it.

## Theme

Dark by default, with a toggle in the nav that switches to light (the choice is saved in the browser). All colours are CSS variables at the top of `src/index.css` (the light set on `:root`, the dark set under `[data-theme='dark']`), exposed to Tailwind as classes like `bg-page`, `text-fg` and `border-line`. Use `dark:` / `light:` for anything that differs per theme.

## SEO

- **Prerendering:** `npm run build` also renders the page to HTML (`src/entry-server.jsx`, `scripts/prerender.js`) and writes it into `dist/index.html`, so search engines get the full content without running JavaScript. In the browser, React renders over it from scratch. Code that touches `window` or `document` while rendering needs a `typeof window === 'undefined'` guard, or the build fails.
- **Structured data:** `src/seo.js` builds the schema.org Person / WebSite / ProfilePage data from `data.js` (name, AtulCode, job, GitHub/LinkedIn/LeetCode links, skills). It's added to the built page automatically.
- **Head tags:** title, description, canonical URL and link-preview tags are in `index.html`. The preview image is `public/og-image.png` (1200×630).
- **Crawling:** `public/robots.txt` and `public/sitemap.xml`. The domain (`https://atulcode.com/`) is in those, `index.html`, and `site` in `data.js`.

## Structure

| Path | What it is |
| --- | --- |
| `src/App.jsx` | Page layout, Lenis setup, intro loader, in-page anchor scrolling |
| `src/components/` | One file per section (Hero, Marquee, About, Skills, Experience, Projects, Contact) plus small pieces (Nav, ThemeToggle, Cursor, Magnetic, RollText, Clock, SkillChip) |
| `src/theme.js` | Light/dark theme state and the circular reveal when switching |
| `src/components/ProjectVisual.jsx` | The animated mockups on each project card |
| `src/index.css` | Tailwind setup: theme colours, fonts, breakpoints (`max-sm` = phones … `max-2xl` = up to 1100px), keyframes and a few global rules. Everything else is Tailwind classes in the components |
| `src/ui.js` | Shared Tailwind class strings: buttons, tags, badges, section headings |
| `src/motion.js` | Shared easing and reveal animations |

Animations respect `prefers-reduced-motion`: smooth scrolling, the intro and motion effects switch off.
