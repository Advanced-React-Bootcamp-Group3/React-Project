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
    <Box
      style={{
        background: "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
        padding: "40px 0 60px",
        minHeight: "100vh",
      }}
    >
      <Container size="lg">
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
            <Badge color="gold" size="lg" variant="light">
              {product.category}
            </Badge>

            {/* Product Name */}
            <Title order={1} c="white">{product.name}</Title>

            {/* Rating */}
            <Group gap="xs">
              <Rating value={product.rating} readOnly size="sm" />
              <Text size="sm" c="gray.2">
                ({product.rating} / 5)
              </Text>
            </Group>

            {/* Price */}
            <Box>
              {hasDiscount ? (
                <Group gap="md" align="center">
                  <Text size="xl" c="gray.3" td="line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text size="2rem" fw={700} c="gold.5">
                    ${discountedPrice.toFixed(2)}
                  </Text>
                  <Badge color="gold" size="lg">
                    {product.discountPercentage}% OFF
                  </Badge>
                </Group>
              ) : (
                <Text size="2rem" fw={700} c="gold.5">
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
              <Title order={3} mb="sm" c="white">
                Description
              </Title>
              <Text size="md" c="gray.2">{product.description}</Text>
            </Box>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box>
                <Title order={3} mb="sm" c="white">
                  Tags
                </Title>
                <Group gap="xs">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="light" color="gold">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </Box>
            )}

            {/* Action Buttons */}
            <Group mt="md">
              <Button color="brown" size="lg" disabled={!product.isAvailable}>
                Add to Cart
              </Button>
              <Button component={Link} to="/" variant="light" size="lg" color="white">
                Back to Products
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
      </Container>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <Box mt="xl">
          <Divider mb="xl" />
          <Title order={2} mb="md" c="white">
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
    </Box>
  )
}
