import { create } from "zustand";
import { WorkspaceConfig } from "@/types/workspace";

interface WorkspaceState extends WorkspaceConfig {
  selectDesk: (id: string) => void;
  selectChair: (id: string) => void;
  setMonitorCount: (count: number) => void;
  toggleAccessory: (id: string) => void;
  resetWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  deskId: "desk-minimal",
  chairId: "chair-ergo",
  monitorCount: 1,
  accessoryIds: ["acc-lamp"],

  selectDesk: (id) => set({ deskId: id }),
  selectChair: (id) => set({ chairId: id }),
  setMonitorCount: (count) =>
    set({ monitorCount: Math.max(0, Math.min(3, count)) }),
  toggleAccessory: (id) =>
    set((state) => ({
      accessoryIds: state.accessoryIds.includes(id)
        ? state.accessoryIds.filter((accId) => accId !== id)
        : [...state.accessoryIds, id],
    })),
  resetWorkspace: () =>
    set({
      deskId: "desk-minimal",
      chairId: "chair-ergo",
      monitorCount: 1,
      accessoryIds: ["acc-lamp"],
    }),
}));
