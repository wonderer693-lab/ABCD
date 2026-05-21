import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { getAllTools, getToolBySlug, getSiteConfig } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaMarkup from "@/components/SchemaMarkup";
import FaqSection from "@/components/FaqSection";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: `${t.saas_id}-alternatives` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `Best ${tool.toolName} Alternatives & Competitors (2026)`,
    description: `Looking for ${tool.category} tools? Compare ${tool.toolName} (starting at ${tool.startingPrice}) against the top alternatives. Read our full feature breakdown.`,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: `Best ${tool.toolName} Alternatives & Competitors (2026)`,
      description: `Compare ${tool.toolName} (starting at ${tool.startingPrice}) against alternatives in the ${tool.category} space.`,
      url: `/compare/${slug}`,
      locale: "en_US",
      siteName: "SaaSPole",
      type: "website",
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const site = getSiteConfig();
  const allTools = getAllTools();

  const faqs = [
    { q: `What is the best alternative to ${tool.toolName}?`, a: `The best alternative depends on your needs. For most users, ${tool.topAlternatives[0]?.name || "the top option listed"} is a great starting point. Compare pricing, features, and use cases above to find your ideal match.` },
    { q: `Is ${tool.toolName} free?`, a: `${tool.toolName} starts at ${tool.startingPrice}. Some plans may include a free tier or trial period. Check the official website for the most up-to-date pricing.` },
    { q: `How does ${tool.toolName} compare to ${tool.topAlternatives[0]?.name || "its alternatives"}?`, a: `${tool.toolName} excels in its core category of ${tool.category}. Alternatives may offer different pricing models, feature sets, or integration ecosystems. The comparison table above breaks down the key differences.` },
    { q: `Are there any completely free alternatives to ${tool.toolName}?`, a: `Some alternatives in the ${tool.category} space offer free tiers. Check the "Starting Price" column in the comparison table above — tools marked as "Free" or with free tiers can help you get started without upfront cost.` },
  ];

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: `${tool.toolName} Alternatives`, url: `/compare/${slug}` },
      ])} />

      <Breadcrumbs items={[
        { name: "Home", url: "/" },
        { name: `${tool.toolName} Alternatives`, url: `/compare/${slug}` },
      ]} />

      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {tool.category}
        </span>
        <span className="text-xs text-slate-400">Updated 2026</span>
      </div>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Best {tool.toolName} Alternatives & Competitors
      </h1>
      <p className="mb-10 text-lg text-slate-500">
        Compare {tool.toolName} (starting at {tool.startingPrice}) against the top alternatives in the {tool.category.toLowerCase()} space. Find the perfect tool for your workflow.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Pros & Cons</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50 to-white p-5">
            <h3 className="mb-3 text-lg font-semibold text-green-800">Pros</h3>
            <ul className="space-y-2.5">
              {tool.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-green-700">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-200/50 bg-gradient-to-br from-red-50 to-white p-5">
            <h3 className="mb-3 text-lg font-semibold text-red-800">Cons</h3>
            <ul className="space-y-2.5">
              {tool.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-red-700">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {tool.topAlternatives.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-slate-800">Comparison Table</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-5 py-3.5 font-semibold text-slate-700">Tool Name</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-700">Starting Price</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-700">Best For</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-200 bg-blue-50/50">
                    <td className="px-5 py-3.5 font-medium text-blue-800">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">Current</span>
                        {tool.toolName}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-blue-700">{tool.startingPrice}</td>
                    <td className="px-5 py-3.5 text-slate-600">{tool.category}</td>
                    <td className="px-5 py-3.5">
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        Try Now
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                  {tool.topAlternatives.map((alt, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-5 py-3.5 font-medium text-slate-800">{alt.name}</td>
                      <td className="px-5 py-3.5 text-slate-600">{alt.startingPrice}</td>
                      <td className="px-5 py-3.5 text-slate-600">{alt.bestFor}</td>
                      <td className="px-5 py-3.5">
                        <a
                          href={alt.website}
                          target="_blank"
                          rel="nofollow sponsored"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
                        >
                          Learn More
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="mb-12">
        <div className="rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 text-center sm:p-8">
          <div className="mx-auto max-w-lg">
            <p className="mb-4 text-lg font-semibold text-slate-800">Ready to try {tool.toolName}?</p>
            <p className="mb-6 text-sm text-slate-500">
              Start your journey with {tool.toolName} today. Pricing starts at {tool.startingPrice}.
            </p>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="nofollow sponsored"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
            >
              Try {tool.toolName} Now
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-slate-400">
              We may earn a commission if you purchase through this link.
            </p>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </>
  );
}
