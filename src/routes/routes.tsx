import { createRootRoute, createRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import { HomePage } from "../components/HomePage";
import { ProductsPage } from "../modules/products/views/ProductsPage";
import { ProductDetailsPage } from "../modules/products/views/ProductDetailsPage";
import { CartPage } from "../modules/cart/views/CartPage";
import { CheckoutPage } from "../modules/checkout/views/CheckoutPage";

const RootComponent = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <Navigate to="/" />,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || undefined,
  }),
  component: ProductsPage,
});

export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductDetailsPage,
});

export const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

export const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
]);

