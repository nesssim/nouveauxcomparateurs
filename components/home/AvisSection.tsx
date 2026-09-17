"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";

const REVIEWS = [
  {
    name: "Marie-Claire D.",
    location: "Abbeville",
    text: "Un conseiller très à l'écoute qui a su trouver la mutuelle idéale pour ma situation. Les explications étaient claires et sans pression.",
    rating: 5,
    avatar: "/images/avatars/marie-claire.jpg",
  },
  {
    name: "Jean-Pierre L.",
    location: "Amiens",
    text: "Après avoir comparé seul sur internet, j'étais perdu. Les Nouveaux Comparateurs m'ont orienté vers la meilleure offre en toute transparence.",
    rating: 5,
    avatar: "/images/avatars/jean-pierre.jpg",
  },
  {
    name: "Colette M.",
    location: "Beauvais",
    text: "Le rendez-vous à domicile m'a beaucoup plu. Pas besoin de me déplacer, tout s'est fait tranquillement chez moi. Service très professionnel.",
    rating: 5,
    avatar: "/images/avatars/colette.jpg",
  },
  {
    name: "Michel R.",
    location: "Dieppe",
    text: "Enfin un courtier qui prend le temps d'expliquer les garanties. J'ai pu économiser plus de 30€ par mois sans perdre en couverture.",
    rating: 5,
    avatar: "/images/avatars/michel.jpg",
  },
  {
    name: "Sylvie T.",
    location: "Rouen",
    text: "Accueil chaleureux et conseils personnalisés. Mon ancienne mutuelle n'était pas adaptée, maintenant je suis bien couverte à un prix raisonnable.",
    rating: 5,
    avatar: "/images/avatars/sylvie.jpg",
  },
];

export function AvisSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxIndex = REVIEWS.length - 1;

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  // Auto-slide — slower at 6s
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  // Touch/swipe
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  // Get 3 visible cards (wrapping around)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(REVIEWS[(current + i) % REVIEWS.length]);
    }
    return cards;
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950" />
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 pattern-dots opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-neutral-100/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12),0_0_40px_-10px_rgba(0,0,0,0.06)] p-8 sm:p-12">
          <ScrollReveal>
            <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">
              Avis clients
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-wrap:balance">
              Ils nous font confiance
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Découvrez les témoignages de nos clients satisfaits
            </p>
            </div>
          </ScrollReveal>

          {/* Carousel — 3 cards visible */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {getVisibleCards().map((review, i) => (
                <div
                  key={`${review.name}-${current}-${i}`}
                  className="group relative bg-neutral-50 rounded-2xl border border-neutral-100 p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/5 hover:border-primary-100 hover:bg-white"
                  style={{
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Quote accent */}
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-primary-300" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-accent-400 fill-accent-400"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <blockquote className="text-sm text-neutral-600 leading-relaxed flex-1 mb-5 text-wrap:pretty">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/60">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-neutral-200 group-hover:ring-primary-200 transition-all duration-300">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">
                        {review.name}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 sm:w-11 sm:h-11 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 active:scale-95 z-10 shadow-md shadow-neutral-900/10"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 sm:w-11 sm:h-11 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-neutral-400 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 active:scale-95 z-10 shadow-md shadow-neutral-900/10"
              aria-label="Avis suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots + status */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary-500 w-6"
                    : "bg-neutral-300 hover:bg-neutral-400 w-1.5"
                }`}
                aria-label={`Avis ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
              />
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 mt-3">
            {paused ? "Pause" : "Défilement automatique"}
          </p>

          {/* CTA */}
          <ScrollReveal delay={100}>
            <div className="text-center mt-10">
              <Link
                href="/formulaire"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/35 transition-all duration-200 min-h-[48px] active:scale-[0.97]"
              >
                Devenir client
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
