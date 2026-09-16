"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 shrink-0",
        className
      )}
      aria-label={`${SITE.name} — Accueil`}
    >
      {!imgError ? (
        <Image
          src="/images/logo.webp"
          alt={SITE.name}
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          className="object-contain"
          style={{ width: "auto", height: "auto" }}
          priority
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={cn(
          "flex items-center justify-center rounded-xl bg-primary-600 text-white font-bold font-display",
          size === "sm" && "w-8 h-8 text-sm",
          size === "md" && "w-10 h-10 text-base",
          size === "lg" && "w-12 h-12 text-lg"
        )}>
          NC
        </div>
      )}
      <span className="hidden md:block font-display font-bold text-primary-700 text-lg leading-tight">
        Les Nouveaux<br />Comparateurs
      </span>
    </Link>
  );
}
