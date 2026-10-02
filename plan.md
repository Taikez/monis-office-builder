# Implementation Plan — Monis Workspace Builder

## Goal

Ship a polished, responsive workspace configurator using **Next.js + Tailwind CSS**, deploy it to **Vercel**, and satisfy every challenge must-have.

The implementation should optimize for:
- visible product quality,
- fast iteration,
- reliable state,
- clean component boundaries,
- minimal unnecessary complexity.

---

## Phase 0 — Project Setup

### Tasks
- [ ] Create GitHub repository.
- [ ] Initialize Next.js with TypeScript and App Router.
- [ ] Install Tailwind CSS.
- [ ] Configure ESLint / formatting.
- [ ] Add `desent-bot` as GitHub collaborator.
- [ ] Connect repo to Vercel immediately.
- [ ] Confirm first public deployment works.

### Recommended bootstrap

```bash
npx create-next-app@latest monis-workspace-builder \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

### Optional dependencies

```bash
npm install zustand motion lucide-react clsx tailwind-merge
```

### Deliverable
A clean Next.js starter deployed on Vercel.

---

## Phase 1 — Establish Product Data

### Tasks
- [ ] Define shared `Product` and `WorkspaceConfig` types.
- [ ] Create product seed data.
- [ ] Add at least:
  - 2 desks
  - 2 chairs
  - monitor product
  - lamp
  - plant
  - 1–3 additional accessories
- [ ] Assign monthly mock pricing.
- [ ] Keep all product data centralized.

### Files

```txt
types/workspace.ts
lib/products.ts
lib/pricing.ts
```

### Acceptance criteria
- No product objects are duplicated across UI components.
- Every product has a stable ID.
- Price formatting is centralized.

---

## Phase 2 — Build Global Workspace State

### Recommended
Use Zustand.

### Store API

```ts
type WorkspaceStore = {
  deskId: string;
  chairId: string;
  monitorCount: number;
  accessoryIds: string[];

  selectDesk: (id: string) => void;
  selectChair: (id: string) => void;
  setMonitorCount: (count: number) => void;
  toggleAccessory: (id: string) => void;
  resetWorkspace: () => void;
};
```

### Tasks
- [ ] Create workspace store.
- [ ] Add default configuration.
- [ ] Implement computed pricing selector/helper.
- [ ] Optional: persist to localStorage.

### Acceptance criteria
- Configuration changes update all subscribed UI immediately.
- Monitor count cannot go below 0.
- Accessory toggles cannot duplicate IDs.

---

## Phase 3 — Build the Visual Workspace Scene First

This is the most important part of the challenge.

### Strategy
Use layered 2D product assets positioned inside a fixed scene.

Suggested stacking order:

```txt
background
desk
monitors
desk accessories
chair
foreground decoration
```

### Tasks
- [ ] Create `WorkspaceScene`.
- [ ] Add neutral office background.
- [ ] Render selected desk.
- [ ] Render selected chair.
- [ ] Render 0–3 monitors.
- [ ] Render optional lamp.
- [ ] Render optional plant.
- [ ] Add transitions between variants.
- [ ] Add responsive scaling.

### Visual asset guidance
Preferred:
- Transparent PNG/WebP cutouts.
- Consistent perspective.
- Consistent lighting.
- Similar image dimensions.

If source photography does not align well, create a stylized illustrated scene instead of mixing incompatible photos.

### Acceptance criteria
- Changing desk clearly changes the visual scene.
- Changing chair clearly changes the visual scene.
- Monitor count is visually obvious.
- Accessories appear / disappear instantly.
- Layout does not jump when assets change.

---

## Phase 4 — Build the Configurator UI

### Desktop layout
Recommended:
- left: product controls
- center/right: workspace scene

Alternative:
- top/bottom category picker around a large scene

### Components

```txt
CategoryTabs
ProductPicker
ProductCard
MonitorControl
AccessoryToggle
```

### Tasks
- [ ] Build category navigation.
- [ ] Desk picker.
- [ ] Chair picker.
- [ ] Monitor control.
- [ ] Accessory picker.
- [ ] Selected states.
- [ ] Hover states.
- [ ] Keyboard focus states.

### Acceptance criteria
- At least two desks selectable.
- At least two chairs selectable.
- Selected item is unmistakable.
- Switching products takes one click.
- UI remains usable at 375px width.

---

## Phase 5 — Pricing & Persistent Summary CTA

### Tasks
- [ ] Calculate monthly total from configuration.
- [ ] Add persistent price summary.
- [ ] Add `Review setup` CTA.
- [ ] Animate price changes subtly.

### Recommended UI

```txt
Your setup
Rp 2.450.000 / month
[ Review setup ]
```

### Acceptance criteria
- Total updates immediately.
- Total is identical in builder and summary.
- Price formatting is consistent.

---

## Phase 6 — Checkout / Setup Summary

### Recommended implementation
Desktop: side sheet or modal.
Mobile: full-screen sheet.

### Show
- Desk.
- Chair.
- Number of monitors.
- Accessories.
- Monthly total.
- Reset/edit path.
- Primary rent CTA.

### Tasks
- [ ] Build summary component.
- [ ] Add edit / close interaction.
- [ ] Add `Rent this setup` action.
- [ ] Add mock success state.

### Success screen copy example

```txt
Your workspace is reserved.

