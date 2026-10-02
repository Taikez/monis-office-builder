# PRD — Monis Workspace Builder: Personalization Expansion

## Product Goal
Extend the completed Monis Workspace Builder from a polished configurator into a playful, memorable workspace-design experience without breaking the existing configure → review → rent flow.

The app should have two layers:
1. **Configure** — desk, chair, monitor count, extras, pricing, checkout.
2. **Personalize** — zoom into the desk, arrange tabletop items, change finishes, layouts, lighting, room mood, and decorative details.

The existing builder remains the primary experience. Personalization is an optional second layer.

## Principles
- Preserve the current working builder.
- Prioritize reviewer-visible delight over architecture.
- Keep all pricing logic tied only to rentable products.
- Use lightweight 2D/CSS/SVG interactions; no Three.js or backend.
- Make new controls discoverable without overwhelming the main UI.
- Keep mobile usable.

## Feature 1 — Desk Focus Mode
Add a **Personalize Desk** action from the main workspace.

When activated:
- smoothly zoom/focus the scene onto the tabletop;
- de-emphasize the rest of the room;
- show desk-specific controls;
- preserve all current selections.

Provide a clear **Done / Back to room** action.

Acceptance:
- focus mode enters/exits smoothly;
- existing configuration survives the transition;
- no major layout jump on desktop or mobile.

## Feature 2 — Draggable Tabletop Objects
Inside focus mode, users can add and reposition objects.

Target objects:
- laptop
- keyboard
- mouse
- coffee cup
- notebook
- headphones
- phone
- small plant
- lamp
- desk mat

Minimum implementation: **6 draggable objects**.

Requirements:
- default positions;
- drag constrained to tabletop bounds;
- positions stored in state;
- object positions remain stable while editing and after leaving/re-entering focus mode;
- tasteful hover/selected feedback.

Recommended implementation: Motion/Framer Motion drag constraints.

## Feature 3 — Desk Presets
Add curated presets:
- Focus Mode
- Designer Setup
- Cozy Nomad
- Minimalist
- Controlled Chaos

Presets may update:
- visible desk objects;
- object positions;
- monitor layout;
- lighting;
- desk finish;
- selected decorative extras.

They must always produce a visually coherent setup.

## Feature 4 — Day / Night
Add:
- Day
- Night

Day:
- warm natural light;
- brighter background;
- softer shadows.

Night:
- darkened room;
- monitor glow;
- lamp glow;
- richer contrast.

Use CSS/SVG changes, not expensive graphical effects.

## Feature 5 — Room Themes
Add at least 3, preferably 4:
- Bali Villa
- Creative Studio
- Minimal Apartment
- Tropical Office

Themes should change the atmosphere via:
- wall/background treatment;
- window/decor shapes;
- surface/floor tone;
- accent details.

Do not duplicate the entire scene for each theme.

## Feature 6 — Chair Position
Add lightweight visual chair positioning such as:
- Near
- Relaxed
- Away

This affects only scene position/rotation and never pricing.

## Feature 7 — Monitor Layouts
Valid layouts depend on monitor count.

Examples:
- 1: centered
- 2: dual horizontal, main + vertical, wide spread
- 3: triple or center + sides

Invalid layouts should never be selectable.

## Feature 8 — Desk Finish
Allow visual finishes:
- Oak
- Walnut
- White
- Black

Changing finish does not change the underlying desk product or rental price.

## Feature 9 — Micro-interactions
Add inexpensive, tasteful details:
- coffee steam;
- plant leaf wiggle;
- monitor power-on;
- lamp glow;
- chair roll-in;
- accessory settle animation.

Keep them subtle and respect reduced-motion.

## Feature 10 — Surprise Me
Add a **Surprise Me** action that creates a valid, attractive setup by randomizing some combination of:
- desk;
- chair;
- monitor count;
- monitor layout;
- extras;
- finish;
- room theme;
- day/night;
- tabletop preset.

Use curated valid choices rather than unrestricted randomness.

## State Additions
Suggested model:

```ts
type DeskFinish = "oak" | "walnut" | "white" | "black";
type LightingMode = "day" | "night";
type RoomTheme =
  | "bali-villa"
  | "creative-studio"
  | "minimal-apartment"
  | "tropical-office";
type ChairPosition = "near" | "relaxed" | "away";
type MonitorLayout =
  | "single"
  | "dual-horizontal"
  | "main-vertical"
  | "wide"
  | "triple";

type DeskObjectPosition = {
  id: string;
  x: number;
  y: number;
  visible: boolean;
};

type PersonalizationState = {
  focusMode: boolean;
  deskFinish: DeskFinish;
  lightingMode: LightingMode;
  roomTheme: RoomTheme;
  chairPosition: ChairPosition;
  monitorLayout: MonitorLayout;
  deskObjects: DeskObjectPosition[];
  activePreset?: string;
};
```

Keep decorative personalization state separate from billing calculations.

## UX
Group new controls rather than exposing everything at once. Good groups:
- Desk
- Layout
- Mood
- Presets

Desktop can use a larger focus canvas with compact controls alongside it. Mobile should prioritize the desk canvas, use horizontal/segmented controls, and keep draggable targets forgiving.

## Accessibility
- preserve keyboard/focus behavior for controls;
- selected states must not rely only on color;
- dragging should not be the only way to make meaningful configuration choices;
- respect reduced-motion.

## Technical Constraints
Prefer:
- existing React/store architecture;
- Tailwind CSS;
- Motion/Framer Motion;
- current inline SVG/CSS visual system.

Avoid:
- Three.js/WebGL;
- canvas physics;
- backend/database;
- auth;
- heavy drag-and-drop frameworks unless truly needed.

## Acceptance Criteria
- [ ] Enter and exit Desk Focus mode.
- [ ] At least 6 draggable tabletop objects.
- [ ] Objects constrained to desk bounds.
- [ ] Positions persist through normal UI changes.
- [ ] At least 4 presets.
- [ ] Day and Night modes visibly differ.
- [ ] At least 3 room themes.
- [ ] Multiple valid monitor layouts for 2+ monitors.
- [ ] At least 3 desk finishes.
- [ ] At least 2 chair visual positions.
- [ ] Surprise Me produces valid attractive configurations.
- [ ] Existing configure/review/rent flow still works.
- [ ] Pricing remains correct.
- [ ] Mobile remains usable.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Non-Goals
Do not add accounts, backend persistence, multiplayer, real 3D, physics, image uploads, cloud saves, inventory APIs, or real payments.

## Definition of Done
The expansion is done when the original builder is intact, personalization feels like a deeper second layer, at least one interaction creates a genuine “wow” moment, all new visual options are coherent with the existing art direction, and production remains stable.
