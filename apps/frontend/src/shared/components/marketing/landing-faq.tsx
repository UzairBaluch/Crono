import { ChevronDown } from "lucide-react";
import { FAQS } from "@/shared/lib/marketing-content";

export function LandingFaq() {
  return (
    <section id="faq" className="mt-28 md:mt-32">
      <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
        FAQ
      </h2>
      <div className="mt-8 space-y-2.5">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-border/80 bg-card/65 p-5 transition-colors duration-200 hover:bg-card-secondary/70"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium tracking-tight">
              {faq.q}
              <ChevronDown className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-muted">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
