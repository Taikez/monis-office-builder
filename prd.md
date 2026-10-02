# PRD — Workspace Builder for Monis

## 1. Product Overview

### Working title
**Monis Workspace Builder**

### Product summary
Build an interactive workspace configurator for **monis.rent**, a furniture and office-equipment rental company serving digital nomads and startups in Bali.

Instead of browsing a traditional product catalog, users should be able to visually assemble a workspace by selecting a desk, chair, monitors, accessories, and decorative items, immediately see the setup update, review the final configuration, and proceed to rent it.

The experience should feel playful, fast, visual, and premium while remaining simple enough to complete in a few minutes.

---

## 2. Problem Statement

A newly arrived remote worker or startup team in Bali may need a functional workspace quickly, but browsing individual furniture products creates unnecessary friction.

Users want to answer a simpler question:

> “What will my workspace look like, what is included, and how do I rent it?”

The product should transform furniture selection from a catalog-shopping task into a visual configuration experience.

---

## 3. Goals

### Primary goals
1. Let users build a complete workspace visually.
2. Make choosing equipment feel fun and intuitive.
3. Show immediate visual feedback after every selection.
4. Make the selected setup easy to understand before rental.
5. Create a polished prototype that demonstrates strong frontend product thinking.

### Secondary goals
1. Encourage exploration through tasteful animation and micro-interactions.
2. Make the experience work well on desktop and mobile.
3. Structure the app so real Monis products, pricing, inventory, and checkout could be connected later.

---

## 4. Non-Goals

This coding challenge does **not** require:
- Real payments.
- Real inventory reservation.
- User authentication.
- Complex backend infrastructure.
- Full e-commerce search or filtering.
- A production CMS.
- Real logistics calculations.

A simulated rental request / checkout completion is sufficient unless real integration is intentionally added.

---

## 5. Target User

### Primary persona
**Remote worker / digital nomad**
- Recently arrived in Bali.
- Needs a work setup within days.
- Values convenience and aesthetics.
- Wants to understand the complete setup quickly.
- Does not want to spend time comparing dozens of SKUs.

### Secondary persona
**Small startup team**
- Needs a temporary office setup.
- Wants predictable rental costs.
- May configure multiple similar workstations later.

---

## 6. Core User Story

> As a remote worker in Bali, I want to visually build a complete workspace by choosing furniture and accessories so that I can understand what my setup will look like and rent it with confidence.

---

## 7. Required Challenge Acceptance Criteria

The finished app must satisfy all of the following:

- [ ] A user can select a **desk from at least 2 options**.
- [ ] A user can select a **chair from at least 2 options**.
- [ ] A user can add **accessories** such as monitors, lamps, plants, etc.
- [ ] The **workspace preview updates visually** as items are added or changed.
- [ ] There is a **summary / checkout view** showing the selected setup.
- [ ] The app is deployed and accessible via a **public Vercel URL**.
- [ ] The code is hosted on **GitHub** with `desent-bot` added as a collaborator.

---

## 8. Required Tech Stack

### Required
- **Next.js**
- **Tailwind CSS**
- **Vercel**

### Recommended
- TypeScript
- App Router
- Framer Motion or Motion
- Zustand for lightweight state management
- Lucide icons
- shadcn/ui only where useful; avoid making the app feel like a generic dashboard

---

## 9. Product Experience

### Core concept
The screen is centered around a large **workspace scene**. Users customize it via a product picker.

Suggested interaction model:

- Main canvas / scene in the center.
- Configurator panel on the left or bottom.
- Categories: `Desk`, `Chair`, `Monitors`, `Lighting`, `Accessories`.
- Clicking an option updates the scene instantly.
- Selected items visually indicate active state.
- A persistent summary displays item count and estimated monthly rental price.
- A primary CTA opens the review / rent flow.

The visual scene does not need true 3D. A well-composed layered 2D setup is preferred over low-quality 3D.

---

## 10. Suggested Information Architecture

### `/`
Workspace builder.

### Optional modal / sheet
Review setup.

### Optional route
`/checkout`

