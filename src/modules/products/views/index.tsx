import { Title, Stack, Divider, Loader } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { DiscountProductsCarousel } from "./DiscountProductsCarousel";
import { AllProductsGrid } from "./AllProductsGrid";

export const Products = () => {
  const { isEmpty, productWithdiscount, isLoading } = useGetAllProducts();

  if (!isLoading && isEmpty) {
    return <Title>No products available Now!</Title>;
  }
  if(isLoading){
    return <Loader size={'lg'} />
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