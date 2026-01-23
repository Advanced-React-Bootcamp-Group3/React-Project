import { ActionIcon, Badge, Popover, Stack, Group, Image, Text, Button, Box } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";

export const CartIcon = () => {
  const { cart } = useCart();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Popover
      width={350}
      position="bottom-end"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <ActionIcon
          variant="subtle"
          size="lg"
          radius="xl"
          onClick={() => setOpened(!opened)}
          style={{ position: "relative" }}
        >
          <IconShoppingCart size={20} />
          {itemCount > 0 && (
            <Badge
              size="xs"
              color="brown"
              variant="filled"
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 18,
                height: 18,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
              }}
            >
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          )}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="md">
          <Text fw={600} size="lg">
            Cart ({itemCount})
          </Text>
          {cart.items.length === 0 ? (
            <Box py="xl">
              <Text ta="center" c="dimmed" size="sm">
                Your cart is empty. Start adding products!
              </Text>
            </Box>
          ) : (
            <Stack gap="sm" style={{ maxHeight: 400, overflowY: "auto" }}>
              {cart.items.map((item) => {
                const itemPrice = item.discountPercentage
                  ? item.price * (1 - item.discountPercentage / 100)
                  : item.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <Group key={item.productId} gap="sm" wrap="nowrap">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      fit="cover"
                      radius="sm"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate({
                          to: "/products/$productId",
                          params: { productId: String(item.productId) },
                        });
                        setOpened(false);
                      }}
                    />
                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                      <Text
                        fw={500}
                        size="sm"
                        lineClamp={2}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate({
                            to: "/products/$productId",
                            params: { productId: String(item.productId) },
                          });
                          setOpened(false);
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Qty: {item.quantity} × ${itemPrice.toFixed(2)}
                      </Text>
                      <Text size="sm" fw={600} c="gold.5">
                        ${itemTotal.toFixed(2)}
                      </Text>
                    </Stack>
                  </Group>
                );
              })}
            </Stack>
          )}
          {cart.items.length > 0 && (
            <>
              <Box style={{ borderTop: "1px solid #e0d4c4", paddingTop: "12px" }}>
                <Group justify="space-between" mb="sm">
                  <Text size="sm" fw={500}>
                    Total
                  </Text>
                  <Text size="lg" fw={700} c="gold.5">
                    ${cart.total.toFixed(2)}
                  </Text>
                </Group>
                <Button
                  component={Link}
                  to="/cart"
                  fullWidth
                  color="brown"
                  onClick={() => setOpened(false)}
                >
                  View Cart
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
