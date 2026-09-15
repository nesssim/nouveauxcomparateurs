"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      previousFocus.current = document.activeElement as HTMLElement;
      bannerRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRefuse();
    };
    if (visible) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [visible]);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  const handleRefuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal={true}
      aria-label="Consentement aux cookies"
      tabIndex={-1}
      className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 text-white p-4 md:p-6 shadow-2xl"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience de
              navigation, mesurer l&apos;audience du site et personnaliser les
              contenus. Vous pouvez accepter ou refuser ces cookies.
            </p>
            {expanded && (
              <div className="mt-4 space-y-3 text-sm text-neutral-400">
                <div className="flex items-center justify-between">
                  <span>Cookies fonctionnels (navigation, préférences)</span>
                  <span className="text-green-400">Toujours actifs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cookies statistiques (mesure d&apos;audience)</span>
                  <span>Selon consentement</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cookies marketing (publicité ciblée)</span>
                  <span>Selon consentement</span>
                </div>
                <Link
                  href="/cgu#cookies"
                  className="underline hover:text-white"
                >
                  En savoir plus sur notre politique de cookies
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors min-h-[48px]"
            >
              {expanded ? "Masquer les détails" : "Gérer les options"}
            </button>
            <button
              onClick={handleRefuse}
              className="px-6 py-2 text-sm border border-neutral-600 rounded-lg hover:border-white transition-colors min-h-[48px]"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors min-h-[48px]"
            >
              Tout accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useCookieConsent(): string | null {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem("cookie-consent"));

    const onChange = () => {
      setConsent(localStorage.getItem("cookie-consent"));
    };

    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, []);

  return consent;
}
