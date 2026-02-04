import { useState } from "react";
import useFetch from "../hooks/useFetch";
import OrdersTable from "../components/OrdersTable";

type CartProduct = { id: number | string; title: string; quantity: number };
type Cart = {
  id: number | string;
  userId: number;
  products?: CartProduct[];
  total?: number;
};

export default function OrdersPage() {
  const { data: cartsRes, loading } = useFetch<{ carts?: Cart[] }>(
    "https://dummyjson.com/carts?limit=50",
  );
  const carts = cartsRes?.carts ?? [];
  const [selected, setSelected] = useState<Cart | null>(null);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="title">Orders</div>
          <div className="subtitle">Customer orders and carts</div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div className="small">
          {loading ? "Loading..." : `${carts.length} orders`}
        </div>
      </div>

      <div className="panel">
        <OrdersTable carts={carts} onSelect={setSelected} />
      </div>

      {selected && (
        <div className="panel" style={{ marginTop: 12 }}>
          <h4>Order #{selected.id}</h4>
          <div className="small">User: {selected.userId}</div>
          <ul>
            {selected.products?.map((p: CartProduct) => (
              <li key={p.id}>
                {p.title} × {p.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
