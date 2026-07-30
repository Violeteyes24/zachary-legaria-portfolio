import {
  profile,
  siteUrl,
  skillGroups,
  socials,
  type Project,
} from "@/data/portfolio";

const ROLE = "Full-Stack & AI Engineer";

/** External profile links (excludes the mailto: entry) for schema `sameAs`. */
function profileLinks(): string[] {
  return socials.filter((s) => /^https?:/.test(s.href)).map((s) => s.href);
}

/**
 * Site-wide structured data: a Person (who the site is about) plus a WebSite,
 * combined in one @graph. This is what helps a name search understand that
 * "Zachary Albert Legaria" is a person, an engineer, with these profiles.
 */
export function siteJsonLd(): Record<string, unknown> {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.fullName,
    alternateName: profile.name,
    url: siteUrl,
    image: `${siteUrl}${profile.avatar}`,
    jobTitle: ROLE,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bohol",
      addressCountry: "PH",
    },
    sameAs: profileLinks(),
    knowsAbout: skillGroups.flatMap((g) => g.items),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${profile.fullName} Portfolio`,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  return { "@context": "https://schema.org", "@graph": [person, website] };
}

/** Per-project structured data for a case-study page. */
export function projectJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    abstract: project.summary,
    url: `${siteUrl}/work/${project.slug}`,
    dateCreated: project.year,
    keywords: project.tech.join(", "),
    author: { "@type": "Person", "@id": `${siteUrl}/#person`, name: profile.fullName },
    ...(project.cover ? { image: `${siteUrl}${project.cover}` } : {}),
  };
}
