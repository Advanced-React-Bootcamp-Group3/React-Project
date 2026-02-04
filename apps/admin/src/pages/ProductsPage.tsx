import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductsTable from "../components/ProductsTable";

type Product = {
  id: number | string;
  title: string;
  price?: number;
  stock?: number;
  category?: string;
};

export default function ProductsPage() {
  const { data: productsRes, loading } = useFetch<{ products?: Product[] }>(
    "https://dummyjson.com/products?limit=100",
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const base = productsRes?.products ?? [];
    if (!query) return base;
    const q = query.toLowerCase();
    return base.filter(
      (p: Product) =>
        p.title.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q),
    );
  }, [productsRes, query]);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="title">Products</div>
          <div className="subtitle">Manage your store products</div>
        </div>
      </div>

      <div
        style={{
          marginBottom: 12,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid var(--border)",
            width: 260,
          }}
        />
        <div className="small">
          {loading ? "Loading..." : `${filtered.length} results`}
        </div>
      </div>

      <div className="panel">
        <ProductsTable products={filtered} />
      </div>
    </div>
  );
}
