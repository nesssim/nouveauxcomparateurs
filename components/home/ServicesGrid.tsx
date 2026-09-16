"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Shield, Heart, Umbrella, Scale, ArrowRight } from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  mutuelle: Shield,
  "chiens-chats": Heart,
  obseques: Umbrella,
  "protection-juridique": Scale,
};

function ServiceCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  const [imgError, setImgError] = useState(false);
  const Icon = ICONS[product.id] || Shield;

  return (
    <a
      href="/formulaire"
      className="group block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/8 transition-all duration-500 ease-out border border-neutral-100 hover:border-primary-100"
    >
      <div className="relative h-60 overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-20 h-20 text-primary-300 group-hover:scale-110 group-hover:text-primary-400 transition-all duration-500" />
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Price badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-sm text-primary-700 text-sm font-bold shadow-sm">
          À partir de {product.price}€/mois
        </div>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-500 mb-4 leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="flex items-center text-primary-600 text-sm font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
          En savoir plus
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </a>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-24 bg-neutral-50 relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nos produits"
          subtitle="Nous comparons les meilleures offres pour vous protéger"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 100} className="h-full">
              <ServiceCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
