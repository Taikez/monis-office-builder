import { Product } from "@/types/workspace";

export const desks: Product[] = [
  {
    id: "desk-minimal",
    name: "Minimal Desk",
    category: "desk",
    priceMonthly: 750000,
    image: "/products/desks/minimal.webp",
  },
  {
    id: "desk-standing",
    name: "Standing Desk",
    category: "desk",
    priceMonthly: 1250000,
    image: "/products/desks/standing.webp",
  },
];

export const chairs: Product[] = [
  {
    id: "chair-ergo",
    name: "Ergo Chair",
    category: "chair",
    priceMonthly: 500000,
    image: "/products/chairs/ergo.webp",
  },
  {
    id: "chair-lounge",
    name: "Executive Chair",
    category: "chair",
    priceMonthly: 850000,
    image: "/products/chairs/executive.webp",
  },
];

export const monitorProduct: Product = {
  id: "monitor-27",
  name: '27" 4K Monitor',
  category: "monitor",
  priceMonthly: 350000,
  image: "/products/monitors/monitor.webp",
};

export const accessories: Product[] = [
  {
    id: "acc-lamp",
    name: "Desk Lamp",
    category: "accessory",
    priceMonthly: 150000,
    image: "/products/accessories/lamp.webp",
  },
  {
    id: "acc-plant",
    name: "Potted Plant",
    category: "accessory",
    priceMonthly: 75000,
    image: "/products/accessories/plant.webp",
  },
  {
    id: "acc-laptop-stand",
    name: "Laptop Stand",
    category: "accessory",
    priceMonthly: 100000,
    image: "/products/accessories/stand.webp",
  },
];
