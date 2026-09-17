"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FormSuccessProps {
  prenom: string;
}

export function FormSuccess({ prenom }: FormSuccessProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center py-12 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Animated checkmark */}
      <div className="relative inline-flex mb-6">
        <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse" />
        <div
          className={`relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center transition-all duration-700 delay-200 ${
            show ? "scale-100" : "scale-0"
          }`}
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
      </div>

      {/* Title */}
      <h3
        className={`font-display text-3xl font-bold text-neutral-900 mb-3 transition-all duration-500 delay-300 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Merci {prenom} !
      </h3>

      {/* Subtitle */}
      <p
        className={`text-lg text-neutral-600 max-w-md mx-auto mb-8 transition-all duration-500 delay-400 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Votre demande a bien été enregistrée. Un conseiller vous recontacte
        sous <span className="font-semibold text-primary-600">48h</span> pour
        planifier un rendez-vous à domicile.
      </p>

      {/* Info card */}
      <div
        className={`flex justify-center mb-8 transition-all duration-500 delay-500 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl px-5 py-3">
          <Phone className="w-5 h-5 text-primary-600 shrink-0" />
          <span className="text-sm font-medium text-primary-700">
            Contact sous 48h
          </span>
        </div>
      </div>

      {/* CTA */}
      <div
        className={`transition-all duration-500 delay-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary-600 transition-colors"
        >
          Retour à l&apos;accueil
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
