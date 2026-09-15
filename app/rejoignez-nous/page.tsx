"use client";

import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhoneLink } from "@/components/ui/PhoneLink";
import {
  Headphones,
  Briefcase,
  ArrowRight,
  MapPin,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const OFFERS = [
  {
    icon: Headphones,
    title: "Téléopérateur·trice",
    count: 6,
    location: "Basé à Abbeville (80100)",
    badge: "Primes jusqu'à 50%",
    badgeColor: "bg-emerald-100 text-emerald-700",
    requirements: [
      "Expérience réussie en téléprospection auprès des particuliers",
      "Habiter dans un rayon de 20km autour d'Abbeville",
      "Être compétiteur.trice et apprécier les challenges",
      "Primes sur objectifs jusqu'à 50% du salaire de base",
    ],
  },
  {
    icon: Briefcase,
    title: "Responsable de secteur",
    count: 4,
    location: "Départements : 59, 60, 62, 80, 14, 27, 76",
    badge: "CDI",
    badgeColor: "bg-blue-100 text-blue-700",
    requirements: [
      "Expérience réussie dans le conseil en assurances auprès des particuliers",
      "Recherche du meilleur partenaire pour comparaison mutuelles",
      "Statut salarié en CDI",
    ],
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

export default function RejoignezNousPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Rejoignez notre équipe
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Nous recherchons des talents passionnés pour renforcer nos équipes
              sur les Hauts-de-France et la Normandie.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Job offers */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {OFFERS.map((offer, i) => (
              <ScrollReveal key={offer.title} delay={i * 150}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-100 hover:shadow-lg hover:shadow-primary-600/8 hover:border-primary-100 transition-all duration-500 group h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                      <offer.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.badgeColor}`}>
                      {offer.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-display font-bold text-primary-600">
                      {offer.count}
                    </span>
                    <span className="text-neutral-500 text-sm font-medium">postes</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2">
                    {offer.title}
                  </h2>

                  <div className="flex items-center gap-2 text-primary-600 text-sm font-medium mb-5">
                    <MapPin className="w-4 h-4" />
                    {offer.location}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {offer.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                        <span className="text-neutral-600 text-sm leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Departments */}
          <ScrollReveal delay={300}>
            <div className="mb-16">
              <h3 className="font-display text-xl font-bold text-neutral-900 text-center mb-6">
                Nos secteurs d&apos;activité
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {DEPARTMENTS.map((dept) => (
                  <div
                    key={dept.code}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-neutral-200 text-neutral-700 text-sm font-medium hover:border-primary-200 hover:bg-primary-50 transition-all duration-300"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary-500" />
                    <span className="font-bold">{dept.code}</span>
                    <span>{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact CTA */}
          <ScrollReveal delay={400}>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-6 sm:p-8 md:p-12 border border-primary-100 text-center">
              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-3">
                Contactez notre Responsable RH
              </h3>
              <p className="text-neutral-600 mb-6">
                Vous souhaitez rejoindre nos équipes ? Contactez-nous par téléphone ou par email.
              </p>
              <PhoneLink className="text-xl justify-center mb-4" />
              <p className="text-sm text-neutral-500">
                ou par email à{" "}
                <a href={`mailto:${SITE.email}`} className="text-primary-600 hover:underline">
                  {SITE.email}
                </a>
              </p>
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-primary-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                Primes jusqu&apos;à 50% du salaire de base
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
