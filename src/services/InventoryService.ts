import { Product } from "../models/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export const InventoryService = {
  async addProduct(
    category: string,
    name: string,
    barcode: string,
    imageUrl: string,
    costPrice: number,
    sellingPrice: number,
    quantity: number,
    lowStockThreshold: number,
  ) {
    if (quantity < 0) throw new Error("Quantity cannot be negative");
    if (costPrice < 0) throw new Error("Cost Price cannot be negative");
    if (sellingPrice < 0) throw new Error("Cost Price cannot be negative");

    const createdAt = new Date();
    const updatedAt = new Date();

    await ProductRepository.insertProduct(
      category,
      name,
      barcode,
      imageUrl,
      costPrice,
      sellingPrice,
      quantity,
      lowStockThreshold,
      createdAt,
      updatedAt,
    );
  },

  async updateProduct(
    id: number,
    category: string,
    name: string,
    barcode: string,
    imageUrl: string,
    costPrice: number,
    sellingPrice: number,
    quantity: number,
    lowStockThreshold: number,
  ) {
    if (quantity < 0) throw new Error("Quantity cannot be negative");
    if (costPrice < 0) throw new Error("Cost Price cannot be negative");
    if (sellingPrice < 0) throw new Error("Cost Price cannot be negative");

    const updatedAt = new Date();

    await ProductRepository.updateProduct(
      id,
      category,
      name,
      barcode,
      imageUrl,
      costPrice,
      sellingPrice,
      quantity,
      lowStockThreshold,
      updatedAt,
    );
  },

  async listProduct(): Promise<Product[]> {
    return await ProductRepository.getAll();
  },

  async getProductById(id: number): Promise<Product | null> {
    return await ProductRepository.getDataById(id);
  },

  async resetData(): Promise<void> {
    await ProductRepository.resetData();
  },

  async deleteProductBulk(productIds: number[]): Promise<boolean> {
    await ProductRepository.deleteBulk(productIds);
    return true;
  },
};