We’ll be in touch to confirm your rental and delivery details.
```

### Acceptance criteria
- Summary always matches current store state.
- User can return to editing.
- Final CTA produces an obvious completion state.

---

## Phase 7 — Responsive Polish

### Desktop
- [ ] Scene uses most available visual area.
- [ ] Configurator stays easy to scan.
- [ ] CTA remains visible.

### Tablet
- [ ] Avoid squeezed sidebars.
- [ ] Consider horizontal product selector.

### Mobile
- [ ] Scene at top.
- [ ] Scrollable category tabs.
- [ ] Product cards horizontally scrollable or bottom sheet.
- [ ] Sticky review CTA.
- [ ] No clipped controls.

### Test widths
- 375
- 430
- 768
- 1024
- 1440

---

## Phase 8 — Motion & Delight

Add only after core functionality is stable.

### Suggested motion
- Product card hover: 150–200ms.
- Scene item transition: 200–300ms fade/scale.
- Summary sheet: spring slide.
- Price change: small number transition.
- Final success: restrained celebratory animation.

### Avoid
- Slow page transitions.
- Excessive bouncing.
- Animations that block selection.
- Gratuitous parallax.

### Accessibility
Respect `prefers-reduced-motion`.

---

## Phase 9 — QA Against Challenge Must-Haves

Run this checklist manually:

### Desk
- [ ] Option 1 selectable.
- [ ] Option 2 selectable.
- [ ] Visual scene changes.

### Chair
- [ ] Option 1 selectable.
- [ ] Option 2 selectable.
- [ ] Visual scene changes.

### Accessories
- [ ] Monitor can be added.
- [ ] Lamp or plant can be added.
- [ ] Scene updates for each.

### Preview
- [ ] All primary state changes are visually represented.

### Summary
- [ ] All selected products appear.
- [ ] Total is accurate.
- [ ] Final rent CTA exists.

### Deployment
- [ ] Public Vercel URL works in incognito.
- [ ] No broken asset URLs.
- [ ] GitHub repo available.
- [ ] `desent-bot` collaborator added.

---

## Phase 10 — Engineering QA

### Run

```bash
npm run lint
npm run build
```

### Check
- [ ] No TypeScript errors.
- [ ] No hydration warnings.
- [ ] No console errors.
- [ ] No layout shift from product images.
- [ ] All buttons have labels.
- [ ] Images optimized.
- [ ] Mobile overflow fixed.
- [ ] Tab navigation works.

---

## Phase 11 — README

Create a strong README with:

```txt
# Monis Workspace Builder

## Live Demo
## Screenshots
## Product Goal
## Features
## Tech Stack
## Architecture
## Local Development
## Key Design Decisions
## Tradeoffs
## Future Improvements
```

Mention explicitly that the project was designed for the Desent coding challenge.

---

## Agent Execution Order

If multiple AI agents are working in parallel, use these responsibilities.

### Agent A — Foundation
Own:
- Next.js setup
- types
- product data
- Zustand state
- pricing helpers

### Agent B — Scene
Own:
- product assets
- visual composition
- workspace preview
- responsive scene behavior

### Agent C — Configurator
Own:
- tabs
- product cards
- controls
- mobile picker UX

### Agent D — Checkout & Polish
Own:
- summary sheet
- success state
- animations
- accessibility polish

### Integration rule
Do not let agents independently invent product schemas.

`types/workspace.ts` and `lib/products.ts` are the contract.

---

## Suggested First-Pass File Tree

```txt
app/
  globals.css
  layout.tsx
  page.tsx

components/
  workspace/
    workspace-builder.tsx
    workspace-scene.tsx

  configurator/
    category-tabs.tsx
    product-card.tsx
    product-picker.tsx
    monitor-control.tsx

  checkout/
    setup-summary.tsx
    rental-success.tsx

lib/
  products.ts
  pricing.ts
  format.ts

store/
  workspace-store.ts

types/
  workspace.ts

public/
  products/
    desks/
    chairs/
    monitors/
    accessories/
```

---

## Suggested Build Sequence for a Single Agent

Implement in this exact order:

1. Product data.
2. Store.
3. Plain scene with working state.
4. Desk controls.
5. Chair controls.
6. Monitor controls.
7. Accessories.
8. Pricing.
9. Summary.
10. Responsive layout.
11. Visual polish.
12. Animations.
13. Deploy.
14. README.
15. Final QA.

Do not spend significant time polishing before steps 1–9 work.

---

## Optional Stretch Sprint

Only after all challenge requirements pass.

Choose **one or two**, not all:

- [ ] Shareable setup URL.
- [ ] Rental duration selector.
- [ ] Randomize / “Surprise me”.
- [ ] Local persistence.
- [ ] Theme / room background selector.
- [ ] Drag accessory positions.
- [ ] Delivery-date selector.

The best stretch feature is the one that improves the core “design my workspace” experience rather than adding unrelated surface area.

---

## Final Submission Checklist

- [ ] Public GitHub repo.
- [ ] `desent-bot` collaborator.
- [ ] Public Vercel deployment.
- [ ] Deployment URL in README.
- [ ] At least 2 desks.
- [ ] At least 2 chairs.
- [ ] Accessories.
- [ ] Live visual preview.
- [ ] Summary / checkout.
- [ ] Final rent CTA.
- [ ] Mobile responsive.
- [ ] `npm run build` passes.
- [ ] No obvious console errors.
- [ ] README documents decisions and tradeoffs.
