import { experience, profile, site, skills } from './data'

// Structured data (schema.org JSON-LD) telling search engines who the site is about,
// built from data.js. scripts/prerender.js writes it into index.html at build time.
export function structuredData() {
  const person = `${site.url}#person`
  const website = `${site.url}#website`
  const job = experience.find((e) => e.current)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': website,
        url: site.url,
        name: profile.name,
        alternateName: [site.name, new URL(site.url).hostname],
        inLanguage: 'en',
        publisher: { '@id': person },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}#profile`,
        url: site.url,
        name: site.title,
        inLanguage: 'en',
        isPartOf: { '@id': website },
        mainEntity: { '@id': person },
      },
      {
        '@type': 'Person',
        '@id': person,
        name: profile.name,
        givenName: profile.first,
        familyName: profile.name.split(' ').slice(1).join(' '),
        alternateName: [site.name, profile.githubHandle],
        url: site.url,
        description: `${profile.name} (${site.name}) is a MERN stack and React Native developer, ${profile.role} at ${profile.company}.`,
        jobTitle: job?.role ?? profile.role,
        worksFor: { '@type': 'Organization', name: profile.company, url: profile.companyUrl },
        sameAs: [profile.github, profile.linkedin, profile.leetcode],
        knowsAbout: [...new Set(skills.flatMap((g) => g.items.map((s) => s.name)))],
      },
    ],
  }
}
