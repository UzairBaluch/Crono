import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";
import { themeClasses } from "@/lib/theme";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: themeClasses.button.primary,
  secondary: themeClasses.button.secondary,
  danger: themeClasses.button.danger
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
