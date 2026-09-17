"use client";

import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Shield, Users, BadgeCheck, MapPin } from "lucide-react";

const stats = [
  {
    icon: Shield,
    label: "ORIAS N°",
    value: SITE.orias,
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    icon: Users,
    label: "Partenaires",
    value: "+20",
    accent: "from-blue-400 to-blue-600",
  },
  {
    icon: BadgeCheck,
    label: "Réglementé",
    value: "Courtier certifié",
    accent: "from-amber-400 to-amber-600",
  },
  {
    icon: MapPin,
    label: "Territoire",
    value: "30 départements",
    accent: "from-rose-400 to-rose-600",
  },
];

export function TrustBanner() {
  return (
    <section className="py-0 relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-primary-500 to-amber-500" />

      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 pattern-dots opacity-[0.03]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="relative text-center group">
                  <div className="relative inline-flex mb-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className="relative w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-500">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="font-display text-2xl md:text-3xl font-bold text-white mb-1.5 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 font-medium">{stat.label}</p>
                  <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r ${stat.accent} opacity-40 group-hover:w-16 group-hover:opacity-80 transition-all duration-500`} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
