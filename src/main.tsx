import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.css";
import { createProductsModule } from './modules/products/index.tsx';
const theme = createTheme({});


const { Provider: ProductsProvider } = createProductsModule();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>,
);
