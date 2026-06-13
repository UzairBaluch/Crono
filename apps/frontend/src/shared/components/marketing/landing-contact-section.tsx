"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Send, Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

type FormState = "idle" | "submitting" | "success";

export interface ContactPrefill {
  topic: string;
  message: string;
}

interface LandingContactSectionProps {
  prefill?: ContactPrefill | null;
  onPrefillConsumed?: () => void;
}

export function LandingContactSection({
  prefill,
  onPrefillConsumed,
}: LandingContactSectionProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [topic, setTopic] = useState("feedback");
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!prefill) return;
    setTopic(prefill.topic);
    setMessage(prefill.message);
    setFormState("idle");
    onPrefillConsumed?.();
    requestAnimationFrame(() => {
      messageRef.current?.focus();
    });
  }, [prefill, onPrefillConsumed]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setFormState("success");
  }

  if (formState === "success") {
    return (
      <section id="contact" className="mt-28 md:mt-32">
        <Card className="panel-glow mx-auto max-w-lg p-8 text-center animate-scale-in">
          <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
          <h2 className="mt-4 text-xl font-medium">Thanks — we got it!</h2>
          <p className="mt-2 text-sm text-muted">
            Your message is saved locally for this demo. When Crono launches,
            this goes to our inbox. Mean time — try the API demos above.
          </p>
          <Button
            variant="secondary"
            className="mt-6 h-10"
            onClick={() => {
              setFormState("idle");
              setMessage("");
            }}
          >
            Send another
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section id="contact" className="mt-28 md:mt-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
            Tell us what you think
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Feedback, support, or partnership — every message helps shape
            Crono before launch. Rate your experience with the demos above.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                title: "Early access feedback",
                desc: "What confused you? What would make you switch from VPS cron?",
              },
              {
                title: "Feature requests",
                desc: "Missing an integration? Tell us — roadmap is still open.",
              },
              {
                title: "Enterprise / volume",
                desc: "Need more than 500 jobs? We'll reach out personally.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/80 bg-card/60 p-4 transition-colors hover:border-accent-muted/30 hover:bg-accent-subtle/20"
              >
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="panel-glow p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-1.5 text-sm">
                <span className="text-muted">Name</span>
                <input
                  required
                  name="name"
                  placeholder="Uzair"
                  className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
                />
              </label>
              <label className="block space-y-1.5 text-sm">
                <span className="text-muted">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
                />
              </label>
            </div>

            <label className="block space-y-1.5 text-sm">
              <span className="text-muted">Topic</span>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
              >
                <option value="feedback">Product feedback</option>
                <option value="support">Support question</option>
                <option value="partnership">Partnership</option>
                <option value="enterprise">Enterprise / volume</option>
              </select>
            </label>

            <div className="space-y-2">
              <span className="text-sm text-muted">Rate the demos (optional)</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus-ring rounded-lg p-1 transition-transform hover:scale-110"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (hoverRating || rating)
                          ? "fill-warning text-warning"
                          : "text-muted"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <label className="block space-y-1.5 text-sm">
              <span className="text-muted">Message</span>
              <textarea
                ref={messageRef}
                required
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would make Crono a must-have for your stack?"
                className="focus-ring w-full rounded-xl border border-border bg-card-secondary px-3 py-2 text-foreground outline-none"
              />
            </label>

            <Button
              type="submit"
              className="h-10 w-full gap-2"
              disabled={formState === "submitting"}
            >
              <Send className="h-4 w-4" />
              {formState === "submitting" ? "Sending…" : "Send message"}
            </Button>
            <p className="text-center text-[11px] text-muted">
              Demo form — no data sent to a server yet.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
