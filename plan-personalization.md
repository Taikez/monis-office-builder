# Implementation Plan — Monis Personalization Expansion

## Objective
Add the full personalization feature set without rewriting or destabilizing the completed Monis Workspace Builder.

## Phase 1 — Inspect Existing Code
Before editing:
- inspect workspace state/store;
- inspect `workspace-scene`;
- inspect desk/chair/monitor/accessory scene components;
- inspect checkout pricing path;
- inspect current Motion/Framer Motion usage.

Do not refactor working code unless necessary.

## Phase 2 — Extend State
Add safe defaults for:
- focus mode;
- desk finish;
- lighting mode;
- room theme;
- monitor layout;
- chair position;
- desk object positions;
- active preset.

Keep decorative state out of pricing.

Verify the app still behaves exactly as before.

## Phase 3 — Desk Focus Mode
Implement first because it becomes the container for most other features.

Tasks:
- add `Personalize Desk`;
- animate room into tabletop close-up;
- hide/de-emphasize irrelevant scene elements;
- add `Done / Back to room`;
- preserve configuration;
- make responsive.

Do not build a separate route unless the existing architecture strongly favors it.

## Phase 4 — Draggable Desk Objects
Hero feature.

Start with:
- laptop
- keyboard
- coffee
- notebook
- headphones
- small plant

Then add mouse/phone/lamp/desk mat only if straightforward.

Tasks:
- create reusable `DeskObject`;
- define default positions;
- constrain drag to tabletop;
- store x/y on drag end;
- add subtle hover/drag feedback;
- ensure positions survive focus mode exit/re-entry.

Use Motion drag constraints or the simplest equivalent already in the repo.

## Phase 5 — Presets
Create data-driven preset definitions:
- Focus Mode
- Designer Setup
- Cozy Nomad
- Minimalist
- Controlled Chaos

A preset can set object visibility/positions, finish, lighting, and monitor layout.

Do not hard-code preset behavior throughout components.

## Phase 6 — Desk Finish
Implement:
- Oak
- Walnut
- White
- Black

Reuse existing desk geometry and map finishes to style variables/classes.

No pricing impact.

## Phase 7 — Monitor Layouts
Define layouts by monitor count.

1 monitor:
- centered

2 monitors:
- dual horizontal
- main + vertical
- wide

3 monitors if supported:
- triple
- center + sides

When count changes, automatically fall back to a valid layout if needed.

## Phase 8 — Day / Night
Add segmented toggle.

Night should visibly include:
- darker room;
- monitor glow;
- lamp glow if present;
- readable UI contrast.

Keep effects lightweight.

## Phase 9 — Room Themes
Use configuration objects rather than separate scenes.

Implement:
- Bali Villa
- Creative Studio
- Minimal Apartment
- Tropical Office

Theme values can control wall, floor, window/decor, and accent classes.

## Phase 10 — Chair Position
Implement `near`, `relaxed`, and `away` as transforms on the existing chair.

Keep this purely decorative.

## Phase 11 — Surprise Me
Add one action that picks from curated valid values.

Randomize:
- desk;
- chair;
- monitor count;
- valid monitor layout;
- extras;
- finish;
- theme;
- lighting;
- optional preset.

Never produce invalid state.

## Phase 12 — Micro-interactions
Add only after everything above works:
- coffee steam;
- monitor power-on;
- plant wiggle;
- lamp glow;
- chair roll;
- object settle.

Keep animations short and tasteful.

## Phase 13 — Desktop/Mobile Polish
Check:
- 375px
- 430px
- 768px
- 1440px

Verify:
- no overflow;
- focus canvas stays usable;
- drag targets remain large enough;
- controls do not cover desk objects;
- exit button is always reachable;
- main checkout CTA still works.

## Phase 14 — Regression QA
Verify original flow:
- desk select;
- chair select;
- monitor count;
- extras;
- pricing;
- Review Setup;
- Rent;
- success.

Verify expansion:
- focus mode;
- drag objects;
- presets;
- desk finish;
- monitor layout;
- day/night;
- room themes;
- chair position;
- Surprise Me.

## Phase 15 — Verification
Run:

```bash
npm run lint
npm run build
```

Fix all errors/warnings introduced by this work.

Then verify the production Vercel deployment and check browser console.

## Suggested Structure
Only add files when they make the implementation clearer.

```txt
components/
  personalization/
    desk-focus-mode.tsx
    desk-object.tsx
    preset-selector.tsx
    finish-selector.tsx
    lighting-toggle.tsx
    room-theme-selector.tsx
    monitor-layout-selector.tsx
    surprise-me-button.tsx

lib/
  personalization.ts
  presets.ts
```

Do not create every file automatically.

## Execution Order
1. Inspect
2. State
3. Focus mode
4. Dragging
5. Presets
6. Finish
7. Monitor layouts
8. Lighting
9. Themes
10. Chair position
11. Surprise Me
12. Micro-interactions
13. Mobile QA
14. Regression QA
15. Build/lint

## Guardrails
Do not:
- rewrite the app;
- replace the existing scene art direction;
- break pricing;
- add Three.js;
- add backend/auth/database;
- over-abstract;
- turn decorative options into rental charges.

The goal is to make the existing product significantly more delightful while keeping it simple and reliable.
