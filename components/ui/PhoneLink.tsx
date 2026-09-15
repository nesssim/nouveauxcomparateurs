import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PhoneLinkProps {
  className?: string;
  showIcon?: boolean;
}

export function PhoneLink({ className, showIcon = true }: PhoneLinkProps) {
  return (
    <a
      href={`tel:${SITE.phone}`}
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800 transition-colors",
        "min-h-[48px] min-w-[48px]",
        className
      )}
      aria-label={`Appelez-nous au ${SITE.phoneFormatted}`}
    >
      {showIcon && <Phone className="w-5 h-5" />}
      <span>{SITE.phoneFormatted}</span>
    </a>
  );
}
