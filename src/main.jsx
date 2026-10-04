import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The built index.html has a prerendered copy of the page in #root for search engines
// (scripts/prerender.js). createRoot replaces it, so it never has to match exactly.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
