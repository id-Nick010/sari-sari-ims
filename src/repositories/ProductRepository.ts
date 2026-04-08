import { openDB } from "../db/sqlite";
import { Product } from "../models/Product";

export const ProductRepository = {
  async getAll(): Promise<Product[]> {
    const db = await openDB();
    return await db.getAllAsync<Product>("SELECT * FROM products");
  },

  async insert(
    category: string,
    name: string,
    barcode: string,
    imageUrl: string,
    costPrice: number,
    sellingPrice: number,
    quantity: number,
    lowStockThreshold: number,
    createdAt: Date,
    updatedAt: Date,
  ): Promise<void> {
    const db = await openDB();
    const createdAtString = createdAt.toISOString();
    const updatedAtString = updatedAt.toISOString();

    await db.runAsync(
      "INSERT INTO products (category, name, barcode, image_url, cost_price, selling_price, quantity, low_stock_threshold, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        category,
        name,
        barcode,
        imageUrl,
        costPrice,
        sellingPrice,
        quantity,
        lowStockThreshold,
        createdAtString,
        updatedAtString,
      ],
    );
  },
};
