"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export function Header() {
  const scrollDirection = useScrollDirection({ threshold: 10 });
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100",
        "transition-transform duration-300 ease-out",
        "max-md:translate-y-0",
        scrollDirection === "down" && "md:-translate-y-full",
        scrollDirection === "up" && "shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          <Logo size="md" />

          {/* Centered company name — mobile/tablet only */}
          <span className="md:hidden absolute left-1/2 -translate-x-1/2 font-display font-bold text-primary-700 text-sm leading-tight text-center whitespace-nowrap">
            Les Nouveaux Comparateurs
          </span>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 min-h-[40px] flex items-center",
                  pathname === link.href
                    ? "text-primary-600 bg-primary-50"
                    : "text-neutral-600 hover:text-primary-600 hover:bg-primary-50/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors min-h-[40px] px-3 py-2 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              {SITE.phoneFormatted}
            </a>

            <Link
              href="/formulaire"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md hover:shadow-primary-600/20 transition-all duration-200 min-h-[44px] active:scale-[0.97]"
            >
              Comparer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
