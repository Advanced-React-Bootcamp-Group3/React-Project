import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import "./index.css";

type Page = "dashboard" | "products" | "orders";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="admin-container">
      <aside className="sidebar" role="navigation" aria-label="Sidebar">
        <div className="brand">Hub Shop</div>
        <nav className="nav" aria-label="Main navigation">
          <button
            type="button"
            onClick={() => setPage("dashboard")}
            className={page === "dashboard" ? "active" : ""}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setPage("products")}
            className={page === "products" ? "active" : ""}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setPage("orders")}
            className={page === "orders" ? "active" : ""}
          >
            Orders
          </button>
          <button type="button" onClick={() => {}} aria-disabled>
            Customers
          </button>
          <button type="button" onClick={() => {}} aria-disabled>
            Settings
          </button>
        </nav>
        <div className="footer-note">
          Signed in as <strong className="small">admin@hubshop.test</strong>
        </div>
      </aside>

      <main className="main">
        {page === "dashboard" && <Dashboard />}
        {page === "products" && <ProductsPage />}
        {page === "orders" && <OrdersPage />}
      </main>
    </div>
  );
}
