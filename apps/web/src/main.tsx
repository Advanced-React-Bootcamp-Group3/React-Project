import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { theme } from "./theme";
import { createProductsModule } from "./modules/products";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const { Provider: ProductsProvider } = createProductsModule();

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <MantineProvider theme={theme}>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
