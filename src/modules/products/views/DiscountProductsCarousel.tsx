import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Badge, Group, Box, Title, Button } from "@mantine/core";
import type { ProductsWithDiscountPrice } from "../hooks/useGetAllProducts";

type DiscountProductsCarouselProps = {
  products: ProductsWithDiscountPrice[];
};

export const DiscountProductsCarousel = ({
  products,
}: DiscountProductsCarouselProps) => {
  if (products.length === 0) return null;

  return (
    <Box mb="xl">
      <Title order={2} mb="md">
        Products with Discount
      </Title>

      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "25%" }}
        slideGap="md"
        withControls
        controlSize={36}
        styles={{
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
          },
        }}
      >
        {products.map((product) => {
          return (
            <Carousel.Slide key={product.id}>
              <Card shadow="sm" radius="md" withBorder h="100%" style={{ display: "flex", flexDirection: "column" }}>
                <Card.Section pos="relative">
                  <Image
                    src={product.image}
                    height={200}
                    alt={product.name}
                    fit="cover"
                  />
                  {product.hasDiscounts && product.discountPercentage && (
                    <Badge
                      color="red"
                      variant="filled"
                      pos="absolute"
                      top={10}
                      right={10}
                      size="lg"
                    >
                      {product.discountPercentage}% OFF
                    </Badge>
                  )}
                </Card.Section>

                <Box p="md" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <Text fw={600} lineClamp={2} mb="xs" style={{ minHeight: 48 }}>
                    {product.name}
                  </Text>

                  <Box mt="auto">
                    <Group gap="xs" align="center" mb="md">
                      {product.hasDiscounts && product.discountPercentage ? (
                        <>
                          <Text size="sm" c="dimmed" td="line-through">
                            ${product.price.toFixed(2)}
                          </Text>
                          <Text size="lg" fw={700} c="red">
                            ${product.discountedPrice.toFixed(2)}
                          </Text>
                        </>
                      ) : (
                        <Text size="lg" fw={600}>
                          ${product.price.toFixed(2)}
                        </Text>
                      )}
                    </Group>

                    <Button color="blue" fullWidth radius="md">
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Box>
  );
};
