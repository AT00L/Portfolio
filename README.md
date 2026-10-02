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

Everything the site says lives in [`src/data.js`](src/data.js): name, role, GitHub link, stack, about text, stats, experience, capabilities and projects. Change it there and the page updates.

## Structure

| Path | What it is |
| --- | --- |
| `src/App.jsx` | Page layout, Lenis setup, intro loader, in-page anchor scrolling |
| `src/components/` | One file per section (Hero, Marquee, About, Projects, Experience, Contact) plus small pieces (Nav, Cursor, Magnetic, RollText, Clock) |
| `src/components/ProjectVisual.jsx` | The animated mockups on each project card |
| `src/index.css` | All styles; colour and font tokens are at the top |
| `src/motion.js` | Shared easing and reveal animations |

Animations respect `prefers-reduced-motion`: smooth scrolling, the intro and motion effects switch off.
