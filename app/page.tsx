import Link from "next/link";
import { getSiteConfig, getAllTools } from "@/lib/data";

export default function HomePage() {
  const site = getSiteConfig();
  const tools = getAllTools();

  return (
    <div className="animate-fade-in">
      <section className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Smart SaaS Alternatives for Modern Teams
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Compare popular SaaS tools side by side. Real pricing, real pros & cons, real alternatives.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-xl font-bold text-slate-800">All Tools</h2>
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
      </section>

      <section className="mb-16 rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 text-center">
        <h2 className="mb-2 text-xl font-bold text-slate-800">How SaaSPole Works</h2>
        <p className="mx-auto max-w-lg text-sm text-slate-500">
          We research and compare popular SaaS tools so you don&apos;t have to. Each page breaks down pricing, pros & cons, and top alternatives in a clean, no-fluff format.
        </p>
      </section>
    </div>
  );
}
