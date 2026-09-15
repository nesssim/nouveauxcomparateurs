import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/form/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Demandez votre étude gratuite",
  description:
    "Formulaire de demande de comparaison mutuelle. Un conseiller vous recontacte sous 24h pour un rendez-vous à domicile.",
};

export default function FormulairePage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Demandez votre étude gratuite
          </h1>
          <p className="text-lg text-neutral-600">
            Un conseiller vous recontacte sous 24h pour planifier un rendez-vous
            à domicile.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <LeadCaptureForm />
        </div>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Service gratuit et sans engagement. ORIAS N° 21008094.
        </p>
      </div>
    </section>
  );
}
