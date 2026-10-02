"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { useEffect, useState } from "react";

export function WorkspaceScene() {
  const { deskId, chairId, monitorCount, accessoryIds } = useWorkspaceStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch on transitions
  useEffect(() => {
    setMounted(true);
  }, []);

  const isStanding = deskId === "desk-standing";
  // Minimal desk surface is at Y=380, Standing desk is at Y=310
  const deskSurfaceY = isStanding ? 310 : 380;

  const hasLamp = accessoryIds.includes("acc-lamp");
  const hasPlant = accessoryIds.includes("acc-plant");
  const hasStand = accessoryIds.includes("acc-laptop-stand");

  if (!mounted)
    return (
      <div className="w-full max-w-4xl aspect-[4/3] bg-[#FDFCF8] rounded-3xl animate-pulse" />
    );

  return (
    <div className="w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] bg-[#FDFCF8] rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full drop-shadow-xl"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="15"
              stdDeviation="15"
              floodColor="#000000"
              floodOpacity="0.05"
            />
          </filter>
          <filter
            id="chair-shadow"
            x="-20%"
            y="-10%"
            width="140%"
            height="120%"
          >
            <feDropShadow
              dx="0"
              dy="25"
              stdDeviation="20"
              floodColor="#000000"
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        {/* --- 1. BACKGROUND LAYER --- */}
        {/* Wall & Floor */}
        <rect x="0" y="0" width="800" height="420" fill="#FDFCF8" />
        <polygon points="0,420 800,420 800,600 0,600" fill="#F4F1EA" />
        {/* Decorative Arch / Window Light */}
        <path
          d="M 250 420 L 250 180 A 150 150 0 0 1 550 180 L 550 420 Z"
          fill="#F7F5F0"
        />
        {/* Baseboard */}
        <rect x="0" y="415" width="800" height="5" fill="#EAE6DF" />

        {/* --- 2. DESK LEGS & BASE LAYER --- */}
        <g
          className="transition-opacity duration-500"
          style={{ opacity: isStanding ? 0 : 1 }}
        >
          {/* Minimal Desk Legs */}
          <rect x="220" y="380" width="12" height="150" fill="#292524" rx="2" />
          <rect x="568" y="380" width="12" height="150" fill="#292524" rx="2" />
          <path
            d="M 215 530 L 237 530"
            stroke="#292524"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 563 530 L 585 530"
            stroke="#292524"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        <g
          className="transition-opacity duration-500"
          style={{ opacity: isStanding ? 1 : 0 }}
        >
          {/* Standing Desk Legs (Thick, adjustable style) */}
          <rect x="230" y="310" width="24" height="220" fill="#D4D4D8" rx="2" />
          <rect x="234" y="310" width="16" height="120" fill="#A1A1AA" rx="2" />
          <rect x="546" y="310" width="24" height="220" fill="#D4D4D8" rx="2" />
          <rect x="550" y="310" width="16" height="120" fill="#A1A1AA" rx="2" />
          {/* Standing Desk Feet */}
          <rect x="190" y="520" width="104" height="12" fill="#3F3F46" rx="6" />
          <rect x="506" y="520" width="104" height="12" fill="#3F3F46" rx="6" />
        </g>

        {/* --- 3. DESK SURFACE & ITEMS (Moves up and down together) --- */}
        <g
          style={{
            transform: `translateY(${deskSurfaceY}px)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Desk Tops */}
          <g
            className="transition-opacity duration-500"
            style={{ opacity: isStanding ? 0 : 1 }}
          >
            {/* Minimal Desk Top - Warm Wood */}
            <rect
              x="150"
              y="-12"
              width="500"
              height="12"
              fill="#D97706"
              rx="3"
              filter="url(#soft-shadow)"
            />
            <rect x="150" y="0" width="500" height="4" fill="#B45309" rx="0" />
          </g>

          <g
            className="transition-opacity duration-500"
            style={{ opacity: isStanding ? 1 : 0 }}
          >
            {/* Standing Desk Top - Thick White */}
            <rect
              x="140"
              y="-20"
              width="520"
              height="20"
              fill="#FFFFFF"
              rx="4"
              filter="url(#soft-shadow)"
            />
            <rect x="140" y="0" width="520" height="4" fill="#E4E4E7" rx="0" />
          </g>

          {/* ACCESSORIES & MONITORS (Anchored to Y=0 which is the desk surface) */}

          {/* Monitors */}
          <g>
            {monitorCount >= 2 && (
              <g
                style={{ transform: "translateX(280px)" }}
                className="transition-all duration-500"
              >
                <Monitor />
              </g>
            )}

            {monitorCount >= 1 && (
              <g
                style={{
                  transform: `translateX(${monitorCount === 1 ? 400 : monitorCount === 2 ? 520 : 400}px)`,
                }}
                className="transition-all duration-500"
              >
                {/* Optional Laptop Stand raising the primary monitor */}
                <g
                  className="transition-opacity duration-300"
                  style={{ opacity: hasStand ? 1 : 0 }}
                >
                  <path
                    d="M -30 0 L 30 0 L 20 -15 L -20 -15 Z"
                    fill="#D4D4D8"
                  />
                  <rect
                    x="-20"
                    y="-20"
                    width="40"
                    height="5"
                    fill="#A1A1AA"
                    rx="2"
                  />
                </g>
                <g
                  style={{
                    transform: hasStand
                      ? "translateY(-20px)"
                      : "translateY(0px)",
                    transition: "transform 0.3s",
                  }}
                >
                  <Monitor />
                </g>
              </g>
            )}

            {monitorCount === 3 && (
              <g
                style={{ transform: "translateX(520px)" }}
                className="transition-all duration-500 opacity-100"
              >
                <Monitor />
              </g>
            )}
          </g>

          {/* Plant */}
          <g
            className="transition-all duration-500"
            style={{
              opacity: hasPlant ? 1 : 0,
              transform: `translate(${monitorCount === 3 ? 630 : 600}px, 0) scale(${hasPlant ? 1 : 0.8})`,
            }}
          >
            {/* Pot */}
            <path d="M -20 0 L -15 -35 L 15 -35 L 20 0 Z" fill="#E5E7EB" />
            <rect x="-18" y="-40" width="36" height="5" fill="#D1D5DB" rx="2" />
            {/* Leaves */}
            <path
              d="M 0 -40 Q -30 -80 -20 -110 Q 0 -80 0 -40 Z"
              fill="#10B981"
            />
            <path d="M 0 -40 Q 30 -90 20 -120 Q 0 -90 0 -40 Z" fill="#059669" />
            <path
              d="M -5 -40 Q -40 -60 -30 -80 Q -10 -50 0 -40 Z"
              fill="#34D399"
            />
            <path d="M 5 -40 Q 40 -70 30 -90 Q 10 -60 0 -40 Z" fill="#047857" />
          </g>

          {/* Lamp */}
          <g
            className="transition-all duration-500"
            style={{
              opacity: hasLamp ? 1 : 0,
              transform: `translate(${monitorCount === 3 ? 170 : 200}px, 0) scale(${hasLamp ? 1 : 0.8})`,
            }}
          >
            <rect x="-25" y="-8" width="50" height="8" fill="#3F3F46" rx="4" />
            <path
              d="M -5 -8 L -15 -80 L 25 -55"
              fill="none"
              stroke="#52525B"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M 10 -70 L 40 -35 L 15 -20 Z" fill="#27272A" />
            {/* Light Beam */}
            <polygon points="25,-35 70,5 5,10" fill="#FBBF24" opacity="0.15" />
          </g>
        </g>

        {/* --- 4. FOREGROUND CHAIR LAYER --- */}
        {/* Ergo Chair */}
        <g
          className="transition-all duration-500"
          style={{
            opacity: chairId === "chair-ergo" ? 1 : 0,
            transform:
              chairId === "chair-ergo"
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.95)",
            transformOrigin: "400px 550px",
          }}
        >
          <g filter="url(#chair-shadow)">
            {/* Base / Wheels */}
            <rect x="395" y="470" width="10" height="60" fill="#3F3F46" />
            <path
              d="M 400 520 L 350 550 M 400 520 L 450 550"
              stroke="#52525B"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="350" cy="550" r="8" fill="#18181B" />
            <circle cx="450" cy="550" r="8" fill="#18181B" />

            {/* Seat */}
            <rect
              x="360"
              y="450"
              width="80"
              height="20"
              fill="#18181B"
              rx="10"
            />

            {/* Backrest (Mesh style) */}
            <path
              d="M 370 450 Q 390 320 400 320 Q 410 320 430 450 Z"
              fill="#3F3F46"
              opacity="0.95"
            />
            <path
              d="M 370 450 Q 390 320 400 320 Q 410 320 430 450 Z"
              fill="none"
              stroke="#27272A"
              strokeWidth="4"
            />

            {/* Armrests */}
            <path
              d="M 360 450 L 340 450 L 340 400"
              fill="none"
              stroke="#27272A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 440 450 L 460 450 L 460 400"
              fill="none"
              stroke="#27272A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="330" y="396" width="20" height="8" fill="#18181B" rx="4" />
            <rect x="450" y="396" width="20" height="8" fill="#18181B" rx="4" />
          </g>
        </g>

        {/* Executive / Lounge Chair */}
        <g
          className="transition-all duration-500"
          style={{
            opacity: chairId === "chair-lounge" ? 1 : 0,
            transform:
              chairId === "chair-lounge"
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.95)",
            transformOrigin: "400px 550px",
          }}
        >
          <g filter="url(#chair-shadow)">
            {/* Base / Wheels */}
            <rect x="390" y="470" width="20" height="60" fill="#18181B" />
            <path
              d="M 400 520 L 340 550 M 400 520 L 460 550 M 400 520 L 370 560 M 400 520 L 430 560"
              stroke="#27272A"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Backrest (Tall Leather) */}
            <rect
              x="360"
              y="270"
              width="80"
              height="180"
              fill="#9A3412"
              rx="16"
            />
            <rect
              x="365"
              y="275"
              width="70"
              height="170"
              fill="#78350F"
              rx="12"
            />
            <line
              x1="375"
              y1="310"
              x2="425"
              y2="310"
              stroke="#451A03"
              strokeWidth="2"
              opacity="0.3"
            />
            <line
              x1="375"
              y1="350"
              x2="425"
              y2="350"
              stroke="#451A03"
              strokeWidth="2"
              opacity="0.3"
            />
            <line
              x1="375"
              y1="390"
              x2="425"
              y2="390"
              stroke="#451A03"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Seat */}
            <rect
              x="345"
              y="440"
              width="110"
              height="35"
              fill="#9A3412"
              rx="12"
            />
            <rect
              x="350"
              y="445"
              width="100"
              height="25"
              fill="#78350F"
              rx="8"
            />

            {/* Armrests */}
            <path
              d="M 350 450 Q 330 420 330 380 L 360 380"
              fill="none"
              stroke="#27272A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 450 450 Q 470 420 470 380 L 440 380"
              fill="none"
              stroke="#27272A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

// Reusable Sub-Component for Monitors (Anchor is bottom center at x=0, y=0)
function Monitor() {
  return (
    <g>
      {/* Screen Frame */}
      <rect x="-60" y="-95" width="120" height="80" fill="#27272A" rx="4" />
      {/* Screen Panel */}
      <rect x="-56" y="-91" width="112" height="72" fill="#18181B" rx="2" />
      {/* Subtle Screen Reflection/Glow */}
      <polygon points="-56,-91 20,-91 -56,30" fill="#3F3F46" opacity="0.1" />

      {/* Stand Neck */}
      <rect x="-8" y="-25" width="16" height="25" fill="#52525B" />
      {/* Stand Base */}
      <rect x="-30" y="-4" width="60" height="4" fill="#3F3F46" rx="2" />
    </g>
  );
}
