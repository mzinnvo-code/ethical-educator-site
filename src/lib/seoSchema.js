import { SITE } from "../siteConfig.js";

const SITE_SUFFIX = /\s*[—-]\s*The Examined Classroom\s*$/i;

const SECTION_CRUMBS = [
  {
    match: (pageId) => pageId.startsWith("teaching-resources/"),
    crumbs: [{ name: "AI Ethics Lesson Plans", path: "ai-ethics-lesson-plans" }],
  },
  {
    match: (pageId) => pageId.startsWith("thought-experiments/packet/"),
    crumbs: [
      { name: "Thought Experiments", path: "thought-experiments" },
      { name: "Classroom Packets", path: "thought-experiments" },
    ],
  },
  {
    match: (pageId) => pageId.startsWith("thought-experiments/"),
    crumbs: [{ name: "Thought Experiments", path: "thought-experiments" }],
  },
  {
    match: (pageId) => pageId.startsWith("ai-education/"),
    crumbs: [{ name: "AI in Education", path: "ai-education" }],
  },
  {
    match: (pageId) => pageId.startsWith("ai-consciousness/"),
    crumbs: [
      { name: "AI & Ethics", path: "ai-ethics" },
      { name: "The Consciousness Line", path: "ai-consciousness" },
    ],
  },
  {
    match: (pageId) => pageId.startsWith("audiences/"),
    crumbs: [{ name: "Audience Guides", path: "" }],
  },
  {
    match: (pageId) => [
      "ai-authorship-quandary",
      "ai-ambiguity-to-action",
      "ai-paradox",
      "ai-replace-teachers",
      "ai-ethics-lesson-plans",
      "academic-integrity-ai-discussions",
    ].includes(pageId),
    crumbs: [{ name: "AI & Ethics", path: "ai-ethics" }],
  },
  {
    match: (pageId) => pageId === "thought-experiments-for-kids",
    crumbs: [{ name: "Thought Experiments", path: "thought-experiments" }],
  },
  {
    match: (pageId) => pageId === "ai-literacy-activities",
    crumbs: [{ name: "AI in Education", path: "ai-education" }],
  },
  {
    match: (pageId) => pageId === "school-ai-policy-tools",
    crumbs: [{ name: "Interactive Tools", path: "tools" }],
  },
  {
    match: (pageId) => pageId === "philosophy-for-kids",
    crumbs: [{ name: "Philosophy in K-12", path: "phil-education" }],
  },
  {
    match: (pageId) => [
      "teaching-feedback",
      "enhancing-feedback",
      "enhancing-engagement",
      "async-engagement",
      "av-resources",
      "quality-leadership",
      "high-performing-schools",
      "rti",
    ].includes(pageId),
    crumbs: [{ name: "For Educators", path: "for-educators" }],
  },
  {
    match: (pageId) => ["picker", "ai-rubric", "ai-policy", "family-conversations"].includes(pageId),
    crumbs: [{ name: "Interactive Tools", path: "tools" }],
  },
];

function absoluteUrl(path) {
  if (!path) return `${SITE.origin}/`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return new URL(path, SITE.origin).toString();
}

export function cleanTitle(title) {
  return String(title || SITE.brandName).replace(SITE_SUFFIX, "").trim();
}

function imageObject(imageUrl) {
  if (!imageUrl) return undefined;
  return {
    "@type": "ImageObject",
    "url": absoluteUrl(imageUrl),
  };
}

function audience(role) {
  if (!role) return null;
  if (["teacher", "administrator", "student"].includes(role)) {
    return {
      "@type": "EducationalAudience",
      "educationalRole": role,
    };
  }
  return {
    "@type": "Audience",
    "audienceType": role,
  };
}

function aboutItems(items) {
  return (items || []).map((name) => ({ "@type": "Thing", "name": name }));
}

