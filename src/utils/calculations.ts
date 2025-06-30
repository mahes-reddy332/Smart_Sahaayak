import { InventoryItem, Sale } from '../types';

export function calculateProfit(costPrice: number, sellingPrice: number, quantity: number): number {
  return (sellingPrice - costPrice) * quantity;
}

export function calculateProfitMargin(costPrice: number, sellingPrice: number): number {
  return ((sellingPrice - costPrice) / costPrice) * 100;
}

export function getTodaysSales(sales: Sale[]): Sale[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return sales.filter(sale => {
    const saleDate = new Date(sale.createdAt);
    saleDate.setHours(0, 0, 0, 0);
    return saleDate.getTime() === today.getTime();
  });
}

export function getTotalRevenue(sales: Sale[]): number {
  return sales.reduce((total, sale) => total + sale.totalAmount, 0);
}

export function getTotalProfit(sales: Sale[]): number {
  return sales.reduce((total, sale) => total + sale.profit, 0);
}

export function getLowStockItems(inventory: InventoryItem[], threshold: number = 10): InventoryItem[] {
  return inventory.filter(item => item.quantity < threshold);
}

export function getTopSellingItems(inventory: InventoryItem[], sales: Sale[]): { item: InventoryItem; totalSold: number }[] {
  const salesByItem = sales.reduce((acc, sale) => {
    acc[sale.itemId] = (acc[sale.itemId] || 0) + sale.quantitySold;
    return acc;
  }, {} as Record<string, number>);

  return inventory
    .map(item => ({
      item,
      totalSold: salesByItem[item.id] || 0
    }))
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}