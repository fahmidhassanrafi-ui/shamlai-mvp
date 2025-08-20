export type Channel = "messenger" | "whatsapp" | "instagram";

export interface Customer { id: string; name: string; phone?: string; }
export interface Message { id: string; customerId: string; channel: Channel; text: string; createdAt: string; }
export interface Product { id: string; name: string; description?: string; }

export interface SKU {
  id: string;
  productId: string;
  code: string;
  price: number;
  reorderLevel: number;
  inStock: number;
  reserved: number;
}

export interface OrderItem { skuId: string; quantity: number; price: number; }
export interface Order { id: string; customerId: string; items: OrderItem[]; status: "pending" | "confirmed" | "shipped"; createdAt: string; }

export interface StockMovement { id: string; skuId: string; change: number; note?: string; createdAt: string; }
export interface LedgerEntry { id: string; date: string; type: "revenue" | "expense"; amount: number; note?: string; }
export interface Campaign { id: string; title: string; scheduledFor: string; channel: "facebook" | "instagram" | "tiktok"; }

export interface IntegrationManifest {
  id: string;
  name: string;
  category: 'delivery' | 'payments' | 'ads' | 'design' | 'analytics' | 'other';
  description: string;
  icon: string;
  configSchema: Record<string, { label: string; type: 'text'|'secret'|'select'; options?: string[] }>;
  isInstalled: boolean;
}
