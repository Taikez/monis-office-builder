"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Accessories({
  accessoryIds,
}: {
  accessoryIds: string[];
}) {
  // Safely check IDs matching your setup phase
  const hasLamp = accessoryIds.some((id) => id.includes("lamp"));
  const hasPlant = accessoryIds.some((id) => id.includes("plant"));

  return (
    <>
      <AnimatePresence>
        {hasLamp && (
          <motion.div
            key="lamp"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-[12%] z-20 w-[12%] min-w-[40px] max-w-[80px]"
          >
            <div className="relative w-full aspect-[1/2] flex flex-col items-center justify-end">
              {/* Fake light beam */}
              <div className="absolute top-[10%] left-[60%] w-[150%] h-[80%] bg-gradient-to-b from-yellow-200/40 to-transparent rotate-45 origin-top-left pointer-events-none blur-sm" />
              {/* Lamp Architecture */}
              <div className="absolute top-[15%] left-[20%] w-[60%] h-[30%] bg-neutral-800 rounded-t-full rotate-45 z-10" />
              <div className="absolute top-[35%] left-[45%] w-[8%] h-[55%] bg-neutral-600 rotate-12" />
              <div className="w-[50%] h-[8%] bg-neutral-800 rounded-t-sm mt-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasPlant && (
          <motion.div
            key="plant"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 right-[12%] z-20 w-[10%] min-w-[35px] max-w-[70px]"
          >
            <div className="relative w-full aspect-[2/3] flex flex-col items-center justify-end">
              {/* Leaves */}
              <div className="absolute top-[10%] w-[90%] h-[60%] flex justify-center">
                <div className="w-[45%] h-[75%] bg-emerald-500 rounded-full -rotate-45 absolute left-0" />
                <div className="w-[40%] h-[90%] bg-emerald-600 rounded-full absolute -top-[10%]" />
                <div className="w-[45%] h-[75%] bg-emerald-400 rounded-full rotate-45 absolute right-0" />
              </div>
              {/* Pot */}
              <div className="w-[60%] h-[35%] bg-[#D4A373] rounded-b-md border-t-[3px] border-[#BC8A5F] mt-auto z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
