export interface Product {
  id: number;
  category: string;
  name: string;
  barcode: string;
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  lowStockThreshold: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
