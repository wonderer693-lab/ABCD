export interface Alternative {
  name: string
  startingPrice: string
  bestFor: string
  website: string
}

export interface SaasTool {
  saas_id: string
  toolName: string
  category: string
  startingPrice: string
  pros: string[]
  cons: string[]
  affiliateUrl: string
  topAlternatives: Alternative[]
}

export interface SiteConfig {
  name: string
  url: string
  tagline: string
  locale: string
}

export interface RootData {
  _site: SiteConfig
  tools: SaasTool[]
}
