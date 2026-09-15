"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setValue(current);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 30, suffix: "%", label: "d'économies", sublabel: "sur votre mutuelle santé" },
  { value: 480, suffix: "€", label: "économisés", sublabel: "en moyenne par an" },
  { value: 20, suffix: "€", label: "à partir de", sublabel: "par mois" },
  { value: 7, suffix: "", label: "départements", sublabel: "couverts en France" },
];

export function ValueProposition() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-50/30 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-accent-100 rounded-full opacity-30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Une couverture
              <span className="text-primary-600"> sur-mesure</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Nous évitons les facturations de prestations inutiles en concevant
              votre couverture santé sur-mesure, ce qui permet des économies
              significatives sur vos cotisations.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative bg-white rounded-2xl p-5 md:p-6 text-center shadow-sm border border-neutral-100 hover:shadow-lg hover:shadow-primary-600/8 hover:border-primary-100 transition-all duration-500 group overflow-hidden"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-2 leading-none">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-semibold text-neutral-900">
                  {stat.label}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {stat.sublabel}
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-primary-200 group-hover:bg-primary-500 group-hover:w-20 transition-all duration-500" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-bold text-neutral-900 text-center mb-6">
              Notre démarche
            </h3>
            <ul className="space-y-4">
              {[
                "Étude comparative approfondie de votre situation",
                "Sélection parmi 40+ mutuelles partenaires",
                "Rendez-vous physique à domicile, jamais à distance",
                "Budget épargné recyclé dans l'économie locale",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 group">
                  <span className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-neutral-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
