"use client";

import { useState } from "react";
import { useWorkspaceStore } from "@/store/workspace-store";
import { desks, chairs, accessories, monitorProduct } from "@/lib/products";
import { formatIDR } from "@/lib/pricing";
import { Check, Monitor as MonitorIcon, Minus, Plus } from "lucide-react";

type Tab = "desk" | "chair" | "monitor" | "accessory";

export function Configurator() {
  const [activeTab, setActiveTab] = useState<Tab>("desk");

  const {
    deskId,
    selectDesk,
    chairId,
    selectChair,
    monitorCount,
    setMonitorCount,
    accessoryIds,
    toggleAccessory,
  } = useWorkspaceStore();

  const tabs: { id: Tab; label: string }[] = [
    { id: "desk", label: "Desk" },
    { id: "chair", label: "Chair" },
    { id: "monitor", label: "Monitors" },
    { id: "accessory", label: "Extras" },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header & Tabs */}
      <div className="pt-8 px-6 lg:px-8 pb-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-neutral-100">
        <h2 className="text-2xl font-semibold mb-1 text-neutral-900 tracking-tight">
          Design your setup
        </h2>
        <p className="text-sm text-neutral-500 mb-6">
          Select the perfect equipment for your workflow.
        </p>

        {/* Scrollable Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-neutral-900 text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
        {activeTab === "desk" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Select a Desk
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {desks.map((desk) => (
                <ProductCard
                  key={desk.id}
                  name={desk.name}
                  price={desk.priceMonthly}
                  isSelected={deskId === desk.id}
                  onClick={() => selectDesk(desk.id)}
                  thumbnail={
                    desk.id === "desk-minimal" ? (
                      <div className="w-16 h-12 flex flex-col justify-end">
                        <div className="w-full h-2 bg-[#D4A373] rounded-sm" />
                        <div className="flex justify-between px-2 h-8">
                          <div className="w-1.5 h-full bg-neutral-300" />
                          <div className="w-1.5 h-full bg-neutral-300" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-12 flex flex-col justify-end">
                        <div className="w-full h-2 bg-neutral-800 rounded-sm" />
                        <div className="flex justify-between px-2 h-10">
                          <div className="w-2 h-full bg-neutral-600">
                            <div className="w-4 h-1 bg-neutral-800 -ml-1 rounded-t-sm" />
                          </div>
                          <div className="w-2 h-full bg-neutral-600">
                            <div className="w-4 h-1 bg-neutral-800 -ml-1 rounded-t-sm" />
                          </div>
                        </div>
                      </div>
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "chair" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Select a Chair
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {chairs.map((chair) => (
                <ProductCard
                  key={chair.id}
                  name={chair.name}
                  price={chair.priceMonthly}
                  isSelected={chairId === chair.id}
                  onClick={() => selectChair(chair.id)}
                  thumbnail={
                    chair.id === "chair-ergo" ? (
                      <div className="w-12 h-16 flex flex-col items-center justify-end">
                        <div className="w-4 h-2 bg-neutral-800 rounded-full mb-0.5" />
                        <div className="w-6 h-6 bg-neutral-700 rounded-md mb-0.5" />
                        <div className="w-8 h-2 bg-neutral-900 rounded-lg" />
                        <div className="w-1 h-3 bg-neutral-400" />
                        <div className="w-10 h-1 bg-neutral-500 rounded-full" />
                      </div>
                    ) : (
                      <div className="w-12 h-16 flex flex-col items-center justify-end">
                        <div className="w-7 h-8 bg-[#8B5A2B] rounded-t-xl rounded-b-sm mb-0.5 border-t-2 border-[#6B4226]" />
                        <div className="w-9 h-2.5 bg-[#6B4226] rounded-md" />
                        <div className="w-1.5 h-3 bg-neutral-700" />
                        <div className="w-10 h-1 bg-neutral-700 rounded-full" />
                      </div>
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "monitor" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              External Displays
            </h3>
            <div className="p-5 border-2 border-neutral-200 rounded-2xl bg-white shadow-sm flex items-center justify-between transition-all hover:border-neutral-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-100">
                  <MonitorIcon className="w-6 h-6 text-neutral-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">
                    {monitorProduct.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    +{formatIDR(monitorProduct.priceMonthly)} / ea
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-neutral-50 rounded-xl p-1 border border-neutral-100 shadow-inner">
                <button
                  onClick={() => setMonitorCount(monitorCount - 1)}
                  disabled={monitorCount === 0}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm border border-neutral-200 disabled:opacity-30 transition-all text-neutral-700 hover:bg-neutral-50 active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center font-bold text-neutral-900">
                  {monitorCount}
                </span>
                <button
                  onClick={() => setMonitorCount(monitorCount + 1)}
                  disabled={monitorCount === 3}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm border border-neutral-200 disabled:opacity-30 transition-all text-neutral-700 hover:bg-neutral-50 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "accessory" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Desk Accessories
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {accessories.map((acc) => {
                const isSelected = accessoryIds.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`flex items-center justify-between p-4 lg:p-5 rounded-2xl cursor-pointer transition-all border-2 shadow-sm active:scale-[0.99] ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-neutral-100 bg-white hover:border-neutral-200 hover:bg-neutral-50/50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4" strokeWidth={3} />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900 block">
                          {acc.name}
                        </span>
                        <span className="text-sm text-neutral-500">
                          +{formatIDR(acc.priceMonthly)}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Internal Product Card Component
function ProductCard({
  name,
  price,
  isSelected,
  onClick,
  thumbnail,
}: {
  name: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  thumbnail: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-[0.98] flex flex-col ${
        isSelected
          ? "border-emerald-500 bg-emerald-50/30 shadow-md ring-4 ring-emerald-500/10"
          : "border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm"
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm z-10">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      )}
      <div className="aspect-[4/3] bg-[#FAF9F6] rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-neutral-100/60 relative">
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 shadow-inner rounded-xl pointer-events-none" />
        {thumbnail}
      </div>
      <h4 className="font-semibold text-neutral-900 leading-tight">{name}</h4>
      <p className="text-sm font-medium text-neutral-500 mt-1">
        {formatIDR(price)}
        <span className="text-xs font-normal">/mo</span>
      </p>
    </div>
  );
}
