"use client";

import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Users,
  MapPin,
  ArrowRight,
  Headphones,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const OFFERS = [
  {
    icon: Headphones,
    title: "Téléopérateur·trice",
    count: 6,
    subtitle: "postes à pourvoir",
    description: "Expérience en téléprospection auprès des particuliers. Primes sur objectifs jusqu'à 50% du salaire de base.",
    badge: "Primes importantes",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Briefcase,
    title: "Responsable de secteur",
    count: 4,
    subtitle: "postes CDI",
    description: "Conseil en assurances auprès des particuliers. Statut salarié CDI avec secteur dédié.",
    badge: "CDI",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

const DEPARTMENTS = [
  { code: "59", name: "Nord" },
  { code: "60", name: "Oise" },
  { code: "62", name: "Pas-de-Calais" },
  { code: "80", name: "Somme" },
  { code: "14", name: "Calvados" },
  { code: "27", name: "Eure" },
  { code: "76", name: "Seine-Maritime" },
];

export function RecruitmentCTA() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {!imgError ? (
          <img
            src="/images/recruitment/responsable-secteur.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-950/85 to-primary-900/80" />
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Rejoignez notre équipe
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Nous recherchons des talents passionnés pour renforcer nos équipes
              sur les Hauts-de-France et la Normandie.
            </p>
          </div>
        </ScrollReveal>

        {/* Job cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {OFFERS.map((offer, i) => (
            <ScrollReveal key={offer.title} delay={i * 150}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-500 group h-full">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                    <offer.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.badgeColor}`}>
                    {offer.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-display font-bold text-white">
                    {offer.count}
                  </span>
                  <span className="text-white/60 text-sm font-medium">{offer.subtitle}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {offer.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {offer.description}
                </p>

                <div className="flex items-center text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
                  <span className="flex items-center gap-2">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Departments */}
        <ScrollReveal delay={300}>
          <div className="text-center mb-10">
            <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">
              Nos secteurs d&apos;activité
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.code}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-white/80 text-sm font-medium hover:bg-white/15 hover:text-white transition-all duration-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary-300" />
                  <span className="font-bold">{dept.code}</span>
                  <span>{dept.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/rejoignez-nous" variant="secondary" size="lg">
              <span className="flex items-center gap-2">
                Voir les offres d&apos;emploi
                <ArrowRight className="w-5 h-5" />
              </span>
            </CTAButton>
            <p className="text-white/50 text-sm">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Primes jusqu&apos;à 50% du salaire de base
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
