"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { User, Quote, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AdvisorSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl rotate-3" />
              <div className="relative bg-primary-50 rounded-3xl overflow-hidden shadow-xl shadow-primary-600/10 w-full h-full">
                {!imgError ? (
                  <Image
                    src="/images/advisor/herve-migliore.jpg"
                    alt={SITE.director}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center">
                    <User className="w-32 h-32 text-primary-200" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg shadow-neutral-900/10 px-5 py-3 flex items-center gap-3 border border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Certifié ORIAS</p>
                  <p className="text-xs text-neutral-500">N° {SITE.orias}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <p className="text-primary-600 font-semibold mb-3 uppercase text-sm tracking-wider">
                Votre conseiller personnel
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
                Un expert dédié à votre santé
              </h2>

              <div className="relative mb-8">
                <Quote className="absolute -top-3 left-0 w-10 h-10 text-primary-200" />
                <blockquote className="text-lg text-neutral-600 leading-relaxed italic pl-12 pt-1">
                  &ldquo;Nous ne sommes pas une mutuelle. Nous vous aidons à
                  trouver la perle rare pour votre couverture santé, au juste
                  prix.&rdquo;
                </blockquote>
              </div>

              <div className="mb-8">
                <p className="text-neutral-900 font-bold text-lg">
                  {SITE.director}
                </p>
                <p className="text-neutral-500">
                  Fondateur — {SITE.name}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Déplacement à domicile gratuit (des conseillers à proximité)",
                  "Explication claire et précise des garanties",
                  "Pas de souscription par internet ou par téléphone (un conseiller en face à face)",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 group">
                    <span className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                    <span className="text-neutral-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/conseiller-personnel"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
              >
                En savoir plus sur votre conseiller
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
