"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Chair({ chairId }: { chairId: string }) {
  const isExecutive = chairId.includes("exec");

  return (
    <AnimatePresence mode="wait">
      {isExecutive ? (
        <motion.div
          key="executive"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-0 w-full h-[115%] flex flex-col items-center justify-end"
        >
          {/* Executive Tall Back */}
          <div className="w-[55%] h-[55%] bg-[#8B5A2B] rounded-t-3xl rounded-b-lg shadow-inner mb-1 border-x-4 border-t-4 border-[#6B4226] z-10" />
          {/* Armrests */}
          <div className="absolute top-[48%] w-[75%] flex justify-between h-[18%] z-20">
            <div className="w-[18%] h-[20%] bg-[#6B4226] rounded-full mt-auto" />
            <div className="w-[18%] h-[20%] bg-[#6B4226] rounded-full mt-auto" />
          </div>
          {/* Seat */}
          <div className="w-[65%] h-[15%] bg-[#6B4226] rounded-2xl shadow-xl z-10 border-b-4 border-[#4A2E1B]" />
          <div className="w-[12%] h-[15%] bg-neutral-700" />
          {/* Base */}
          <div className="w-[75%] h-[6%] border-t-[5px] border-neutral-700 rounded-full relative">
            <div className="absolute -bottom-2 left-0 w-3.5 h-3.5 bg-neutral-900 rounded-full" />
            <div className="absolute -bottom-2 right-0 w-3.5 h-3.5 bg-neutral-900 rounded-full" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="ergo"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end"
        >
          {/* Ergo Headrest & Mesh Back */}
          <div className="w-[35%] h-[12%] bg-neutral-800 rounded-full mb-1" />
          <div className="w-[45%] h-[42%] bg-neutral-700 rounded-xl mb-1 opacity-95 shadow-inner" />
          {/* Armrests */}
          <div className="absolute top-[48%] w-[65%] flex justify-between h-[15%] z-20">
            <div className="w-[12%] h-full bg-neutral-800 rounded-t-sm" />
            <div className="w-[12%] h-full bg-neutral-800 rounded-t-sm" />
          </div>
          {/* Seat */}
          <div className="w-[55%] h-[12%] bg-neutral-900 rounded-xl shadow-lg z-10" />
          <div className="w-[8%] h-[18%] bg-neutral-400" />
          {/* Base */}
          <div className="w-[65%] h-[6%] border-t-[5px] border-neutral-500 rounded-full relative">
            <div className="absolute -bottom-2 left-0 w-3 h-3 bg-neutral-900 rounded-full" />
            <div className="absolute -bottom-2 right-0 w-3 h-3 bg-neutral-900 rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
