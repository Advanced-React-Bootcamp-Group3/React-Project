import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.css";
import { ProductsProvider } from "./modules/products/index.tsx";

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ProductsProvider value="My Products Context Value">
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>,
);
