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

const theme = createTheme({})

const { Provider: ProductsProvider } = createProductsModule()
const { Provider: CategoriesProvider } = createCategoriesModule()

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
            <Outlet />
            <Toaster />
          </CategoriesProvider>
        </ProductsProvider>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </MantineProvider>
  ),
})
