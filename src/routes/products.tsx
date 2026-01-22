import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
import { Title, Stack, Loader, Text, Center, Grid, Pagination, Box } from '@mantine/core'
import { ProductCard } from '../modules/products/views/ProductCard'
import { useGetProductsByCategory } from '../modules/products/hooks/useGetProductsByCategory'
import { usePaginatedProducts } from '../modules/products/hooks/usePaginatedProducts'

export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    return {
      category: (search.category as string) || undefined,
    }
  },
  component: ProductsPage,
})

function ProductsPage() {
  const { category } = Route.useSearch()
  const matchRoute = useMatchRoute()
  const isProductDetailPage = matchRoute({ to: '/products/$productId' })
  
  const { products: categoryProducts, isLoading: isLoadingCategory, isEmpty: isEmptyCategory } = useGetProductsByCategory(category || null)
  const { products: allProducts, isLoading: isLoadingAll, currentPage, totalPages, goToPage } = usePaginatedProducts()

  const products = category ? categoryProducts : allProducts
  const isLoading = category ? isLoadingCategory : isLoadingAll
  const isEmpty = category ? isEmptyCategory : allProducts.length === 0

  if (isProductDetailPage) {
    return <Outlet />
  }

  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)',
        minHeight: '100vh',
        padding: '40px 0 60px',
      }}
    >
      <Stack gap="xl" px="lg">
        <Title order={1} c="white">
          {category ? `Products: ${category}` : 'All Products'}
        </Title>

        {isLoading ? (
          <Center h={300}>
            <Loader size="lg" />
          </Center>
        ) : isEmpty ? (
          <Center h={300}>
            <Text size="lg" c="gray.2">
              No products found{category ? ' in this category' : ''}.
            </Text>
          </Center>
        ) : (
          <>
            <Grid gutter="xl">
              {products.map((product, index) => (
                <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <ProductCard product={product} showNewBadge={false} index={index} />
                </Grid.Col>
              ))}
            </Grid>

            {!category && totalPages > 1 && (
              <Center mt="xl">
                <Pagination
                  total={totalPages}
                  value={currentPage + 1}
                  onChange={(page) => goToPage(page - 1)}
                  size="lg"
                  radius="md"
                  withEdges
                />
              </Center>
            )}
          </>
        )}
      </Stack>
    </Box>
  )
}
