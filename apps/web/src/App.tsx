import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { routeTree } from "./routes/routes";
import { createCartModule } from "./modules/cart/index";
import { createCategoriesModule } from "./modules/categories/index";
import { FavoritesProvider } from "./modules/favorites/index";
import { CheckoutProvider } from "./modules/checkout/index";
import { FeatureFlagProvider } from "./modules/feature-flag";
import type { FeatureFlagsProps } from "./modules/feature-flag";

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

const defaultFeatureFlags: FeatureFlagsProps = {
  isFlashSaleEnabled: false,
};

export default function App() {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagsProps>(defaultFeatureFlags);

  useEffect(() => {
    fetch("/config.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { featureFlags?: FeatureFlagsProps }) => {
        if (data.featureFlags) {
          setFeatureFlags({ ...defaultFeatureFlags, ...data.featureFlags });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <FeatureFlagProvider value={featureFlags}>
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
    </FeatureFlagProvider>
  );
}
