import { useParams } from "@tanstack/react-router";
import { Container, Loader, Center, Text, Title } from "@mantine/core";
import { useGetProduct } from "../hooks/useGetProduct";
import { ProductDetails } from "./ProductDetails";

export const ProductDetailsPage = () => {
  const { productId } = useParams({ from: "/product/$productId" });
  const { product, isLoading, error } = useGetProduct(productId ?? "");

  if (!productId) {
    return (
      <Container py="xl">
        <Center>
          <Title order={2}>Product not found</Title>
        </Center>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container py="xl">
        <Center>
          <Text c="brown" size="lg">
            {error.message || "Failed to load product"}
          </Text>
        </Center>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container py="xl">
        <Center>
          <Title order={2}>Product not found</Title>
        </Center>
      </Container>
    );
  }

  return <ProductDetails product={product} />;
};
