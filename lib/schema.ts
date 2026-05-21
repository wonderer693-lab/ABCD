interface SchemaOrg {
  "@context": string
  "@type": string
  [key: string]: unknown
}

export function breadcrumbSchema(items: { name: string; url: string }[]): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