For this challenge, a modal or side sheet is enough if it clearly functions as the final summary.

---

## 11. Workspace Builder Requirements

### 11.1 Desk selection
Provide at least 2 desks.

Recommended sample options:
- Minimal Desk
- Standing Desk
- Large Studio Desk

Each desk should include:
- ID
- Name
- Monthly price
- Image / render
- Optional badge or short descriptor

Only one desk is active at a time.

### 11.2 Chair selection
Provide at least 2 chairs.

Recommended sample options:
- Ergo Chair
- Executive Chair
- Minimal Task Chair

Only one chair is active at a time.

### 11.3 Monitor controls
Users should be able to add monitors.

Recommended implementation:
- `0`, `1`, `2`, or `3` monitors
- Increment / decrement or visual selection
- Scene changes based on monitor count

### 11.4 Accessories
Include at least 3 optional accessories.

Suggested:
- Desk lamp
- Plant
- Laptop stand
- Keyboard
- Desk mat
- Storage unit

Accessories may be toggleable.

### 11.5 Visual preview
The preview must update immediately when the configuration changes.

The preview should visually communicate:
- Which desk is selected.
- Which chair is selected.
- Monitor quantity.
- Optional accessories.

Acceptable visual approaches:
1. Layered PNG / WebP assets.
2. CSS-positioned product cutouts.
3. SVG illustration system.
4. Custom rendered scene images.
5. A hybrid approach.

Do not rely on text-only confirmation.

---

## 12. Suggested Interaction Details

### Product option cards
Each item card should show:
- Thumbnail.
- Name.
- Monthly price.
- Selected state.

Interaction:
- Hover: subtle lift / glow / image scale.
- Select: clear outline and animated feedback.

### Category navigation
Desktop:
- Horizontal tabs or compact vertical categories.

Mobile:
- Scrollable tabs + bottom product sheet.

### Scene transitions
When an item changes:
- Fade / scale transition.
- Avoid full-screen flashes.
- Keep motion under ~300ms for most interactions.

### CTA
Persistent CTA:
**Review setup**

Possible secondary copy:
`Rp X / month`

---

## 13. Summary / Checkout Requirements

The summary view should show:
- Selected desk.
- Selected chair.
- Monitor count.
- Selected accessories.
- Monthly rental total.
- Optional one-time or deposit value if desired.
- Final CTA: `Rent this setup`.

The final CTA may complete with a success screen such as:

> “Workspace request received — Monis will contact you to arrange delivery.”

No payment integration is required.

---

## 14. Pricing

Use mock pricing if real pricing is not available.

Use a consistent currency:
- Prefer **IDR / month** for Bali relevance.

Example:
- Desk: Rp 600k–1.5m / month
- Chair: Rp 400k–1.0m / month
- Monitor: Rp 350k / month
- Accessories: Rp 50k–250k / month

The total should update live.

---

## 15. Visual Direction

### Brand feel
- Tropical-modern.
- Premium but approachable.
- Minimal.
- Warm.
- More “design tool” than “online store”.

### Suggested palette
Use the Monis brand if available. Otherwise:
- Warm off-white background.
- Deep charcoal text.
- One vivid accent such as tropical green, cobalt, or orange.
- Muted neutrals for surfaces.

### Layout
Avoid a dense dashboard feel.

The workspace preview should be the hero, not the controls.

---

## 16. Responsive Requirements

### Desktop
- Large visual scene.
- Side configuration panel.
- Persistent summary / CTA.

### Tablet
- Scene remains dominant.
- Controls may become horizontal or bottom-aligned.

### Mobile
- Scene at top.
- Sticky category tabs.
- Product picker in horizontal cards or bottom sheet.
- Sticky review CTA.

Minimum target width:
- 375px

---

## 17. Accessibility

- All interactive controls keyboard accessible.
- Visible focus states.
- Buttons use semantic `<button>`.
- Images include meaningful `alt` text when applicable.
- Selected state is not communicated by color alone.
- Maintain reasonable contrast ratios.
- Respect `prefers-reduced-motion`.

---

## 18. Data Model

Suggested TypeScript model:

