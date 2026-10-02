"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Monitors({ count }: { count: number }) {
  if (count <= 0) return null;
  const items = Array.from({ length: count });

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center gap-2 sm:gap-4 z-10 w-full">
      <AnimatePresence>
        {items.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="w-[22%] min-w-[50px] max-w-[100px] flex flex-col items-center"
          >
            <div className="w-full aspect-[16/10] bg-neutral-800 border-[3px] border-neutral-900 rounded-md shadow-lg relative overflow-hidden">
              {/* Screen Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-emerald-800/20" />
            </div>
            <div className="w-[10%] h-4 sm:h-6 bg-neutral-700" />
            <div className="w-[45%] h-1 sm:h-1.5 bg-neutral-600 rounded-t-sm" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
