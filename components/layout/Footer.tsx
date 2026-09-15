import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white relative">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-xl font-bold mb-4">
              {SITE.name}
            </h3>
            <p className="text-neutral-400 mb-6 leading-relaxed">{SITE.slogan}</p>
            <div className="flex items-start gap-2 text-neutral-400 mb-6">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-primary-400" />
              <span className="leading-relaxed break-words">{SITE.address.full}</span>
            </div>
            <SocialLinks className="text-neutral-400" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Navigation</h4>
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white hover:pl-1 transition-all duration-200 min-h-[40px] inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-neutral-400 hover:text-white hover:pl-1 transition-all duration-200 min-h-[40px] inline-flex items-center"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/cgu"
                  className="text-neutral-400 hover:text-white hover:pl-1 transition-all duration-200 min-h-[40px] inline-flex items-center"
                >
                  CGU & Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Contact</h4>
            <PhoneLink className="text-white hover:text-primary-300 mb-4 transition-colors" />
            <p className="text-neutral-400 mb-6 break-all">{SITE.email}</p>
            <a
              href="/formulaire"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-500 transition-all duration-200 active:scale-[0.97]"
            >
              Comparer
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <p className="text-neutral-600 text-xs">
            ORIAS N° {SITE.orias} | {SITE.legalForm} {SITE.siren}
          </p>
        </div>
      </div>
    </footer>
  );
}
