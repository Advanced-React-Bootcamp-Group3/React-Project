import { createFileRoute } from '@tanstack/react-router'
import { Stack, Divider } from '@mantine/core'
import { Products } from '../modules/products/views'
import { Categories } from '../modules/categories/views'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Stack gap="xl" p="md">
      <Categories />
      <Divider my="xl" size="md" />
      <Products />
    </Stack>
  )
}
