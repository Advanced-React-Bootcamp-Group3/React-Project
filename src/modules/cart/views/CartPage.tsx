import {
  Container,
  Title,
  Stack,
  Paper,
  Group,
  Text,
  Divider,
  Button,
  Grid,
  Badge,
  Card,
  Image,
  Box,
  ActionIcon,
  NumberInput,
  Center,
} from "@mantine/core";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";
import { IconTrash, IconMinus, IconPlus } from "@tabler/icons-react";
import toast from "react-hot-toast";

export const CartPage = () => {
  const { cart, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
      toast.success("Item removed from cart");
    } else {
      updateQuantity({ productId, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
    toast.success("Item removed from cart");
  };

  if (cart.items.length === 0) {
    return (
      <Box
        style={{
          background: "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
          minHeight: "100vh",
          padding: "40px 0 60px",
        }}
      >
        <Container size="lg" py="xl">
          <Stack align="center" gap="xl" style={{ minHeight: "60vh", justifyContent: "center" }}>
            <Title order={2} c="white">
              Your cart is empty
            </Title>
            <Text size="lg" c="gray.2" ta="center">
              Add some products to your cart to get started!
            </Text>
            <Button component={Link} to="/products" size="lg" mt="md" color="brown">
              Continue Shopping
            </Button>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #8b6f47 0%, #6d5638 100%)",
        padding: "40px 0 60px",
        minHeight: "100vh",
      }}
    >
      <Container size="lg">
        <Title order={1} mb="xl" c="white">
          Shopping Cart
        </Title>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              {cart.items.map((item) => {
                const itemPrice = item.discountPercentage
                  ? item.price * (1 - item.discountPercentage / 100)
                  : item.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <Paper key={item.productId} p="lg" radius="md" withBorder style={{ backgroundColor: "#faf8f6" }}>
                    <Grid gutter="md">
                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={120}
                          height={120}
                          fit="contain"
                          radius="md"
                          style={{ flexShrink: 0 }}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Stack gap="xs">
                          <Group gap="xs" wrap="wrap">
                            <Text size="lg" fw={600}>
                              {item.name}
                            </Text>
                            {item.discountPercentage && (
                              <Badge color="gold" variant="light">
                                {item.discountPercentage}% OFF
                              </Badge>
                            )}
                          </Group>
                          <Group gap="md">
                            {item.discountPercentage ? (
                              <>
                                <Text size="sm" c="dimmed" td="line-through">
                                  ${item.price.toFixed(2)}
                                </Text>
                                <Text size="md" fw={600} c="gold.5">
                                  ${itemPrice.toFixed(2)}
                                </Text>
                              </>
                            ) : (
                              <Text size="md" fw={600} c="gold.5">
                                ${item.price.toFixed(2)}
                              </Text>
                            )}
                          </Group>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <Stack gap="sm" align="flex-end">
                          <Group gap="xs">
                            <ActionIcon
                              variant="light"
                              color="brown"
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            >
                              <IconMinus size={16} />
                            </ActionIcon>
                            <Text fw={600} style={{ minWidth: "30px", textAlign: "center" }}>
                              {item.quantity}
                            </Text>
                            <ActionIcon
                              variant="light"
                              color="brown"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            >
                              <IconPlus size={16} />
                            </ActionIcon>
                          </Group>
                          <Text size="lg" fw={700} c="gold.5">
                            ${itemTotal.toFixed(2)}
                          </Text>
                          <ActionIcon
                            variant="light"
                            color="brown"
                            onClick={() => handleRemoveItem(item.productId)}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                );
              })}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="xl" radius="md" withBorder shadow="sm" style={{ position: "sticky", top: 80, backgroundColor: "#faf8f6" }}>
              <Stack gap="md">
                <Title order={3} mb="xs">
                  Order Summary
                </Title>
                <Divider />

                <Stack gap="sm">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Subtotal ({cart.items.length} items)
                    </Text>
                    <Text size="sm" fw={500} c="gold.5">
                      ${cart.subtotal.toFixed(2)}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Tax
                    </Text>
                    <Text size="sm" fw={500} c="gold.5">
                      ${cart.tax.toFixed(2)}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Shipping
                    </Text>
                    <Text size="sm" fw={500} c="gold.5">
                      ${cart.shipping.toFixed(2)}
                    </Text>
                  </Group>
                </Stack>

                <Divider />

                <Group justify="space-between" mb="md">
                  <Text size="lg" fw={700}>
                    Total
                  </Text>
                  <Text size="xl" fw={700} c="gold.5">
                    ${cart.total.toFixed(2)}
                  </Text>
                </Group>

                <Button
                  component={Link}
                  to="/checkout"
                  size="lg"
                  fullWidth
                  color="brown"
                  disabled={cart.items.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <Button variant="light" component={Link} to="/products" fullWidth>
                  Continue Shopping
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};
