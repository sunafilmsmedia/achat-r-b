import type { Answers } from "./types";

export type QuestionId =
  | "financingStatus"
  | "propertyType"
  | "regions"
  | "purchaseTimeline"
  | "journeyStage"
  | "buyingWith"
  | "householdIncome"
  | "downPayment"
  | "currentHomeValue"
  | "employment"
  | "workingWithBroker"
  | "fullName"
  | "email"
  | "phone"
  | "consent";

export type QuestionKind = "choice" | "regions" | "currency" | "text" | "consent";

export interface Choice<V extends string = string> {
  value: V;
  label: string;
  hint?: string;
}

export interface QuestionDef {
  id: QuestionId;
  kind: QuestionKind;
  title: string;
  subtitle?: string;
  choices?: Choice[];
  autoAdvance?: boolean;
  showIf?: (a: Answers) => boolean;
  // kind "text" seulement.
  inputType?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  helper?: string;
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: "financingStatus",
    kind: "choice",
    title: "Es-tu déjà préqualifié pour une hypothèque ?",
    subtitle: "Aucune mauvaise réponse — ça nous dit simplement où tu en es.",
    autoAdvance: true,
    choices: [
      { value: "preapproved", label: "Oui, je suis préapprouvé", hint: "Une lettre d'un prêteur en main" },
      { value: "prequalified", label: "Oui, je suis préqualifié", hint: "Un montant estimé par un courtier hypothécaire" },
      { value: "in_process", label: "C'est en cours", hint: "J'ai commencé les démarches" },
      { value: "not_started", label: "Pas encore", hint: "Je n'ai rien commencé de ce côté" },
    ],
  },
  {
    id: "propertyType",
    kind: "choice",
    title: "Quel type de propriété t'intéresse le plus ?",
    subtitle: "Celui vers lequel tu penches aujourd'hui.",
    autoAdvance: true,
    choices: [
      { value: "maison", label: "Maison unifamiliale", hint: "Détachée ou jumelée" },
      { value: "condo", label: "Condo", hint: "Copropriété" },
      { value: "plex", label: "Plex", hint: "Duplex, triplex, multilogement" },
      { value: "chalet", label: "Chalet", hint: "Résidence secondaire ou bord de l'eau" },
      { value: "ouvert", label: "Je suis ouvert", hint: "Ça dépend de l'opportunité" },
    ],
  },
  {
    id: "regions",
    kind: "regions",
    title: "Quel secteur t'intéresse le plus ?",
    subtitle: "Choisis-le dans la liste — ou écris le tien.",
    autoAdvance: true,
  },
  {
    id: "purchaseTimeline",
    kind: "choice",
    title: "Dans combien de temps aimerais-tu acheter ?",
    subtitle: "Ton meilleur estimé, sans pression.",
    autoAdvance: true,
    choices: [
      { value: "asap", label: "Dès que je trouve la bonne propriété" },
      { value: "0_3_mois", label: "Dans les 3 prochains mois" },
      { value: "3_6_mois", label: "Dans 3 à 6 mois" },
      { value: "6_12_mois", label: "Dans 6 à 12 mois" },
      { value: "plus_12_mois", label: "Dans plus de 12 mois", hint: "Je prépare mon projet" },
    ],
  },
  {
    id: "journeyStage",
    kind: "choice",
    title: "Où en es-tu dans ton parcours ?",
    subtitle: "Pour adapter notre accompagnement à ta situation.",
    autoAdvance: true,
    choices: [
      { value: "premiere_maison", label: "Ce sera ma première maison" },
      { value: "investisseur", label: "Je suis investisseur" },
      { value: "vendre_pour_acheter", label: "Je dois vendre pour acheter" },
      { value: "separation", label: "Je suis en séparation" },
    ],
  },
  {
    id: "buyingWith",
    kind: "choice",
    title: "Tu achètes seul(e) ou avec un co-acheteur ?",
    subtitle: "Ça change ce qui est réaliste pour ton budget.",
    autoAdvance: true,
    choices: [
      { value: "seul", label: "Seul(e)" },
      { value: "co_acheteur", label: "Avec un co-acheteur", hint: "Conjoint(e), parent, ami(e)…" },
      { value: "co_acheteurs", label: "Avec plus d'un co-acheteur", hint: "Deux co-acheteurs ou plus" },
    ],
  },
  {
    id: "householdIncome",
    kind: "currency",
    title: "Quel est le revenu brut annuel du ménage ?",
    subtitle: "Avant impôts, en additionnant les revenus de tous les acheteurs.",
  },
  {
    id: "downPayment",
    kind: "currency",
    title: "Combien as-tu de disponible pour la mise de fonds ?",
    subtitle: "Ce qui est réellement disponible aujourd'hui — REER et CELIAPP inclus.",
    // Quelqu'un qui doit vendre avant d'acheter n'a pas de mise de fonds à
    // déclarer : elle sortira de sa vente. On lui pose l'autre question.
    showIf: (a) => a.journeyStage !== "vendre_pour_acheter",
  },
  {
    id: "currentHomeValue",
    kind: "currency",
    title: "Combien vaut ta propriété actuelle, selon toi ?",
    subtitle: "Ton estimation à toi — c'est de là que viendra ta mise de fonds.",
    showIf: (a) => a.journeyStage === "vendre_pour_acheter",
  },
  {
    id: "employment",
    kind: "choice",
    title: "Quelle est ta situation d'emploi ?",
    subtitle: "C'est ce que les prêteurs regardent en premier.",
    autoAdvance: true,
    choices: [
      { value: "salarie_permanent", label: "Salarié permanent", hint: "Temps plein" },
      { value: "salarie_contrat", label: "Salarié à contrat ou temps partiel", hint: "Saisonnier, contractuel" },
      { value: "autonome", label: "Travailleur autonome" },
      { value: "entrepreneur", label: "Entrepreneur", hint: "Propriétaire d'entreprise" },
      { value: "retraite", label: "Retraité" },
      { value: "transition", label: "En transition", hint: "Entre deux emplois, études…" },
    ],
  },
  {
    id: "workingWithBroker",
    kind: "choice",
    title: "Travailles-tu déjà avec un courtier immobilier ?",
    subtitle: "Pour qu'on sache comment mieux t'accompagner.",
    autoAdvance: true,
    choices: [
      { value: "non", label: "Non", hint: "Je n'ai pas encore de courtier" },
      { value: "oui", label: "Oui", hint: "Je travaille déjà avec quelqu'un" },
    ],
  },
  {
    id: "fullName",
    kind: "text",
    title: "Quel est ton nom complet ?",
    subtitle: "Pour que Steve ou Myriam sache à qui s'adresser.",
    inputType: "text",
    autoComplete: "name",
    placeholder: "Marie Tremblay",
  },
  {
    id: "email",
    kind: "text",
    title: "Quel est ton courriel ?",
    subtitle: "C'est là que tu recevras ton guide gratuit.",
    inputType: "email",
    autoComplete: "email",
    placeholder: "marie@exemple.ca",
  },
  {
    id: "phone",
    kind: "text",
    title: "Quel est ton numéro de téléphone ?",
    subtitle: "Pour qu'un courtier puisse te joindre rapidement.",
    inputType: "tel",
    autoComplete: "tel",
    placeholder: "(819) 555-0123",
  },
  {
    id: "consent",
    kind: "consent",
    title: "Une dernière chose avant ton guide gratuit",
    subtitle: "Confirme et c'est parti.",
    autoAdvance: true,
  },
];

