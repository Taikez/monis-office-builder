export type ProductCategory =
  | "desk"
  | "chair"
  | "monitor"
  | "lighting"
  | "accessory";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  priceMonthly: number;
  image: string;
  description?: string;
  badge?: string;
};

export type WorkspaceConfig = {
  deskId: string;
  chairId: string;
  monitorCount: number;
  accessoryIds: string[];
};
