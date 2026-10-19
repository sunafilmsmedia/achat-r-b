"use client";

import { motion } from "framer-motion";

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
}

// Même langage visuel qu'une ChoiceQuestion (carte + rond à droite) plutôt
// qu'une case à cocher de formulaire — ça reste « une question du quiz ».
export default function ConsentQuestion({ checked, onChange }: Props) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onChange(!checked)}
      className={`
        group relative w-full text-left
        rounded-2xl px-5 py-5
        transition-all duration-200
        ${
          checked
            ? "bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] border border-[var(--color-brand-400)] shadow-[0_12px_30px_-10px_rgba(0, 0, 0, 0.65)]"
            : "glass-card hover:border-[var(--color-slate-accent)]/20 hover:bg-white/[0.09]"
        }
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <p className={`text-sm leading-relaxed ${checked ? "text-white" : "text-[var(--color-brand-100)]"}`}>
          J&apos;accepte que l&apos;équipe Roux et Bachand m&apos;envoie mon guide
          gratuit et me contacte au sujet de mon projet d&apos;achat.
        </p>
        <span
          className={`
            shrink-0 w-5 h-5 rounded-full border transition-all
            ${
              checked
                ? "bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                : "border-[var(--color-slate-accent)]/25 group-hover:border-[var(--color-slate-accent)]/45"
            }
          `}
          aria-hidden
        />
      </div>
    </motion.button>
  );
}
