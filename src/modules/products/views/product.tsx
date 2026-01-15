import {
  Badge,
  Button,
  Card,
  Box,
  Image,
  Text,
} from "@mantine/core";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";

export const Product = ({ product }: { product: ProductsWithDiscountPrice }) => {
  const hasDiscount = product.hasDiscounts && product.discountPercentage;

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Card.Section pos="relative">
        <Image 
          src={product.image} 
          height={200} 
          alt={product.name}
          fit="cover"
        />
        {hasDiscount && (
          <Badge 
            color="red" 
            variant="filled" 
            size="lg"
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </Card.Section>

      <Text fw={600} mt="md" lineClamp={2} style={{ minHeight: 48 }}>
        {product.name}
      </Text>

      <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
        {product.description}
      </Text>

      <Box mt="auto" pt="md">
        {hasDiscount ? (
          <Box mb="md">
            <Text size="sm" c="dimmed" td="line-through">
              ${product.price.toFixed(2)}
            </Text>
            <Text size="xl" fw={700} c="red">
              ${product.discountedPrice.toFixed(2)}
            </Text>
          </Box>
        ) : (
          <Text size="xl" fw={700} mb="md">
            ${product.price.toFixed(2)}
          </Text>
        )}

        <Button color="blue" fullWidth radius="md">
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};