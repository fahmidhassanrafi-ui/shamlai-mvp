"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { faker } from "@/lib/faker";
import type { Customer, Message, Product, SKU, Order, OrderItem, IntegrationManifest } from "@/types/domain";

type State = {
  customers: Customer[];
  messages: Message[];
  products: Product[];
  skus: SKU[];
  orders: Order[];
  integrations: IntegrationManifest[];
  salesToday: number;
};

type Actions = {
  createOrder: (customerId: string, items: OrderItem[]) => Order;
  deleteProduct: (productId: string) => void;
  addProduct: (name: string, price: number) => void;
  setIntegrationInstalled: (id: string, installed: boolean) => void;
};

function seed(): Omit<State, "salesToday"> & { salesToday: number } {
  const customers: Customer[] = Array.from({ length: 8 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number()
  }));
  const products: Product[] = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription()
  }));
  const skus: SKU[] = products.flatMap((p) => [{
    id: faker.string.uuid(),
    productId: p.id,
    code: faker.string.alphanumeric(8).toUpperCase(),
    price: faker.number.int({ min: 300, max: 1500 }),
    reorderLevel: 10,
    inStock: faker.number.int({ min: 5, max: 60 }),
    reserved: faker.number.int({ min: 0, max: 5 })
  }]);
  const messages: Message[] = Array.from({ length: 14 }).map(() => {
    const c = faker.helpers.arrayElement(customers);
    const channel = faker.helpers.arrayElement(["messenger", "whatsapp", "instagram"] as const);
    return {
      id: faker.string.uuid(),
      customerId: c.id,
      channel,
      text: faker.lorem.sentence(),
      createdAt: faker.date.recent({ days: 7 }).toISOString()
    };
  });
  const integrations: IntegrationManifest[] = [
    {
      id: "steadfast",
      name: "Steadfast Courier",
      category: "delivery",
      description: "Bangladesh delivery integration",
      icon: "🚚",
      configSchema: {
        apiKey: { label: "API Key", type: "secret" },
        storeId: { label: "Store ID", type: "text" }
      },
      isInstalled: false
    },
    {
      id: "bkash",
      name: "bKash Payments",
      category: "payments",
      description: "Collect prepaid via bKash",
      icon: "💳",
      configSchema: {
        merchantId: { label: "Merchant ID", type: "text" },
        environment: { label: "Environment", type: "select", options: ["sandbox", "live"] }
      },
      isInstalled: false
    },
    {
      id: "canva",
      name: "Canva Design",
      category: "design",
      description: "Design posts and product images",
      icon: "🎨",
      configSchema: {},
      isInstalled: false
    },
    {
      id: "meta-ads",
      name: "Meta Ads",
      category: "ads",
      description: "Boost posts and run ads",
      icon: "📈",
      configSchema: {
        adAccountId: { label: "Ad Account ID", type: "text" }
      },
      isInstalled: false
    }
  ];
  const orders: Order[] = [];
  const salesToday = faker.number.int({ min: 10000, max: 70000 });
  return { customers, messages, products, skus, orders, integrations, salesToday };
}

export const useDB = create<State & Actions>()(persist((set, get) => ({
  ...seed(),
  createOrder: (customerId, items) => {
    const skus = get().skus.map((s) => {
      const item = items.find(i => i.skuId === s.id);
      return item ? { ...s, inStock: Math.max(0, s.inStock - item.quantity), reserved: s.reserved + item.quantity } : s;
    });
    const order: Order = {
      id: faker.string.alphanumeric(10).toUpperCase(),
      customerId,
      items,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    set((state) => ({ skus, orders: [order, ...state.orders] }));
    return order;
  },
  deleteProduct: (productId) => set((state) => ({
    products: state.products.filter(p => p.id !== productId),
    skus: state.skus.filter(s => s.productId !== productId)
  })),
  addProduct: (name, price) => set((state) => {
    const productId = faker.string.uuid();
    const skuId = faker.string.uuid();
    return {
      products: [{ id: productId, name, description: "" }, ...state.products],
      skus: [{ id: skuId, productId, code: faker.string.alphanumeric(8).toUpperCase(), price, reorderLevel: 10, inStock: 20, reserved: 0 }, ...state.skus]
    };
  }),
  setIntegrationInstalled: (id, installed) => set((state) => ({
    integrations: state.integrations.map(i => i.id === id ? { ...i, isInstalled: installed } : i)
  }))
}), { name: "shamlai-mvp" }));
