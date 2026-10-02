# Monis Workspace Builder

A visual, interactive workspace configurator built for Monis.rent. Design your ideal remote setup in Bali and request a rental in minutes.

**Live Demo:** https://www.monis-office-builder.vercel.app

## Features

- **Live 2D Visual Scene:** A responsive, dynamically generated SVG composition that updates instantly as you select furniture.
- **Product Configuration:** Switch between minimal and standing desks, ergonomic or executive chairs, and toggle monitors/accessories.
- **Real-Time Pricing:** Calculates monthly IDR rental costs with consistent formatting across the app.
- **Mobile-Optimized:** Seamless layout transitions from a side-by-side desktop view to a stacked mobile view with a sticky checkout CTA.
- **Checkout Flow:** A clean modal summary of selected line items before finalizing the rental.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Architecture & Design Decisions

- **2D Layered SVGs over 3D:** I opted for a layered, responsive 2D SVG approach using Tailwind and Framer Motion rather than WebGL/Three.js. This decision prioritizes a highly polished, performant, and bug-free user experience, ensuring perfect scaling on mobile devices while easily meeting the 4-8 hour timeframe.
- **State Management:** Used a single lightweight Zustand store (`useWorkspaceStore`) as the source of truth, avoiding prop-drilling and ensuring the side-panel UI and the visual scene perfectly sync.
- **Pricing Logic:** Extracted to `lib/pricing.ts` to ensure the summary, footer, and individual line items never drift out of sync.

## Local Development

1. Clone the repository.
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Tradeoffs & Future Improvements

- **No Backend:** The rental submission currently ends in a mock success state. In a real-world scenario, this would post to an API route and hook into a CRM or inventory system.
- **Asset Loading:** The furniture illustrations are built inline with SVG/CSS. In production, these might be swapped for optimized `.webp` cutouts fetched from a CDN if exact photo-realism is preferred.