```ts
type ProductCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "lighting"
  | "accessory";

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  priceMonthly: number;
  image: string;
  description?: string;
  badge?: string;
};

type WorkspaceConfig = {
  deskId: string;
  chairId: string;
  monitorCount: number;
  accessoryIds: string[];
};
```

Optional derived state:

```ts
type WorkspaceSummary = {
  items: Product[];
  monthlyTotal: number;
};
```

---

## 19. State Management

Recommended:
- Zustand store or React context.

State should include:
- selected desk
- selected chair
- monitor count
- accessories
- checkout / summary open state

Persist configuration to `localStorage` if time permits.

---

## 20. Suggested Component Structure

```txt
app/
  page.tsx
  layout.tsx

components/
  workspace/
    workspace-builder.tsx
    workspace-scene.tsx
    scene-desk.tsx
    scene-chair.tsx
    scene-monitors.tsx
    scene-accessories.tsx

  configurator/
    category-tabs.tsx
    product-picker.tsx
    product-card.tsx
    monitor-control.tsx

  checkout/
    setup-summary.tsx
    summary-item.tsx
    rental-success.tsx

  ui/
    ...

lib/
  products.ts
  pricing.ts
  utils.ts

store/
  workspace-store.ts

types/
  workspace.ts
```

---

## 21. Product Data

Seed data should be local and easy to replace later.

Example:

```ts
export const desks = [
  {
    id: "desk-minimal",
    name: "Minimal Desk",
    category: "desk",
    priceMonthly: 750_000,
    image: "/products/desks/minimal.webp",
  },
  {
    id: "desk-standing",
    name: "Standing Desk",
    category: "desk",
    priceMonthly: 1_250_000,
    image: "/products/desks/standing.webp",
  },
];
```

Avoid embedding product definitions across components.

---

## 22. Analytics Events — Optional

If analytics are added, useful events include:
- `workspace_started`
- `desk_selected`
- `chair_selected`
- `monitor_count_changed`
- `accessory_added`
- `review_opened`
- `rent_clicked`

Not required for the coding challenge.

---

## 23. Performance

Targets:
- Good Lighthouse performance.
- Use `next/image`.
- Optimize product assets to WebP / AVIF.
- Avoid shipping heavy 3D libraries unless the result genuinely benefits.
- Keep animation smooth on normal laptops and modern mobile devices.

---

## 24. Error / Edge States

Handle:
- Product image failing to load.
- No accessories selected.
- 0 monitors.
- Direct reload with persisted state.
- Mobile viewport overflow.

The app should always remain usable even if one optional image is missing.

---

## 25. Definition of Done

The project is done when:

1. All challenge must-haves pass.
2. The visual workspace updates for every core selection.
3. Desktop and mobile layouts are polished.
4. No major console errors exist.
5. The summary correctly reflects the workspace.
6. Monthly price totals are correct.
7. The final rent CTA produces a clear completion state.
8. The project is deployed on Vercel.
9. GitHub repo is public or accessible as required.
10. `desent-bot` is added as a collaborator.
11. README includes:
   - project overview
   - local setup
   - architecture notes
   - deployed URL
   - key tradeoffs / decisions

---

## 26. Stretch Features

Only attempt after all must-haves are complete.

### High-value stretch ideas
- Drag items slightly within the desk scene.
- Day / night room theme.
- “Surprise me” randomized workspace.
- Shareable configuration via URL query params.
- Save setup locally.
- Smooth before / after transition.
- Delivery date selector.
- Rental duration selector.
- Small onboarding tooltip sequence.
- Item detail popovers.
- Animated price changes.
- Confetti / success animation after rental request.

### Avoid unless core is finished
- Full WebGL room builder.
- Authentication.
- Database.
- Complex checkout.
- Over-engineered backend.
- Admin dashboard.

---

## 27. Evaluation Priority

When tradeoffs are required, prioritize in this order:

1. Must-have functionality.
2. Visual clarity of the workspace preview.
3. Interaction polish.
4. Responsive quality.
5. Code quality.
6. Extra features.

A smaller polished experience is better than a large unfinished one.
