import { motion } from 'motion/react'
import {
  siAxios,
  siClaude,
  siCypress,
  siDocker,
  siElectron,
  siEslint,
  siExpo,
  siExpress,
  siFirebase,
  siGit,
  siGithub,
  siGitlab,
  siGooglechrome,
  siGooglemaps,
  siHtml5,
  siI18next,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMui,
  siNodedotjs,
  siPostgresql,
  siPosthog,
  siPostman,
  siPrettier,
  siReact,
  siRedis,
  siRedux,
  siSentry,
  siSonarqubeserver,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
  siZod,
} from 'simple-icons'
import { ease } from '../motion'

const brands = {
  axios: siAxios,
  claude: siClaude,
  cypress: siCypress,
  docker: siDocker,
  electron: siElectron,
  eslint: siEslint,
  expo: siExpo,
  express: siExpress,
  firebase: siFirebase,
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
  googlechrome: siGooglechrome,
  googlemaps: siGooglemaps,
  html5: siHtml5,
  i18next: siI18next,
  javascript: siJavascript,
  jsonwebtokens: siJsonwebtokens,
  mongodb: siMongodb,
  mui: siMui,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  posthog: siPosthog,
  postman: siPostman,
  prettier: siPrettier,
  react: siReact,
  redis: siRedis,
  redux: siRedux,
  sentry: siSentry,
  sonarqubeserver: siSonarqubeserver,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vite: siVite,
  vitest: siVitest,
  zod: siZod,
}

// Line icons for things without a brand mark.
const glyphs = {
  aws: <path d="M7 18.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.6 4.5 4.5 0 0 0 7 18.5z" />,
  refresh: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4.5v4h-4" />,
  route: (
    <>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8.2 18H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.8" />
    </>
  ),
  motion: <path d="M3 12h3.5l2.5-6 4 12 2.5-6H21" />,
  bell: <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5zM10 20.5a2 2 0 0 0 4 0" />,
  cube: <path d="M12 2.8 20.5 7.5v9L12 21.2 3.5 16.5v-9L12 2.8zM3.5 7.5 12 12.2l8.5-4.7M12 12.2v9" />,
  table: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15" />
    </>
  ),
  api: <path d="M8 8l-4.5 4L8 16M16 8l4.5 4L16 16M13.5 5.5l-3 13" />,
  layers: <path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5zM3 12.5l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />,
  nodes: (
    <>
      <circle cx="5.5" cy="6" r="2.3" />
      <circle cx="18.5" cy="6" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M7.8 6h8.4M6.6 8.1l4.2 7.8M17.4 8.1l-4.2 7.8" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15.5" r="4" />
      <path d="M10.8 12.7 19 4.5M15.5 8l2.5 2.5M17.5 6l2.5 2.5" />
    </>
  ),
  chart: <path d="M5 20v-8M11 20V5M17 20v-11M3 20h18" />,
}

const glyphColors = { aws: '#FF9900' }

// Very dark marks (Express, GitHub…) switch to the text colour in dark mode, and
// very pale ones (JavaScript, Vitest…) are darkened in light mode.
function toneOf(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.04 ? 'dark' : luminance > 0.45 ? 'light' : 'mid'
}

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
}

export default function SkillChip({ name, logo }) {
  const brand = brands[logo]
  const color = brand ? `#${brand.hex}` : (glyphColors[logo] ?? null)
  const tone = color ? toneOf(color) : 'accent'

  return (
    <motion.li
      className="chip"
      data-tone={tone}
      style={color ? { '--brand': color } : undefined}
      variants={chipVariants}
    >
      <span className="chip__logo" aria-hidden="true">
        {brand ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d={brand.path} />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {glyphs[logo]}
          </svg>
        )}
      </span>
      {name}
    </motion.li>
  )
}
