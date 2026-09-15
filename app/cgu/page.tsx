import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE } from "@/lib/constants";

export default function CGUPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              CGU & Politique de confidentialité
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Conditions d&apos;utilisation et protection de vos données personnelles
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
          <h2>Conditions Générales d&apos;Utilisation</h2>

          <h3>Article 1 — Informations légales</h3>
          <p>
            La société {SITE.name}, {SITE.legalForm} au capital de{" "}
            {SITE.capital}, dont le siège social est sis {SITE.address.full},
            immatriculée au RCS de {SITE.rcs} sous le numéro {SITE.siren},
            représentée par {SITE.director}.
          </p>

          <h3>Article 2 — Champ d&apos;application</h3>
          <p>
            Les présentes conditions générales d&apos;utilisation du Site
            s&apos;appliquent, sans restriction ni réserve, à tout accès et à
            toute utilisation du Site de la Société par des Utilisateurs.
          </p>

          <h3>Article 3 — Accès au Site</h3>
          <p>
            Le Site est accessible gratuitement aux Utilisateurs disposant
            d&apos;une connexion internet. Tous les coûts afférents à
            l&apos;accès au Site sont exclusivement à la charge de
            l&apos;Utilisateur.
          </p>

          <h3>Article 4 — Propriété intellectuelle</h3>
          <p>
            Toute reproduction, représentation, utilisation ou adaptation, sous
            quelque forme que ce soit, de tout ou partie de ces éléments sans
            l&apos;accord préalable et écrit de la Société sont strictement
            interdites.
          </p>

          <hr />

          <h2>Politique de confidentialité</h2>

          <h3>Responsable de traitement</h3>
          <p>
            Le traitement des données à caractère personnel est mis en œuvre sous
            la responsabilité de {SITE.name}, {SITE.address.full},
            représentée par {SITE.director}.
          </p>

          <h3>Données collectées</h3>
          <p>
            La Société collecte les données suivantes : données
            d&apos;identification (nom, prénom, coordonnées), données de
            contact (email, téléphone, adresse postale).
          </p>

          <h3>Durée de conservation</h3>
          <p>
            Les données personnelles sont conservées pour une durée de 3 ans à
            compter du dernier contact avec l&apos;Utilisateur.
          </p>

          <h3>Droits des utilisateurs</h3>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement, de limitation, de portabilité et
            d&apos;opposition concernant vos données personnelles.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à {SITE.email} ou par
            courrier à {SITE.address.full}.
          </p>

          <h3>Cookies</h3>
          <p>
            Le Site utilise des cookies pour améliorer
            l&apos;expérience de navigation. Vous pouvez gérer vos préférences
            via la bannière de consentement affichée lors de votre première
            visite.
          </p>

          <h3>Réclamation</h3>
          <p>
            En cas de réclamation, vous pouvez contacter la CNIL : 3 Place de
            Fontenoy, TSA 80715, 75334 PARIS CEDEX 07.
          </p>
        </div>
      </section>
    </>
  );
}
