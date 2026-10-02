# Atul Lilhare — Portfolio

Personal portfolio built with React 19 and Vite, using [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling and [Motion](https://motion.dev) for scroll-linked animation.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

## Edit the content

Everything the site says lives in [`src/data.js`](src/data.js): name, the roles typed out in the hero, GitHub and LeetCode links, the ticker stack, about text, stats, skills (with logos), experience and projects. Change it there and the page updates.

- **Skills:** each item's `logo` is a [Simple Icons](https://simpleicons.org) slug (imported in `src/components/SkillChip.jsx`) or one of the line icons defined there.
- **Projects:** `categories` drive the filter tabs; `projectFilters` sets their order, and a tab only shows when a project uses it.

## Theme

Light by default, with a toggle in the nav that switches to dark (the choice is saved in the browser). All colours are CSS variables at the top of `src/index.css`: the light set on `:root`, the dark set under `[data-theme='dark']`.

## Structure

| Path | What it is |
| --- | --- |
| `src/App.jsx` | Page layout, Lenis setup, intro loader, in-page anchor scrolling |
| `src/components/` | One file per section (Hero, Marquee, About, Skills, Experience, Projects, Contact) plus small pieces (Nav, ThemeToggle, Cursor, Magnetic, RollText, Clock, SkillChip) |
| `src/theme.js` | Light/dark theme state and the circular reveal when switching |
| `src/components/ProjectVisual.jsx` | The animated mockups on each project card |
| `src/index.css` | All styles; colour and font tokens are at the top |
| `src/motion.js` | Shared easing and reveal animations |

Animations respect `prefers-reduced-motion`: smooth scrolling, the intro and motion effects switch off.
