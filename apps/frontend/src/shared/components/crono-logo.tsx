import { cn } from "@/shared/lib/utils";

interface CronoLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export function CronoLogo({
  size = 28,
  className,
  showWordmark = false,
}: CronoLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        width={size}
        height={size}
        aria-hidden
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#0A0A0A" />
        <path
          d="M32 14C22.059 14 14 22.059 14 32C14 41.941 22.059 50 32 50C39.27 50 45.533 45.696 48.365 39.5H40.782C38.863 42.078 35.797 43.75 32.34 43.75C26.537 43.75 21.833 39.046 21.833 33.243C21.833 27.44 26.537 22.737 32.34 22.737C35.796 22.737 38.863 24.408 40.782 26.987H48.365C45.533 20.791 39.27 16.487 32 16.487V14Z"
          fill="#FAFAFA"
        />
        <circle cx="45.5" cy="20.5" r="4.5" fill="#3B82F6" />
      </svg>
      {showWordmark ? (
        <span className="text-sm font-semibold tracking-tight">Crono</span>
      ) : null}
    </span>
  );
}
