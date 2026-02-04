// no default React import needed with `jsx: react-jsx`
import useFetch from "../hooks/useFetch";
import StatsCard from "../components/StatsCard";
import ProductsTable from "../components/ProductsTable";
import OrdersTable from "../components/OrdersTable";

type Product = {
  id: number | string;
  title: string;
  price?: number;
  stock?: number;
  category?: string;
};
type CartProduct = { id: number | string; title: string; quantity: number };
type Cart = {
  id: number | string;
  userId: number;
  products?: CartProduct[];
  total?: number;
};

export default function Dashboard() {
  const { data: pCountRes, loading: pCountLoading } = useFetch<{
    total?: number;
  }>("https://dummyjson.com/products?limit=1");
  const { data: uCountRes } = useFetch<{ total?: number }>(
    "https://dummyjson.com/users?limit=1",
  );
  const { data: cCountRes } = useFetch<{ total?: number }>(
    "https://dummyjson.com/carts?limit=1",
  );

  const { data: productsRes } = useFetch<{ products?: Product[] }>(
    "https://dummyjson.com/products?limit=8",
  );
  const { data: cartsRes } = useFetch<{ carts?: Cart[] }>(
    "https://dummyjson.com/carts?limit=6",
  );

  const totalProducts = pCountRes?.total ?? "--";
  const totalUsers = uCountRes?.total ?? "--";
  const totalOrders = cCountRes?.total ?? "--";

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="title">Admin Dashboard</div>
          <div className="subtitle">Overview of your store</div>
        </div>
      </div>

      <div className="cards-grid">
        <StatsCard
          title="Products"
          value={pCountLoading ? "..." : totalProducts}
        />
        <StatsCard title="Users" value={totalUsers} />
        <StatsCard title="Orders" value={totalOrders} />
      </div>

      <section className="section">
        <h3>Recent Products</h3>
        <div className="panel">
          <ProductsTable products={productsRes?.products ?? []} />
        </div>
      </section>

      <section className="section">
        <h3>Recent Orders</h3>
        <div className="panel">
          <OrdersTable carts={cartsRes?.carts ?? []} />
        </div>
      </section>
    </div>
  );
}
