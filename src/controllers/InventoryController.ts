import { useCallback, useState } from "react";
import { Product } from "../models/Product";
import { InventoryService } from "../services/InventoryService";

export const useInventoryController = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllProductData = useCallback(async () => {
    setLoading(true);
    const data = await InventoryService.listProduct();
    setProducts(data);
    setLoading(false);
  }, []);

  const getProductById = useCallback(
    async (id: number): Promise<Product | null> => {
      return InventoryService.getProductById(id);
    },
    [],
  );

  const createProduct = async (
    category: string,
    name: string,
    barcode: string,
    imageUrl: string,
    costPrice: number,
    sellingPrice: number,
    quantity: number,
    lowStockThreshold: number,
  ) => {
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
    await loadAllProductData();
    return true;
  };

  const editProduct = async (
    id: number,
    category: string,
    name: string,
    barcode: string,
    imageUrl: string,
    costPrice: number,
    sellingPrice: number,
    quantity: number,
    lowStockThreshold: number,
  ) => {
    await InventoryService.updateProduct(
      id,
      category,
      name,
      barcode,
      imageUrl,
      costPrice,
      sellingPrice,
      quantity,
      lowStockThreshold,
    );
    return true;
  };

  const resetData = async () => {
    await InventoryService.resetData();
    await loadAllProductData();
  };
  return {
    products,
    loading,
    loadAllProductData,
    getProductById,
    createProduct,
    editProduct,
    resetData,
  };
};
