import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";
import { themeClasses } from "@/shared/lib/theme";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(themeClasses.card.base, "p-5", className)} {...props} />;
}
