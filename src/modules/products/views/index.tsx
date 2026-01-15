import { Title, Stack, Divider } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { DiscountProductsCarousel } from "./DiscountProductsCarousel";
import { AllProductsGrid } from "./AllProductsGrid";

export const Products = () => {
  const { isEmpty, productWithdiscount, isLoading } = useGetAllProducts();

  if (!isLoading && isEmpty) {
    return <Title>No products available</Title>;
  }
  if(isLoading){
    return<Title> Loading....</Title>
  }
  return (
    <Stack gap="xl">
      {/* Discount Products Carousel Section */}
      {productWithdiscount.length > 0 && (
        <DiscountProductsCarousel products={productWithdiscount} />
      )}

      <Divider my="md" />

      {/* All Products with Infinite Scroll */}
      <div>
        <Title order={2} mb="md">
          All Products
        </Title>
        <AllProductsGrid />
      </div>
    </Stack>
  );
};