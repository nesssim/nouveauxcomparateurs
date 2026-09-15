import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { MapPin, Mail, Phone } from "lucide-react";
import { LeadCaptureForm } from "@/components/form/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Nous contacter",
  description:
    "Contactez Les Nouveaux Comparateurs par téléphone, email ou rendez-vous. Courtier en assurances à Abbeville.",
};

export default function NousContacterPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Nous contacter
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              On reste en contact ! N&apos;hésitez pas à nous écrire ou à nous
              appeler.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      Téléphone
                    </h3>
                    <PhoneLink />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-primary-600 hover:text-primary-700 inline-flex items-center"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      Adresse
                    </h3>
                    <p className="text-neutral-600">{SITE.address.full}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-neutral-900 mb-3">
                    Suivez-nous
                  </h3>
                  <SocialLinks />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-neutral-50 rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-6">
                  Envoyez-nous un message
                </h2>
                <LeadCaptureForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
