"use client";
import { useDB } from "./db";
import type { OrderItem, Channel } from "@/types/domain";

function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((res) => setTimeout(() => res(data), ms));
}

export function getDashboard() {
  const db = useDB.getState();
  const pending = db.orders.filter(o => o.status === "pending").length;
  const lowStock = db.skus.filter(s => s.inStock <= s.reorderLevel).length;
  return delay({ salesToday: db.salesToday, pendingOrders: pending, lowStock, campaigns: 2, cashflow: 125000 });
}

export function listMessages(filter?: Channel) {
  const db = useDB.getState();
  const messages = filter ? db.messages.filter(m => m.channel === filter) : db.messages;
  return delay(messages.sort((a,b)=> (a.createdAt < b.createdAt ? 1 : -1)));
}

export function getConversation(messageId: string) {
  const db = useDB.getState();
  const msg = db.messages.find(m => m.id === messageId);
  if (!msg) return delay(null);
  const customer = db.customers.find(c => c.id === msg.customerId)!;
  const convo = db.messages.filter(m => m.customerId === msg.customerId).sort((a,b)=> a.createdAt.localeCompare(b.createdAt));
  return delay({ customer, convo });
}

export function listProducts() { return delay(useDB.getState().products); }
export function listSKUs() { return delay(useDB.getState().skus); }
export function listOrders() { return delay(useDB.getState().orders); }

export function createOrderFromMessage(messageId: string, items: OrderItem[]) {
  const db = useDB.getState();
  const msg = db.messages.find(m => m.id === messageId);
  if (!msg) throw new Error("Message not found");
  const order = db.createOrder(msg.customerId, items);
  return delay(order);
}

export function listIntegrations() { return delay(useDB.getState().integrations); }
export function setIntegrationInstalled(id: string, installed: boolean) {
  const db = useDB.getState();
  db.setIntegrationInstalled(id, installed);
  return delay(true, 200);
}

export function addProduct(name: string, price: number) {
  const db = useDB.getState();
  db.addProduct(name, price);
  return delay(true, 200);
}
export function deleteProduct(productId: string) {
  const db = useDB.getState();
  db.deleteProduct(productId);
  return delay(true, 200);
}
