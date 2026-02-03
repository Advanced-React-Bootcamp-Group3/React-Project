import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductsTable from "../components/ProductsTable";

export default function ProductsPage() {
  const { data: productsRes, loading } = useFetch<any>(
    "https://dummyjson.com/products?limit=100",
  );
  const products = productsRes?.products ?? [];
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p: any) =>
        p.title.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q),
    );
  }, [products, query]);

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
