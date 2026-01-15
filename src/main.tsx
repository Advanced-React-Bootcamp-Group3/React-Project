import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/carousel/styles.css";
import "./index.css";
import { createProductsModule } from './modules/products/index.tsx';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from 'react-hot-toast';

const theme = createTheme({});


const { Provider: ProductsProvider } = createProductsModule();
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <ProductsProvider>
        <App />
        <Toaster />
      </ProductsProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
);