export function getVisibleQuestions(answers: Answers): QuestionDef[] {
  return QUESTIONS.filter((q) => !q.showIf || q.showIf(answers));
}

export function isAnswered(q: QuestionDef, a: Answers): boolean {
  switch (q.id) {
    case "financingStatus": return !!a.financingStatus;
    case "propertyType": return !!a.propertyType;
    case "regions": return Array.isArray(a.regions) && a.regions.length >= 1;
    case "purchaseTimeline": return !!a.purchaseTimeline;
    case "journeyStage": return !!a.journeyStage;
    case "buyingWith": return !!a.buyingWith;
    case "householdIncome": return typeof a.householdIncome === "number" && a.householdIncome > 0;
    case "downPayment": return typeof a.downPayment === "number" && a.downPayment >= 0;
    case "currentHomeValue": return typeof a.currentHomeValue === "number" && a.currentHomeValue > 0;
    case "employment": return !!a.employment;
    case "workingWithBroker":
      // "Non" = on peut continuer. "Oui" = bloqué SAUF si la personne
      // clique "Je veux changer" (wantsToSwitch = true).
      if (a.workingWithBroker === "non") return true;
      if (a.workingWithBroker === "oui" && a.wantsToSwitch === true) return true;
      return false;
    case "fullName": return !!(a.fullName ?? "").trim();
    case "email": return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((a.email ?? "").trim());
    case "phone": return (a.phone ?? "").replace(/\D/g, "").length >= 10;
    case "consent": return !!a.consent;
  }
}
