import {
  Badge,
  Button,
  Card,
  Box,
  Image,
  Text,
  Loader,
} from "@mantine/core";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import toast from "react-hot-toast";

export const Product = ({ product }: { product: ProductsWithDiscountPrice }) => {
  const hasDiscount = product.hasDiscounts && product.discountPercentage;
  const { deleteProduct, isPending, isSuccess, error } = useDeleteProduct({
    onSuccess: () => {
      toast.success("Product deleted successfully");
    }
  });
  if(isSuccess) return null;

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

        <Button color="blue" fullWidth radius="md" mb={'5'}>
          Add to Cart
        </Button>
        <Button color="red" 
        fullWidth radius={'md'}
        onClick={() => deleteProduct(product.id as number)}
        >{isPending ? <Loader color="white" size={'sm'} /> : 'Delete'}
        </Button>
        {error && <Text color="red">{error.message}</Text>}
      </Box>
    </Card>
  );
};