import type { Metadata } from "next";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Search, BarChart3, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Économisez jusqu'à 30% sur votre mutuelle",
  description:
    "Service gratuit de comparaison de mutuelles santé. Économisez en moyenne 480€ par an sur votre complémentaire santé.",
};

const steps = [
  {
    icon: Search,
    title: "Analyse",
    description: "Nous étudions vos besoins et votre situation actuelle.",
  },
  {
    icon: BarChart3,
    title: "Comparaison",
    description: "Nous comparons les offres de +20 mutuelles pour vous.",
  },
  {
    icon: FileCheck,
    title: "Souscription",
    description: "Nous souscrivons la mutuelle la mieux adaptée, au meilleur prix.",
  },
];

export default function EconomisezPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Économisez jusqu&apos;à 30% en moyenne
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              sur votre mutuelle santé grâce à notre service de comparaison
              gratuit et personnalisé.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Comment ça marche"
            subtitle="Un processus simple en 3 étapes"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 150}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-6xl font-display font-bold text-primary-600 mb-4">
              480€
            </p>
            <p className="text-xl text-neutral-700 mb-8">
              d&apos;économies en moyenne par an pour nos clients
            </p>
            <CTAButton href="/formulaire" variant="primary" size="lg">
              Demander mon étude gratuite
            </CTAButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
