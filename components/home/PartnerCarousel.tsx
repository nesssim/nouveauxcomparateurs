"use client";

import Image from "next/image";
import { PARTNERS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function PartnerLogo({ name }: { name: string }) {
  const safeName = name.toLowerCase().replace(/ /g, "-").replace(/é/g, "e");
  const src = `/images/partners/${safeName}.png`;

  return (
    <div className="relative w-full h-full flex items-center justify-center py-2">
      <Image
        src={src}
        alt={name}
        fill
        sizes="256px"
        className="object-contain transition-all duration-300 !outline-none !border-none !rounded-none"
      />
    </div>
  );
}

export function PartnerCarousel() {
  const duplicated = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <p className="text-center text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">
            Nos partenaires
          </p>
          <h2 className="text-center font-display text-2xl md:text-3xl font-bold text-neutral-900">
            Plus de 40 mutuelles à votre service
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left hover:[animation-play-state:paused] items-center" style={{ width: "max-content" }}>
          {duplicated.map((partner, i) => (
            <div
              key={`${partner}-${i}`}
              className="relative flex-shrink-0 mx-6 flex items-center justify-center h-20 w-32 px-2 transition-all duration-300"
              title={partner}
            >
              <PartnerLogo name={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

