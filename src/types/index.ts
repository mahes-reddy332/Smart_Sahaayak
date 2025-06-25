export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  itemId: string;
  itemName: string;
  quantitySold: number;
  unitPrice: number;
  totalAmount: number;
  profit: number;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  type: 'supplier' | 'customer';
  email?: string;
  address?: string;
  createdAt: Date;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  recipientName: string;
  recipientPhone: string;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
}

export interface BusinessInsight {
  totalRevenue: number;
  totalProfit: number;
  totalSales: number;
  lowStockItems: InventoryItem[];
  topSellingItems: { item: InventoryItem; totalSold: number }[];
  profitTrend: { date: string; profit: number }[];
}