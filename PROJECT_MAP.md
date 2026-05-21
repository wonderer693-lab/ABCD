# PROJECT_MAP — SaaSPole

## [TECH_STACK]
- **Runtime:** Next.js 15.5.18 (static export), React 19.2.6, TypeScript 6.0.3
- **Styling:** Tailwind CSS 4.3, `@tailwindcss/postcss`
- **Icons:** lucide-react 0.501.0 (tree-shaken: CheckCircle, XCircle, ExternalLink)
- **Analytics:** `@vercel/analytics`
- **Scraper:** Playwright (standalone, pre-build)

## [SYSTEM_FLOW]
```
User visits / → homepage listing all tools
User clicks tool → /compare/{saas_id}-alternatives
  → Hero: "Best {toolName} Alternatives & Competitors (2026)"
  → Pros & Cons cards (Lucide icons)
  → Comparison table (4 cols: Name, Price, Best For, Action)
  → CTA button → affiliateUrl (nofollow sponsored)
  → FAQ section
User visits /best → grid of all tools
```

## [ARCHITECTURE]
- **Data source:** `data/saas_data.json` (array of SaasTool objects)
- **Data layer:** `lib/data.ts` (getSiteConfig, getAllTools, getToolBySlug)
- **Dynamic routes:** Single `app/compare/[slug]/page.tsx` generates `{saas_id}-alternatives` pages
- **Static pages:** `app/page.tsx` (home), `app/best/page.tsx` (all tools grid)
- **Components kept:** Breadcrumbs, FaqSection, SchemaMarkup
- **Components deleted (8):** ProsCons, ComparisonTable, AffiliateCta, PricingChart, FeatureMatrix, TrustBar, StepGuide, Sidebar
- **Routes deleted (5):** /for, /solves, /features, /guides, /glossary

## [VERIFIABLE_GOALS]
1. `npm run build` → exit 0, `out/` directory created
2. `out/compare/cursor-alternatives.html` exists
3. Every page has `<title>` matching "Best {toolName} Alternatives & Competitors (2026)"
4. Every page has `<link rel="canonical" href="/compare/{slug}">`
5. Every CTA button has `rel="nofollow sponsored"` and `target="_blank"`
6. Pros use `<CheckCircle className="text-green-500" />`, Cons use `<XCircle className="text-red-500" />`
7. `out/sitemap.xml` contains all routes
8. No remaining references to old `tools.json` getters (getCompetitors, getTool, etc.)

## [ORPHANS_AND_PENDING]
- [x] scraper.js — created, needs targets expanded by user
- [x] saas_data.json — seeded with 3 sample tools (Cursor, GitHub Copilot, Notion)
- [x] Old routes deleted (for, solves, features, guides, glossary)
- [x] Old components deleted (8 files)
- [x] Lucide icons imported via named exports (tree-shakeable)
- [ ] User to populate remaining SaaS tools in scraper.js targets
- [ ] User to update affiliate URLs with actual tracking links
- [ ] User to set up actual Google Search Console verification tag
- [ ] User to deploy to Vercel
