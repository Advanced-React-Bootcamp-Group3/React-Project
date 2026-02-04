import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { routeTree } from "./routes/routes";
import { createCartModule } from "./modules/cart/index";
import { createCategoriesModule } from "./modules/categories/index";
import { FavoritesProvider } from "./modules/favorites/index";
import { CheckoutProvider } from "./modules/checkout/index";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const { Provider: CartProvider } = createCartModule();
const { Provider: CategoriesProvider } = createCategoriesModule();

export default function App() {
  return (
    <CategoriesProvider>
      <CartProvider>
        <FavoritesProvider>
          <CheckoutProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CheckoutProvider>
        </FavoritesProvider>
      </CartProvider>
    </CategoriesProvider>
  );
}
