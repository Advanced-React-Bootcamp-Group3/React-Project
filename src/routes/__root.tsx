import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { MantineProvider, createTheme } from '@mantine/core'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '../index.css'
import { createProductsModule } from '../modules/products/index'
import { createCategoriesModule } from '../modules/categories/index'
import { createCartModule } from '../modules/cart/index'
import { CheckoutProvider } from '../modules/checkout/index'

const theme = createTheme({})

const { Provider: ProductsProvider } = createProductsModule()
const { Provider: CategoriesProvider } = createCategoriesModule()
const { Provider: CartProvider } = createCartModule()

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
})

export const Route = createRootRoute({
  component: () => (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ProductsProvider>
          <CategoriesProvider>
            <CartProvider>
              <CheckoutProvider>
                <Outlet />
                <Toaster />
              </CheckoutProvider>
            </CartProvider>
          </CategoriesProvider>
        </ProductsProvider>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </MantineProvider>
  ),
})
