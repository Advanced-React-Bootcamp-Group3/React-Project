import type { Product } from "../entities/Product";
import type { ProductsRepository, PaginatedResponse } from "./ProductsRepository";
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
    getPaginated: async (page: number, limit: number = 12): Promise<PaginatedResponse> => {
      const skip = page * limit;
      const response = await fetch(`${Base_URL}?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return {
        products: toProduct(data.products),
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      };
    },
  };
};
