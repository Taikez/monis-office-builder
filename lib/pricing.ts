import { desks, chairs, accessories, monitorProduct } from "./products";
import { WorkspaceConfig } from "@/types/workspace";

export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotalMonthlyPrice = (config: WorkspaceConfig): number => {
  let total = 0;

  const desk = desks.find((d) => d.id === config.deskId);
  if (desk) total += desk.priceMonthly;

  const chair = chairs.find((c) => c.id === config.chairId);
  if (chair) total += chair.priceMonthly;

  total += config.monitorCount * monitorProduct.priceMonthly;

  config.accessoryIds.forEach((id) => {
    const acc = accessories.find((a) => a.id === id);
    if (acc) total += acc.priceMonthly;
  });

  return total;
};
