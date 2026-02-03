import React, { useState } from "react";
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
        <nav className="nav">
          <a
            onClick={() => setPage("dashboard")}
            className={page === "dashboard" ? "active" : ""}
          >
            Dashboard
          </a>
          <a
            onClick={() => setPage("products")}
            className={page === "products" ? "active" : ""}
          >
            Products
          </a>
          <a
            onClick={() => setPage("orders")}
            className={page === "orders" ? "active" : ""}
          >
            Orders
          </a>
          <a>Customers</a>
          <a>Settings</a>
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
