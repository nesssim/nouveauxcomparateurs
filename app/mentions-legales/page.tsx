import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE } from "@/lib/constants";

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Mentions légales
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Informations légales et réglementaires du site
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
          <h2>Identification de l&apos;Éditeur</h2>
          <p>
            Le site {SITE.name} (ci-après &laquo;&nbsp;le Site&nbsp;&raquo;),
            accessible à l&apos;adresse {SITE.url}, est édité par la société{" "}
            {SITE.name}, {SITE.legalForm} au capital de {SITE.capital}, dont le
            siège social est situé {SITE.address.full}, immatriculée au RCS de{" "}
            {SITE.rcs} sous le numéro {SITE.siren}, représentée par{" "}
            {SITE.director}, agissant en qualité de président.
          </p>
          <p>
            N° de TVA intracommunautaire : {SITE.tva}
          </p>
          <p>
            N° ORIAS : {SITE.orias}
          </p>

          <h2>Contact</h2>
          <ul>
            <li>
              Courrier : {SITE.address.full}
            </li>
            <li>
              Téléphone : {SITE.phoneFormatted}
            </li>
            <li>
              Courriel : {SITE.email}
            </li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>{SITE.director}</p>

          <h2>Hébergeur du site internet</h2>
          <p>Vercel Inc.</p>
          <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>

          <h2>Respect de la propriété intellectuelle</h2>
          <p>
            Toutes les marques, photographies, textes, commentaires,
            illustrations, images animées ou non, séquences vidéo, sons, ainsi
            que toutes les applications informatiques qui pourraient être
            utilisées pour faire fonctionner le Site et plus généralement tous
            les éléments reproduits ou utilisés sur le Site sont protégés par
            les lois en vigueur au titre de la propriété intellectuelle.
          </p>
          <p>
            Ils sont la propriété pleine et entière de l&apos;Éditeur ou de ses
            partenaires, sauf mentions particulières. Toute reproduction,
            représentation, utilisation ou adaptation, sous quelque forme que ce
            soit, de tout ou partie de ces éléments, y compris les applications
            informatiques, sans l&apos;accord préalable et écrit de
            l&apos;Éditeur, sont strictement interdites.
          </p>

          <h2>Liens hypertextes</h2>
          <p>
            Le Site peut contenir des liens hypertexte donnant accès à
            d&apos;autres sites web édités et gérés par des tiers et non par
            l&apos;Éditeur. L&apos;Éditeur ne pourra être tenu responsable
            directement ou indirectement dans le cas où lesdits sites tiers ne
            respecteraient pas les dispositions légales.
          </p>
        </div>
      </section>
    </>
  );
}
