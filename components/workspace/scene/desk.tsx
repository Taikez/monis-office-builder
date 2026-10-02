"use client";
import { motion, AnimatePresence } from "framer-motion";

interface DeskProps {
  deskId: string;
  children: React.ReactNode;
}

export default function Desk({ deskId, children }: DeskProps) {
  const isStanding = deskId.includes("standing");

  return (
    <AnimatePresence mode="wait">
      {isStanding ? (
        <motion.div
          key="standing"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute bottom-0 w-full h-[125%] flex flex-col justify-end"
        >
          {/* Standing Desk Top */}
          <div className="relative w-full h-[10%] bg-neutral-800 rounded-md shadow-md z-20">
            {children}
            <div className="absolute top-full w-full h-[15%] bg-neutral-900 rounded-b-sm" />
          </div>
          {/* Adjustable Legs */}
          <div className="relative w-[75%] mx-auto h-[90%] flex justify-between z-10">
            <div className="w-[7%] h-full bg-neutral-600 flex flex-col items-center justify-end">
              <div className="w-[350%] h-[6%] bg-neutral-800 rounded-t-sm" />
            </div>
            <div className="w-[7%] h-full bg-neutral-600 flex flex-col items-center justify-end">
              <div className="w-[350%] h-[6%] bg-neutral-800 rounded-t-sm" />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="minimal"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute bottom-0 w-full h-full flex flex-col justify-end"
        >
          {/* Minimal Wooden Top */}
          <div className="relative w-full h-[12%] bg-[#D4A373] rounded-sm shadow-sm z-20">
            {children}
            <div className="absolute top-full w-full h-[15%] bg-black/10" />
          </div>
          {/* Minimal Legs */}
          <div className="relative w-[85%] mx-auto h-[88%] flex justify-between z-10">
            <div className="w-[4%] h-full bg-neutral-300 shadow-sm" />
            <div className="w-[4%] h-full bg-neutral-300 shadow-sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
