"use client";

import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {!imgError ? (
          <img
            src="/images/hero/hero-main.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-950/70 to-primary-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />
      </div>

      {/* Decorative */}
      <div className="absolute top-32 right-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft shrink-0" />
            <span className="whitespace-nowrap">Pas de souscription à distance &bull; Contact humain</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
            Nous ne sommes pas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-400">
              un cabinet d&apos;assurances
            </span>
            <br />
            comme les autres
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10 max-w-lg leading-relaxed">
            Nous participons à la vie des territoires ruraux en protégeant les
            personnes du 2ème et 3ème âge des cotisations souvent trop chères.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <CTAButton href="/formulaire" variant="primary" size="lg">
              <span className="flex items-center gap-2">
                Demander un rendez-vous
                <ArrowRight className="w-5 h-5" />
              </span>
            </CTAButton>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200 min-h-[48px] sm:min-h-[56px] active:scale-[0.97]"
            >
              <Phone className="w-5 h-5 mr-2" />
              {SITE.phoneFormatted}
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
              <span>Rendez-vous à domicile</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span>Hauts-de-France &amp; Normandie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
