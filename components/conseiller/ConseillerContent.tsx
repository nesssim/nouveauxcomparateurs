"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { User } from "lucide-react";

function AdvisorImage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-square max-w-md mx-auto lg:mx-0 bg-primary-50 rounded-2xl overflow-hidden">
      {!imgError ? (
        <Image
          src="/images/advisor/herve-migliore.jpg"
          alt={SITE.director}
          fill
          className="object-cover rounded-2xl"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <User className="w-24 h-24 text-primary-300" />
        </div>
      )}
    </div>
  );
}

export function ConseillerContent() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Un conseiller personnel
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Il se déplacera à votre domicile et vous sera dédié afin de vous
              faire bénéficier de prestations sur-mesure.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <AdvisorImage />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <h2 className="font-display text-3xl font-bold text-neutral-900 mb-6">
                  Dédié à votre santé
                </h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Chez {SITE.name}, chaque client est suivi par un conseiller
                  dédié. Ce fonctionnement vous offre un repère et facilite vos
                  prises de contact.
                </p>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Vous n&apos;êtes pas renvoyé de numéro en numéro, de service en
                  service. Vous n&apos;avez pas besoin de tout répéter à chaque
                  appel. Votre conseiller vous connaît et comprend vos besoins.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Déplacement à domicile gratuit (des conseillers à proximité)",
                    "Pas de souscription par internet ou par téléphone (un conseiller en face à face)",
                    "Explication claire et précise du choix de la mutuelle",
                    "Étude comparative approfondie",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>

                <CTAButton href="/nous-contacter" variant="primary" size="lg">
                  Prendre contact
                </CTAButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
