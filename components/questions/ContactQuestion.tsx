"use client";

import { useEffect } from "react";
import { trackStep } from "@/lib/track";
import type { Answers } from "@/lib/types";

interface Props {
  answers: Answers;
  onUpdate: (partial: Partial<Answers>, autoAdvance: boolean) => void;
}

export default function ContactQuestion({ answers, onUpdate }: Props) {
  useEffect(() => {
    trackStep("coordonnees");
  }, []);

  return (
    <div className="space-y-3">
      <Field
        label="Nom complet"
        required
        autoComplete="name"
        value={answers.fullName ?? ""}
        onChange={(v) => onUpdate({ fullName: v }, false)}
        placeholder="Marie Tremblay"
      />
      <Field
        label="Courriel"
        required
        type="email"
        autoComplete="email"
        value={answers.email ?? ""}
        onChange={(v) => onUpdate({ email: v }, false)}
        placeholder="marie@exemple.ca"
      />
      <Field
        label="Téléphone"
        required
        type="tel"
        autoComplete="tel"
        value={answers.phone ?? ""}
        onChange={(v) => onUpdate({ phone: v }, false)}
        placeholder="(819) 555-0123"
        helper="Pour qu'un courtier puisse te joindre rapidement."
      />

      <label className="flex items-start gap-3 cursor-pointer group select-none pt-2">
        <span className="relative shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={!!answers.consent}
            onChange={(e) => onUpdate({ consent: e.target.checked }, false)}
            className="peer sr-only"
          />
          <span className="block w-5 h-5 rounded-md border border-[var(--color-slate-accent)]/30 bg-white/[0.09] peer-checked:bg-[var(--color-brand-500)] peer-checked:border-[var(--color-brand-400)] transition-colors" />
          <svg
            className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 6.5L4.5 9L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          J&apos;accepte que l&apos;équipe Roux et Bachand m&apos;envoie mon guide
          gratuit et puisse me contacter au sujet de mon projet d&apos;achat.
        </span>
      </label>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  helper?: string;
}

function Field({ label, value, onChange, placeholder, type = "text", required, autoComplete, helper }: FieldProps) {
  return (
    <div>
      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 block">
          {label} {required && <span className="text-[var(--color-gold)]">*</span>}
        </span>
        <input
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full glass-card rounded-xl px-4 py-3
            text-[var(--color-brand-100)] placeholder:text-slate-400/60
            focus-within:border-[var(--color-brand-400)]/60
            transition-colors
            text-base
          "
        />
      </label>
      {helper && <p className="text-[11px] text-slate-500 mt-1.5">{helper}</p>}
    </div>
  );
}
