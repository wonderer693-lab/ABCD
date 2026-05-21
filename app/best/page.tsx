import Link from "next/link";
import type { Metadata } from "next";
import { getSiteConfig, getAllTools } from "@/lib/data";
import SchemaMarkup from "@/components/SchemaMarkup";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "All SaaS Alternatives & Comparisons",
  description: "Browse every SaaS tool comparison on SaaSPole. Find the best alternatives for your workflow.",
};

export default function BestPage() {
  const site = getSiteConfig();
  const tools = getAllTools();

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Alternatives", url: "/best" }])} />

      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">All SaaS Alternatives</h1>
      <p className="mb-10 text-lg text-slate-500">Browse every tool comparison on {site.name}.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.saas_id}
            href={`/compare/${t.saas_id}-alternatives`}
            className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
              {t.toolName.charAt(0)}
            </div>
            <h3 className="font-semibold text-slate-800">{t.toolName}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.category}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                {t.startingPrice}
              </span>
              <span className="text-xs text-slate-400">{t.topAlternatives.length} alternatives</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
