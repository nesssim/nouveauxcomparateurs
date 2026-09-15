import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-14", className)}>
      {/* Accent line */}
      <div className={cn(
        "w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full mb-6",
        centered && "mx-auto"
      )} />
      <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
