import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/economisez",
    "/conseiller-personnel",
    "/rejoignez-nous",
    "/nous-contacter",
    "/horaires-acces",
    "/formulaire",
    "/mentions-legales",
    "/cgu",
  ];

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
