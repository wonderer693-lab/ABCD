import { RootData, SiteConfig, SaasTool, Alternative } from "./types";
import raw from "@/data/saas_data.json";

const data = raw as unknown as RootData;
const toolsArray = (Array.isArray(raw) ? raw : (raw as RootData).tools) as SaasTool[];

export function getSiteConfig(): SiteConfig {
  if (!Array.isArray(raw) && (raw as RootData)._site) {
    return (raw as RootData)._site;
  }
  return {
    name: "SaaSPole",
    url: "https://saaspole.vercel.app",
    tagline: "Smart SaaS Alternatives for Modern Teams",
    locale: "en_US",
  };
}

export function getAllTools(): SaasTool[] {
  return toolsArray;
}

export function getToolBySaasId(saasId: string): SaasTool | undefined {
  return toolsArray.find((t) => t.saas_id === saasId);
}

export function getToolBySlug(slug: string): SaasTool | undefined {
  const saasId = slug.replace(/-alternatives$/, "");
  return getToolBySaasId(saasId);
}

export function getAlternatives(tool: SaasTool): Alternative[] {
  return tool.topAlternatives || [];
}
