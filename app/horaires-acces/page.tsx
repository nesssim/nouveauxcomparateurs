import type { Metadata } from "next";
import { SITE, HOURS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MapPin, Phone, Clock, Home, ExternalLink } from "lucide-react";

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

          {/* Quick info cards — horizontal row */}
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {todayHours && (
                <div className="flex items-center gap-4 bg-primary-50 border border-primary-100 rounded-2xl p-5 transition-shadow hover:shadow-md hover:shadow-primary-600/5">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-primary-600/20">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-500 font-medium uppercase tracking-wide">Aujourd&apos;hui</p>
                    <p className="text-lg font-display font-bold text-primary-800 tabular-nums">
                      {todayHours.hours}
                    </p>
                  </div>
                </div>
              )}

              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-4 bg-neutral-50 border border-neutral-100 rounded-2xl p-5 transition-all hover:shadow-md hover:shadow-neutral-900/5 hover:border-neutral-200 group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-neutral-100 group-hover:border-primary-200 transition-colors">
                  <Phone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Téléphone</p>
                  <p className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {SITE.phoneFormatted}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-100 rounded-2xl p-5 transition-shadow hover:shadow-md hover:shadow-neutral-900/5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-neutral-100">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Adresse</p>
                  <p className="text-sm font-medium text-neutral-900 leading-snug">
                    {SITE.address.street}<br />
                    {SITE.address.postalCode} {SITE.address.city}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Hours table + Map — side by side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Hours table */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-5">
                  Horaires d&apos;ouverture
                </h2>
                <div className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
                  {HOURS.map((item) => {
                    const isToday = item.day.toLowerCase() === currentDay.toLowerCase();
                    return (
                      <div
                        key={item.day}
                        className={`flex justify-between items-center px-5 py-3.5 border-b border-neutral-100 last:border-0 transition-colors ${
                          isToday ? "bg-primary-50" : "hover:bg-neutral-100/50"
                        }`}
                      >
                        <span className={`text-sm font-medium ${isToday ? "text-primary-700" : "text-neutral-900"}`}>
                          {item.day}
                          {isToday && <span className="ml-1.5 text-[11px] font-normal text-primary-500">(aujourd&apos;hui)</span>}
                        </span>
                        <span
                          className={`text-sm tabular-nums ${
                            item.hours === "Fermé"
                              ? "text-neutral-400"
                              : isToday
                              ? "text-primary-700 font-semibold"
                              : "text-neutral-600"
                          }`}
                        >
                          {item.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Home visit card */}
                <div className="mt-6 p-5 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl border border-primary-100 transition-shadow hover:shadow-md hover:shadow-primary-600/5">
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1 text-sm">
                        Rendez-vous à domicile
                      </h3>
                      <p className="text-primary-700/80 text-sm leading-relaxed">
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
                  className="group relative rounded-2xl overflow-hidden h-full min-h-[350px] lg:min-h-[500px] bg-neutral-200 shadow-lg border border-neutral-100 block transition-shadow hover:shadow-xl hover:shadow-neutral-900/10"
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
