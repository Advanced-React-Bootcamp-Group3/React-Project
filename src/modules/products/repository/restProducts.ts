import type { Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductsRepository";
import {toProduct} from "../adapters/toProduct";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(Base_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json().then((data) => toProduct(data.products));
    },
  };
};
