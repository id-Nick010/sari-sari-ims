export interface Product {
  id: number;
  category: string;
  name: string;
  barcode: string;
  image_url: string;
  cost_price: number;
  selling_price: number;
  quantity: number;
  low_stock_threshold: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}
