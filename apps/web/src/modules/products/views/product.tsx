import { Button, Text } from "@advanced-react/ui";
import {Badge,Card,Box,Image} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import toast from "react-hot-toast";

export const Product = ({ product }: { product: ProductsWithDiscountPrice }) => {
  const hasDiscount = product.hasDiscounts && product.discountPercentage;
  const { deleteProduct, isPending, error } = useDeleteProduct({
    onSuccess: () => {
      toast.success("Product deleted successfully");
    }
  });

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Card.Section pos="relative">
        <Link
          to="/product/$productId"
          params={{ productId: String(product.id) }}
          style={{ textDecoration: "none", display: "block" }}
        >
          <Image 
            src={product.image} 
            height={200} 
            alt={product.name}
            fit="cover"
            style={{ cursor: "pointer" }}
          />
        </Link>
        {hasDiscount && (
          <Badge 
            color="gold" 
            variant="filled" 
            size="lg"
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </Card.Section>

      <Link
        to="/product/$productId"
        params={{ productId: String(product.id) }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Text tag="h2" scale="regular" style={{ minHeight: 48, cursor: "pointer", marginTop: 16 }}>
          {product.name}
        </Text>
      </Link>

      <Text tag="p" scale="semibold" style={{ marginTop: 8 }}>
        {product.description}
      </Text>

      <Box mt="auto" pt="md">
        {hasDiscount ? (
          <Box mb="md">
            <Text tag="span" scale="large-semibold" style={{ textDecoration: "line-through", color: "#999", display: "block" }}>
              ${product.price.toFixed(2)}
            </Text>
            <Text tag="span" scale="large-semibold" style={{ color: "#D4AF37", display: "block" }}>
              ${product.discountedPrice.toFixed(2)}
            </Text>
          </Box>
        ) : (
          <Text tag="span" scale="large-semibold" style={{ display: "block", marginBottom: 16 }}>
            ${product.price.toFixed(2)}
          </Text>
        )}

        <Button
          label="Add to Cart"
          variant="primary"
          size="regular"
          width="stretched"
          onClick={() => {}}
          className="mb-2"
        />
        <Button
          label="Delete"
          variant="danger"
          size="regular"
          width="stretched"
          onClick={(e) => {
            e?.preventDefault();
            e?.stopPropagation();
            deleteProduct(product.id);
          }}
          loading={isPending}
          disabled={isPending}
        />
        {error && <Text tag="span" scale="large-semibold" style={{ color: "#8B4513", marginTop: 8 }}>{error.message}</Text>}
      </Box>
    </Card>
  );
};