import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97]",
        variant === "primary" &&
          "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md hover:shadow-primary-600/20 focus-visible:outline-primary-600",
        variant === "secondary" &&
          "bg-white text-primary-700 border-2 border-primary-600 hover:bg-primary-50 hover:border-primary-700 focus-visible:outline-primary-600",
        variant === "outline" &&
          "bg-transparent text-primary-700 border border-neutral-300 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50",
        size === "sm" && "px-4 py-2 text-sm min-h-[40px]",
        size === "md" && "px-6 py-3 text-base min-h-[48px]",
        size === "lg" && "px-8 py-4 text-lg min-h-[56px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
