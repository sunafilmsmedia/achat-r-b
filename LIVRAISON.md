# Roux et Bachand — ACHETEUR — `achat-r-b`

Logiciel de qualification d'**acheteurs** pour l'équipe **Steve Bachand &
Myriam Roux** (eXp, Estrie — Sherbrooke). Même identité visuelle que
`eval-r-b` (version vendeur), mais un produit différent : au lieu d'un verdict
de timing de vente, l'app calcule un **pouvoir d'achat** et chiffre **ce qu'il
manque** en mise de fonds.

## Le parcours

1. **Hero** — « Quelle propriété peux-tu vraiment acheter ? »
2. **9 questions** (`lib/questions.ts`) :
   préqualification · type de propriété · secteurs (jusqu'à 3) · échéancier ·
   parcours · seul ou en couple · revenu brut du ménage · mise de fonds ·
   situation d'emploi
3. **Court-circuit « plus de 12 mois »** → écran vidéo (`LongTermScreen`).
   Aucune analyse, aucun lead capturé.
4. **Analyse** (2 s minimum) → écran de pré-révélation → **résultats bloqués**
   derrière le formulaire de contact.
5. **Résultats** : capacité, écart de mise de fonds, score, programmes,
   facteurs détectés, 4 prochaines étapes.

## Le calcul (`lib/capacity.ts`)

Deux plafonds calculés séparément, puis comparés :

| Valeur | Comment |
|---|---|
| `maxByIncome` | Ce que le revenu supporte : ABD 39 %, taux d'admissibilité **6,25 %**, amortissement **25 ans**, taxes ≈ 0,95 %/an, chauffage, 50 % des frais de condo, prime SCHL 4 % incluse. Revenu pondéré selon l'emploi (permanent 100 % → transition 55 %). |
| `maxByDownPayment` | Règles canadiennes : 5 % jusqu'à 500 k$, 10 % sur la tranche 500 k$–1,5 M$, 20 % au-delà. |
| `downPaymentGap` | Mise de fonds minimale exigée pour `maxByIncome`, moins la mise de fonds actuelle. |

Exemple validé : 20 000 $ de mise de fonds → plafond de 400 000 $ ; pour viser
512 850 $, il faut 26 285 $ — donc un écart de 6 285 $.

> ⚠️ **Ce n'est jamais une préapprobation.** Les dettes personnelles ne sont
> pas demandées, donc pas déduites : le montant d'un prêteur sera généralement
> plus bas. L'avertissement est affiché sous les résultats.

## Les 4 verdicts (`lib/scoring.ts`)

| Verdict | Déclencheur | Titre affiché |
|---|---|---|
| `pret` | financement + mise de fonds au rendez-vous | Tu es prêt à passer à l'action. |
| `financement` | mise de fonds OK, prêteur pas encore validé | Presque prêt — il te manque la préqualification. |
| `mise_de_fonds` | capacité présente, comptant insuffisant | Presque prêt — il te manque la mise de fonds. |
| `a_batir` | capacité < 150 k$ ou score < 35 | Ton projet se bâtit — et c'est très correct. |

Score sur 100 affiché (« Score de préparation »), borné à 15–98.
Les programmes (CELIAPP, RAP, crédits d'impôt, remise en argent, don familial)
n'apparaissent que quand la mise de fonds est le frein.

## À FAIRE avant déploiement

1. **Lien de la vidéo « plus de 12 mois »** → `lib/config.ts`
   (`VIDEO_LONG_TERME_URL`). Tant qu'il est vide, l'écran s'affiche sans
   bouton. `VIDEO_AUTO_REDIRECT` contrôle la redirection automatique (6 s).
2. **Câbler les intégrations** (vides par défaut — nouvelle app = nouveaux
   IDs, ne pas réutiliser ceux de `eval-r-b`) :
   - Meta Pixel ID → `components/MetaPixel.tsx` (`const PIXEL_ID`)
   - Clarity Project ID → `components/Clarity.tsx` (`CLARITY_PROJECT_ID`)
3. **Variables d'environnement Vercel** (voir `.env.local.example`) :
   - `CRM_WEBHOOK_URL` (GHL de Roux et Bachand), `CRM_WEBHOOK_SECRET` (opt.)
   - `ANTHROPIC_API_KEY` (opt. — sinon rapport déterministe ; les **montants**
     sont toujours calculés par le code, jamais par l'IA)
4. **Valider les hypothèses financières** avec un courtier hypothécaire :
   taux d'admissibilité, taux de taxes de l'Estrie, frais de condo moyens
   (constantes en haut de `lib/capacity.ts`).
5. **Tester les 4 verdicts** + le court-circuit « plus de 12 mois », et
   confirmer le mapping dans GHL.

## Champs envoyés au CRM (`app/api/lead/route.ts`)

`source: "achat-r-b"`, `leadType: "acheteur"`, `periode` / `lead_type`
(jour/nuit, heure du Québec), contact, `score`, `verdict`, puis les montants :
`capaciteMax`, `budgetRealiste`, `plafondMiseDeFonds`, `miseDeFondsVisee`,
`manqueMiseDeFonds`, `paiementMensuel`, `facteurLimitant` — plus le profil
complet (`financingStatus`, `secteurs`, `purchaseTimeline`, `journeyStage`,
`buyingWith`, `householdIncome`, `downPayment`, `employment`).

## Dév local

```bash
npm install
cp .env.local.example .env.local   # remplir si besoin
npm run dev
```

Repo : https://github.com/sunafilmsmedia/achat-r-b.git
