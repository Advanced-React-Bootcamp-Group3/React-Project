import {
  Container,
  Grid,
  Image,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Divider,
  Paper,
  Rating,
  Box,
} from '@mantine/core'
import { Link } from '@tanstack/react-router'
import type { Product } from '../entities/Product'

type ProductDetailsProps = {
  product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const hasDiscount = product.hasDiscounts && product.discountPercentage
  const discountedPrice = hasDiscount && product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price

  return (
    <Container size="lg" py="xl">
      <Grid>
        {/* Product Image */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src={product.image}
            alt={product.name}
            radius="md"
            fit="cover"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid.Col>

        {/* Product Info */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            {/* Category Badge */}
            <Badge color="blue" size="lg" variant="light">
              {product.category}
            </Badge>

            {/* Product Name */}
            <Title order={1}>{product.name}</Title>

            {/* Rating */}
            <Group gap="xs">
              <Rating value={product.rating} readOnly size="sm" />
              <Text size="sm" c="dimmed">
                ({product.rating} / 5)
              </Text>
            </Group>

            {/* Price */}
            <Box>
              {hasDiscount ? (
                <Group gap="md" align="center">
                  <Text size="xl" c="dimmed" td="line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text size="2rem" fw={700} c="red">
                    ${discountedPrice.toFixed(2)}
                  </Text>
                  <Badge color="red" size="lg">
                    {product.discountPercentage}% OFF
                  </Badge>
                </Group>
              ) : (
                <Text size="2rem" fw={700}>
                  ${product.price.toFixed(2)}
                </Text>
              )}
            </Box>

            {/* Availability */}
            <Group>
              {product.isAvailable ? (
                <Badge color="green" size="lg">
                  In Stock
                </Badge>
              ) : (
                <Badge color="red" size="lg">
                  Out of Stock
                </Badge>
              )}
            </Group>

            <Divider />

            {/* Description */}
            <Box>
              <Title order={3} mb="sm">
                Description
              </Title>
              <Text size="md">{product.description}</Text>
            </Box>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box>
                <Title order={3} mb="sm">
                  Tags
                </Title>
                <Group gap="xs">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="light">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Box>
            )}

            {/* Action Buttons */}
            <Group mt="md">
              <Button color="blue" size="lg" disabled={!product.isAvailable}>
                Add to Cart
              </Button>
              <Button component={Link} to="/" variant="outline" size="lg">
                Back to Products
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <Box mt="xl">
          <Divider mb="xl" />
          <Title order={2} mb="md">
            Reviews ({product.reviews.length})
          </Title>
          <Stack gap="md">
            {product.reviews.map((review, index) => (
              <Paper key={index} p="md" withBorder radius="md">
                <Group justify="space-between" mb="xs">
                  <Group gap="xs">
                    <Text fw={600}>{review.reviewer.name}</Text>
                    <Rating value={review.rating} readOnly size="sm" />
                  </Group>
                  <Text size="sm" c="dimmed">
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {review.reviewer.email}
                </Text>
                <Text mt="xs">{review.comment}</Text>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}
    </Container>
  )
}
