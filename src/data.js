// Everything the site says lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Atul Lilhare',
  first: 'Atul',
  role: 'Software Developer',
  company: 'CUBE',
  companyUrl: 'https://cube.ms',
  years: 4,
  since: 2022,
  github: 'https://github.com/AT00L',
  githubHandle: 'AT00L',
  timezone: 'Asia/Kolkata',
  tzLabel: 'IST',
}

export const stack = [
  'JavaScript',
  'React',
  'React Native',
  'iOS & Android',
  'Node.js',
  'Express',
  'MongoDB',
  'Tailwind CSS',
  'Material UI',
  'Vite',
  'Chrome Extensions',
  'REST APIs',
  'JWT Auth',
  'AWS',
  'Git',
  'HTML & CSS',
]

export const about =
  'I’m a software developer who likes the whole stack — from the pixel a user taps to the query that answers it. For four years I’ve been shipping production software at CUBE. I build for the web with React and for phones with React Native, and in between I make my own tools: browser extensions, APIs, full-stack apps. If it can be made faster, simpler or more reliable, I’m probably already poking at it.'

export const stats = [
  { value: 4, suffix: '+', label: 'Years shipping production code' },
  { value: 6, suffix: '', label: 'Public repos on GitHub' },
  { value: 3, suffix: '', label: 'Platforms I build for — web, iOS, Android' },
]

export const experience = [
  {
    company: 'CUBE',
    url: 'https://cube.ms',
    role: 'Software Developer',
    period: '2022 — Present',
    years: 4,
    current: true,
    points: [
      'Build and ship features across the frontend and backend of production products.',
      'Turn product requirements into clean, maintainable code that holds up at scale.',
      'Review code, fix the hard bugs, and keep the team’s codebase healthy.',
    ],
    tags: ['JavaScript', 'React', 'Node.js', 'APIs'],
  },
]

export const capabilities = [
  {
    title: 'Frontend',
    icon: 'web',
    body: 'Responsive, accessible interfaces in React — fast to load and smooth to use.',
    items: ['React', 'Vite', 'Tailwind', 'MUI'],
  },
  {
    title: 'Mobile',
    icon: 'mobile',
    body: 'Cross-platform apps in React Native — one codebase, a native feel on iOS and Android.',
    items: ['React Native', 'iOS', 'Android'],
  },
  {
    title: 'Backend',
    icon: 'server',
    body: 'APIs and services in Node.js and Express, backed by MongoDB, with real auth.',
    items: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    title: 'Tooling',
    icon: 'tool',
    body: 'Browser extensions and developer tools that remove friction from everyday work.',
    items: ['Chrome MV3', 'DevTools', 'AWS', 'Git'],
  },
]

export const projects = [
  {
    id: 'css-injector',
    name: 'Custom CSS Injector',
    kind: 'Chrome Extension',
    blurb:
      'Pick any element on any site, write CSS for it, and have it reapplied on every visit — even after the site renames its ids and classes. Ranked selectors plus an element fingerprint re-find the node; a DevTools sidebar pane gives exact control.',
    tags: ['Manifest V3', 'JavaScript', 'DevTools API', 'Zero dependencies'],
    repo: 'https://github.com/AT00L/DOM-Styler-Custom-CSS-Injector',
    visual: 'injector',
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    kind: 'Full-stack App',
    blurb:
      'A link shortener with user accounts. Sign up, log in, and manage your own short links with live click counts. JWT sessions in httpOnly cookies, hashed passwords, deployed on AWS Elastic Beanstalk.',
    tags: ['Node.js', 'Express 5', 'MongoDB', 'JWT', 'AWS'],
    repo: 'https://github.com/AT00L/URLSHORTNER',
    live: 'https://urlshortneratul.is-a.dev',
    visual: 'shortener',
  },
  {
    id: 'yourlabtest',
    name: 'YourLabTest',
    kind: 'Monorepo',
    blurb:
      'A lab-test catalog browsable by category, with an admin view. A React + MUI + Tailwind client and an Express 5 + MongoDB product API, wired together with npm workspaces.',
    tags: ['React', 'MUI', 'Tailwind', 'Express 5', 'MongoDB'],
    repo: 'https://github.com/AT00L/YourLabTest',
    visual: 'monorepo',
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    kind: 'Website',
    blurb:
      'The site you’re scrolling. React 19 and Vite, with Lenis smooth scrolling and Motion for scroll-linked animation — tuned to stay at 60fps.',
    tags: ['React 19', 'Vite', 'Motion', 'Lenis'],
    repo: 'https://github.com/AT00L/Portfolio',
    visual: 'portfolio',
  },
]
