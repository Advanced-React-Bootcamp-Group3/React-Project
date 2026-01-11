import { useEffect, useState } from "react";
import { useProducts } from ".."
import type { Product } from "../entities/Product";


export const useGetAllProducts = () => {
    const { getAll } = useProducts();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getAll();
            setProducts(data);
            setLoading(false);
        }
    fetchProducts();
    } ,[])

    return {
        products,
        loading
    }
}