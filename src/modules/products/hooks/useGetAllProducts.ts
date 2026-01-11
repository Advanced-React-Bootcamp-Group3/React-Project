import { useEffect, useState } from "react";
import { useProducts } from ".."
import type { Product } from "../entities/Product";


export const useGetAllProducts = () => {
    const { getAll } = useProducts();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAll();
            setProducts(data);
        }
    fetchProducts();
    } ,[])

    return {
        products
    }
}