"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-3 right-4 z-[100] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 bg-white/80 backdrop-blur-sm shadow-sm"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Menu de navigation"
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[95] transition-transform duration-300 ease-out md:hidden shadow-2xl overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-display font-bold text-lg text-primary-700">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4" aria-label="Navigation mobile">
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-lg font-medium rounded-lg transition-colors min-h-[48px]",
                    pathname === link.href
                      ? "text-primary-600 bg-primary-50"
                      : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/formulaire"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-center min-h-[48px]"
              >
                Comparer
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t space-y-4">
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center justify-center gap-2 font-semibold text-primary-700 hover:text-primary-800 min-h-[48px]"
          >
            {SITE.phoneFormatted}
          </a>
          <SocialLinks className="justify-center" />
        </div>
      </div>
    </>
  );
}