function basePageType(currentPage, meta) {
  if (meta.schemaType) return meta.schemaType;
  if (currentPage === "home") return "WebPage";
  if (currentPage === "about") return "AboutPage";
  if (
    currentPage === "thought-experiments" ||
    currentPage.startsWith("thought-experiments/") ||
    currentPage === "resources" ||
    currentPage === "for-educators" ||
    currentPage === "tools" ||
    currentPage === "ai-ethics-lesson-plans"
  ) return "CollectionPage";
  return "WebPage";
}

function breadcrumbTrail(currentPage, meta, canonicalUrl) {
  if (currentPage === "home") return [];

  const parent = SECTION_CRUMBS.find((section) => section.match(currentPage))?.crumbs || [];
  const trail = [
    { name: SITE.brandName, url: `${SITE.origin}/` },
    ...parent
      .filter((crumb) => crumb.path !== currentPage)
      .map((crumb) => ({ name: crumb.name, url: absoluteUrl(`/${crumb.path}`) })),
    { name: cleanTitle(meta.title), url: canonicalUrl },
  ];

  const uniqueTrail = trail.filter((crumb, index, all) => (
    index === all.findIndex((candidate) => candidate.url === crumb.url)
  ));

  return uniqueTrail.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url,
  }));
}

export function isArticleMeta(meta) {
  return meta.contentType === "article" || Boolean(meta.articleType);
}

export function ogTypeFor(meta) {
  return isArticleMeta(meta) ? "article" : "website";
}

export function buildRouteSchema({ currentPage, meta, canonicalUrl, imageUrl }) {
  const title = cleanTitle(meta.title);
  const image = imageObject(imageUrl);
  const pageId = `${canonicalUrl}#webpage`;
  const schemas = [
    {
      "@type": basePageType(currentPage, meta),
      "@id": pageId,
      "url": canonicalUrl,
      "name": title,
      "description": meta.description,
      "isPartOf": { "@id": `${SITE.origin}/#website` },
      "publisher": { "@id": `${SITE.origin}/#organization` },
      "creator": { "@id": `${SITE.origin}/#${SITE.authorId}` },
      "inLanguage": "en-US",
      ...(image ? { "primaryImageOfPage": image } : {}),
      ...(meta.datePublished ? { "datePublished": meta.datePublished } : {}),
      ...(meta.dateModified ? { "dateModified": meta.dateModified } : {}),
      ...(meta.about ? { "about": aboutItems(meta.about) } : {}),
      ...(meta.audience ? { "audience": meta.audience.map(audience).filter(Boolean) } : {}),
    },
  ];

  const breadcrumbs = breadcrumbTrail(currentPage, meta, canonicalUrl);
  if (breadcrumbs.length > 1) {
    schemas.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": breadcrumbs,
    });
  }

  if (isArticleMeta(meta)) {
    schemas.push({
      "@type": meta.articleType || "Article",
      "@id": `${canonicalUrl}#article`,
      "headline": title,
      "description": meta.description,
      "url": canonicalUrl,
      "mainEntityOfPage": { "@id": pageId },
      "author": { "@id": `${SITE.origin}/#${SITE.authorId}` },
      "publisher": { "@id": `${SITE.origin}/#organization` },
      ...(image ? { "image": [image.url] } : {}),
      "datePublished": meta.datePublished || "2024-01-01",
      "dateModified": meta.dateModified || meta.datePublished || "2026-05-13",
    });
  }

  if (meta.learningResource) {
    schemas.push({
      "@type": "LearningResource",
      "@id": `${canonicalUrl}#learning-resource`,
      "name": title,
      "description": meta.description,
      "url": canonicalUrl,
      "inLanguage": "en-US",
      "creator": { "@id": `${SITE.origin}/#${SITE.authorId}` },
      "publisher": { "@id": `${SITE.origin}/#organization` },
      ...(image ? { "image": image.url } : {}),
      ...(meta.audience ? { "audience": meta.audience.map(audience).filter(Boolean) } : {}),
      ...(meta.educationalLevel ? { "educationalLevel": meta.educationalLevel } : {}),
      ...(meta.learningResourceType ? { "learningResourceType": meta.learningResourceType } : {}),
      ...(meta.teaches ? { "teaches": meta.teaches } : {}),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
