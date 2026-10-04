// Runs after `vite build`: writes the server-rendered page and its structured data
// into dist/index.html, so search engines see the content without running JavaScript.
// In the browser, main.jsx renders the app from scratch over this copy.
import { readFile, rm, writeFile } from 'node:fs/promises'

const ssrDir = new URL('../dist-ssr/', import.meta.url)
const page = new URL('../dist/index.html', import.meta.url)

const { render, structuredData } = await import(new URL('entry-server.js', ssrDir))

function inject(html, marker, content) {
  if (!html.includes(marker)) throw new Error(`prerender: "${marker}" not found in index.html`)
  // A function, so `$` in the content isn't read as a replacement pattern.
  return html.replace(marker, () => content)
}

// `<` is escaped so nothing in the JSON can close the script tag early.
const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c')

let html = await readFile(page, 'utf8')
html = inject(html, '<div id="root"></div>', `<div id="root">${render()}</div>`)
html = inject(html, '</head>', `  <script type="application/ld+json">${json}</script>\n  </head>`)
await writeFile(page, html)
await rm(ssrDir, { recursive: true, force: true })

console.log('prerender: wrote content and structured data into dist/index.html')
