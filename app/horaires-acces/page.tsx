import type { Metadata } from "next";
import { SITE, HOURS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MapPin, Phone, Clock, Car, Home, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Horaires & Accès",
  description:
    "Horaires d'ouverture et accès aux locaux des Nouveaux Comparateurs à Abbeville. Rendez-vous à domicile disponible.",
};

export default function HorairesAccesPage() {
  const currentDay = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
  const todayHours = HOURS.find(
    (h) => h.day.toLowerCase() === currentDay.toLowerCase()
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Horaires & Accès
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Retrouvez-nous à Abbeville ou demandez un rendez-vous à domicile
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — Info */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                {/* Today highlight */}
                {todayHours && (
                  <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-primary-600 font-medium">Aujourd&apos;hui</p>
                        <p className="text-xl font-display font-bold text-primary-800">
                          {todayHours.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Adresse</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {SITE.address.street}<br />
                      {SITE.address.postalCode} {SITE.address.city}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Téléphone</h3>
                    <a
                      href={`tel:${SITE.phone}`}
                      className="text-primary-600 hover:text-primary-700 font-medium min-h-[48px] inline-flex items-center"
                    >
                      {SITE.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex items-start gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Parking</h3>
                    <p className="text-neutral-600">Stationnement gratuit à proximité</p>
                  </div>
                </div>

                {/* Hours table */}
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
                  Horaires d&apos;ouverture
                </h2>
                <div className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
                  {HOURS.map((item) => {
                    const isToday = item.day.toLowerCase() === currentDay.toLowerCase();
                    return (
                      <div
                        key={item.day}
                        className={`flex justify-between items-center px-6 py-3.5 border-b border-neutral-100 last:border-0 ${
                          isToday ? "bg-primary-50" : ""
                        }`}
                      >
                        <span className={`font-medium ${isToday ? "text-primary-700" : "text-neutral-900"}`}>
                          {item.day}
                          {isToday && <span className="ml-2 text-xs font-normal text-primary-500">(aujourd&apos;hui)</span>}
                        </span>
                        <span
                          className={
                            item.hours === "Fermé"
                              ? "text-neutral-400"
                              : isToday
                              ? "text-primary-700 font-semibold"
                              : "text-neutral-700"
                          }
                        >
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Home visit */}
                <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl border border-primary-100">
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-primary-700 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1">
                        Rendez-vous à domicile
                      </h3>
                      <p className="text-primary-700 text-sm leading-relaxed">
                        Nous nous déplaçons chez vous pour un rendez-vous personnalisé.
                        Contactez-nous pour convenir d&apos;une date et heure.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — Map */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={200}>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    SITE.address.street + ", " + SITE.address.postalCode + " " + SITE.address.city + ", " + SITE.address.country
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-neutral-200 shadow-lg border border-neutral-100 block"
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      SITE.address.street + ", " + SITE.address.postalCode + " " + SITE.address.city + ", " + SITE.address.country
                    )}&z=15&output=embed`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                      pointerEvents: "none",
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte — Les Nouveaux Comparateurs"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg flex items-center gap-3 group-hover:bg-white transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                      <ExternalLink className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Ouvrir dans Google Maps</p>
                      <p className="text-xs text-neutral-500">{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}</p>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
