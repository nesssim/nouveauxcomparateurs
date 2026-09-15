import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function CTAButton({
  href,
  variant = "primary",
  size = "lg",
  children,
  className,
}: CTAButtonProps) {
  return (
    <Link href={href} className={cn("inline-flex", className)}>
      <Button variant={variant} size={size}>
        {children}
      </Button>
    </Link>
  );
}
