"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, ChevronRight } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspace-store";
import { desks, chairs, accessories, monitorProduct } from "@/lib/products";
import { formatIDR } from "@/lib/pricing";

export function CheckoutModal({
  isOpen,
  onClose,
  totalPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
}) {
  const [step, setStep] = useState<"review" | "success">("review");
  const store = useWorkspaceStore();

  // Reset to review step whenever modal opens
  useEffect(() => {
    if (isOpen) setStep("review");
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedDesk = desks.find((d) => d.id === store.deskId);
  const selectedChair = chairs.find((c) => c.id === store.chairId);
  const selectedAccessories = store.accessoryIds
    .map((id) => accessories.find((a) => a.id === id))
    .filter(Boolean);

  const handleRent = () => {
    // In a real app, API call goes here.
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
        onClick={step === "review" ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        {step === "review" ? (
          <div className="flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-xl font-semibold text-neutral-900">
                Review Setup
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">
                Included Items
              </h3>

              <ul className="space-y-4 mb-8">
                {selectedDesk && (
                  <LineItem
                    name={selectedDesk.name}
                    price={selectedDesk.priceMonthly}
                  />
                )}
                {selectedChair && (
                  <LineItem
                    name={selectedChair.name}
                    price={selectedChair.priceMonthly}
                  />
                )}

                {store.monitorCount > 0 && (
                  <LineItem
                    name={`${store.monitorCount}x ${monitorProduct.name}`}
                    price={store.monitorCount * monitorProduct.priceMonthly}
                  />
                )}

                {selectedAccessories.map(
                  (acc) =>
                    acc && (
                      <LineItem
                        key={acc.id}
                        name={acc.name}
                        price={acc.priceMonthly}
                      />
                    ),
                )}
              </ul>

              <div className="pt-4 border-t border-neutral-200 border-dashed flex justify-between items-end">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">
                    Monthly Total
                  </p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {formatIDR(totalPrice)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-neutral-50 border-t border-neutral-100">
              <button
                onClick={handleRent}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center group"
              >
                Rent This Setup
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in spin-in-12 duration-500">
              <CheckCircle2 className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              Your workspace is reserved!
            </h2>
            <p className="text-neutral-500 mb-8 max-w-[280px]">
              We have received your configuration. The Monis team will contact
              you shortly to arrange delivery in Bali.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
            >
              Back to Editor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LineItem({ name, price }: { name: string; price: number }) {
  return (
    <li className="flex justify-between items-center text-sm md:text-base">
      <span className="font-medium text-neutral-700">{name}</span>
      <span className="text-neutral-500">{formatIDR(price)}</span>
    </li>
  );
}
