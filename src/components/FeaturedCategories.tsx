import { Container, Title, Box, Text, Stack } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "@tanstack/react-router";
import { useGetAllCategories } from "../modules/categories/hooks/useGetAllCategories";
import { useGetAllProducts } from "../modules/products/hooks/useGetAllProducts";
import { motion } from "framer-motion";
import { Loader, Center, Card, Badge, Group } from "@mantine/core";
import {
  IconTag,
  IconBrush,
  IconSofa,
  IconShoppingCart,
  IconShirt,
  IconShoe,
  IconClock,
  IconDeviceMobile,
  IconMotorbike,
  IconSparkles,
  IconCar,
  IconDiamond,
  IconArrowRight,
} from "@tabler/icons-react";
import { useMemo } from "react";

export const FeaturedCategories = () => {
  const { categories, isLoading: categoriesLoading } = useGetAllCategories();
  const { all: products } = useGetAllProducts();
  const navigate = useNavigate();

  const getCategoryIcon = (slug: string) => {
    const iconProps = { size: 48, stroke: 2 };
    switch (slug) {
      case "beauty":
        return <IconBrush {...iconProps} />;
      case "fragrances":
        return <IconSparkles {...iconProps} />;
      case "furniture":
        return <IconSofa {...iconProps} />;
      case "groceries":
      case "home-decoration":
        return <IconShoppingCart {...iconProps} />;
      case "kitchen-accessories":
        return <IconShoppingCart {...iconProps} />;
      case "laptops":
        return <IconDeviceMobile {...iconProps} />;
      case "mens-shirts":
      case "tops":
        return <IconShirt {...iconProps} />;
      case "mens-shoes":
      case "womens-shoes":
        return <IconShoe {...iconProps} />;
      case "mens-watches":
      case "womens-watches":
        return <IconClock {...iconProps} />;
      case "mobile-accessories":
      case "smartphones":
        return <IconDeviceMobile {...iconProps} />;
      case "motorcycle":
        return <IconMotorbike {...iconProps} />;
      case "skin-care":
        return <IconSparkles {...iconProps} />;
      case "tablets":
        return <IconDeviceMobile {...iconProps} />;
      case "vehicle":
        return <IconCar {...iconProps} />;
      case "womens-bags":
        return <IconShoppingCart {...iconProps} />;
      case "womens-dresses":
        return <IconDiamond {...iconProps} />;
      default:
        return <IconTag {...iconProps} />;
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
      "linear-gradient(135deg, #a68b6f 0%, #8b6f47 100%)",
      "linear-gradient(135deg, #6d5638 0%, #4d3d28 100%)",
      "linear-gradient(135deg, #c9b8a3 0%, #a68b6f 100%)",
      "linear-gradient(135deg, #ffc107 0%, #ffb300 100%)",
      "linear-gradient(135deg, #ffb300 0%, #ffa000 100%)",
      "linear-gradient(135deg, #8b6f47 0%, #a68b6f 100%)",
      "linear-gradient(135deg, #4d3d28 0%, #6d5638 100%)",
    ];
    return colors[index % colors.length];
  };

  const categoriesWithProducts = useMemo(() => {
    return categories.map((category) => {
      const categoryProducts = products.filter((p) => p.category.toLowerCase() === category.name.toLowerCase());
      return {
        ...category,
        productCount: categoryProducts.length,
        sampleImage: categoryProducts[0]?.image,
      };
    });
  }, [categories, products]);

  const handleCategoryClick = (categorySlug: string) => {
    navigate({
      to: "/products",
      search: { category: categorySlug },
    });
  };

  if (categoriesLoading) {
    return (
      <Center h={300}>
        <Loader size="lg" />
      </Center>
    );
  }

  const featuredCategories = categoriesWithProducts.slice(0, 8);

  return (
    <Box style={{ backgroundColor: "#faf8f6", padding: "60px 0" }}>
      <Container size="lg">
        <Stack gap="xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title order={2} ta="center" mb="md" fw={800} size="2.5rem" c="dark">
              Shop by Category
            </Title>
            <Text ta="center" size="lg" c="dimmed" mb="xl">
              Explore our wide range of products
            </Text>
          </motion.div>

          <Carousel
            slideSize={{ base: "100%", sm: "50%", md: "33.333%", lg: "25%" }}
            slideGap="lg"
            withControls
            controlSize={40}
            styles={{
              control: {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "none",
                color: "#000",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
                "&[data-inactive]": {
                  opacity: 0,
                  cursor: "default",
                },
              },
            }}
          >
            {featuredCategories.map((category, index) => (
              <Carousel.Slide key={category.slug}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{ height: "100%", padding: "8px" }}
                >
                  <Card
                    shadow="md"
                    padding={0}
                    radius="md"
                    withBorder
                    style={{
                      cursor: "pointer",
                      height: "100%",
                      overflow: "hidden",
                      position: "relative",
                      border: "1px solid #e9ecef",
                      backgroundColor: "#ffffff",
                    }}
                    onClick={() => handleCategoryClick(category.slug)}
                    component={motion.div}
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      style={{
                        position: "relative",
                        height: "200px",
                        background: getCategoryColor(index),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {category.sampleImage && (
                        <motion.div
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 0.15, scale: 1 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${category.sampleImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(3px) brightness(0.5)",
                          }}
                        />
                      )}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          color: "white",
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                        }}
                      >
                        {getCategoryIcon(category.slug)}
                      </motion.div>
                    </Box>

                    <Stack gap="sm" p="lg" style={{ backgroundColor: "#ffffff" }}>
                      <Group justify="space-between" align="center">
                        <Text fw={700} size="lg" c="dark">
                          {category.name}
                        </Text>
                        <Badge color="brown" variant="light" size="md" radius="sm">
                          {category.productCount} items
                        </Badge>
                      </Group>

                      <Group gap="xs" align="center" style={{ cursor: "pointer" }}>
                        <Text size="sm" c="brown.7" fw={500}>
                          Shop now
                        </Text>
                        <IconArrowRight size={16} color="var(--mantine-color-brown-7)" />
                      </Group>
                    </Stack>
                  </Card>
                </motion.div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>
      </Container>
    </Box>
  );
};
