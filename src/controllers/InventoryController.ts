import { Product } from "../models/Product";
import { InventoryService } from "../services/InventoryService";

export const InventoryController = {
  async loadProducts(): Promise<Product[]> {
    return await InventoryService.listProduct();
  },

  async createItem(
    category: string,
    name: string,
    barcode: string,
    imageUrl: string,
    costPrice: number,
    sellingPrice: number,
    quantity: number,
    lowStockThreshold: number,
  ) {
    await InventoryService.addProduct(
      category,
      name,
      barcode,
      imageUrl,
      costPrice,
      sellingPrice,
      quantity,
      lowStockThreshold,
    );
  },

  async resetData() {
    InventoryService.resetData();
  },
};
