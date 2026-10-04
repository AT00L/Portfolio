import { renderToString } from 'react-dom/server'
import App from './App'

export { structuredData } from './seo'

// Build time only: scripts/prerender.js writes this markup into dist/index.html so
// search engines get the page's content without running JavaScript.
export const render = () => renderToString(<App />)
