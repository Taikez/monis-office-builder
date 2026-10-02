"use client";

import { useState } from "react";
import { Configurator } from "../configurator/configurator";
import { useWorkspaceStore } from "@/store/workspace-store";
import { calculateTotalMonthlyPrice, formatIDR } from "@/lib/pricing";
import { WorkspaceScene } from "./workspace-scene";
import { CheckoutModal } from "../checkout/checkout-modal";

export default function WorkspaceBuilder() {
  const store = useWorkspaceStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalPrice = calculateTotalMonthlyPrice({
    deskId: store.deskId,
    chairId: store.chairId,
    monitorCount: store.monitorCount,
    accessoryIds: store.accessoryIds,
  });

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] bg-[#FAF9F6] overflow-hidden relative">
      {/* 2D Scene Preview Area */}
      <section className="flex-none lg:flex-1 h-[45vh] lg:h-auto relative flex items-center justify-center p-4 lg:p-12 z-0">
        <div className="w-full h-full max-w-5xl flex items-center justify-center">
          <WorkspaceScene />
        </div>
      </section>

      {/* Configurator Sidebar */}
      <section className="flex-1 lg:flex-none lg:w-[420px] xl:w-[480px] bg-white border-l border-neutral-200 z-10 shadow-2xl lg:shadow-none relative flex flex-col rounded-t-3xl lg:rounded-none -mt-6 lg:mt-0 pb-[100px] lg:pb-[100px] overflow-hidden">
        {/* Scrollable Configurator Content */}
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <Configurator />
        </div>

        {/* Sticky Price & Checkout CTA */}
        <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 bg-white/90 backdrop-blur-md border-t border-neutral-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
          <div className="flex items-center justify-between mb-3 lg:mb-4 px-2">
            <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
              Estimated Total
            </span>
            <div className="text-right">
              <span className="text-lg lg:text-xl font-bold text-neutral-900">
                {formatIDR(totalPrice)}
              </span>
              <span className="text-sm font-normal text-neutral-500 ml-1">
                / mo
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-neutral-900 text-white py-3.5 lg:py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors shadow-md active:scale-[0.98]"
          >
            Review Setup
          </button>
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalPrice={totalPrice}
      />
    </div>
  );
}
