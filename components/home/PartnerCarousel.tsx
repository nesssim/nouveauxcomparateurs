"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface PartnerImage {
  name: string;
  file: string;
}

function PartnerLogo({ file, name }: { file: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center py-2">
      <Image
        src={`/images/partners/${file}`}
        alt={name}
        fill
        sizes="256px"
        className="object-contain transition-all duration-300 !outline-none !border-none !rounded-none"
        onError={() => setError(true)}
      />
    </div>
  );
}

export function PartnerCarousel() {
  const [partners, setPartners] = useState<PartnerImage[]>([]);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then(setPartners)
      .catch(() => setPartners([]));
  }, []);

  if (partners.length === 0) return null;

  const duplicated = [...partners, ...partners];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <p className="text-center text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">
            Nos partenaires
          </p>
          <h2 className="text-center font-display text-2xl md:text-3xl font-bold text-neutral-900">
            Plus de {partners.length} mutuelles à votre service
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
              key={`${partner.file}-${i}`}
              className="relative flex-shrink-0 mx-6 flex items-center justify-center h-20 w-32 px-2 transition-all duration-300"
              title={partner.name}
            >
              <PartnerLogo file={partner.file} name={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
