import { AppShell, Group, Title, Container, Button, Popover, Box, TextInput, ActionIcon } from "@mantine/core";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { CartIcon } from "../../modules/cart/views";
import { FavoritesIcon } from "../../modules/favorites/views/FavoritesIcon";
import { useGetAllCategories } from "../../modules/categories/hooks/useGetAllCategories";
import { IconChevronDown, IconSearch, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, isLoading } = useGetAllCategories();
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (categorySlug: string) => {
    navigate({
      to: "/products",
      search: { category: categorySlug },
    });
    setOpened(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/products",
      });
    }
  };

  return (
    <AppShell.Header 
      style={{ 
        borderBottom: "1px solid #e0d4c4",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Container size="lg" h="100%">
        <Group justify="space-between" align="center" h="100%" gap="xl">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Title order={2} fw={600} c="brown.7" style={{ letterSpacing: "0.05em", fontFamily: '"Playfair Display", serif' }}>
              ShopHub
            </Title>
          </Link>

          <Group gap="md" visibleFrom="md" style={{ flex: 1, maxWidth: 600 }}>
            <Button
              component={Link}
              to="/"
              variant={location.pathname === "/" ? "filled" : "subtle"}
              radius="sm"
              color="brown"
              style={{ 
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/products"
              variant={location.pathname === "/products" ? "filled" : "subtle"}
              radius="sm"
              color="brown"
              style={{ 
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
            >
              Products
            </Button>
            
            <Popover
              width={600}
              position="bottom"
              withArrow
              shadow="md"
              opened={opened}
              onChange={setOpened}
            >
              <Popover.Target>
                <Button
                  variant="subtle"
                  radius="md"
                  rightSection={<IconChevronDown size={16} />}
                  onMouseEnter={() => setOpened(true)}
                  onMouseLeave={() => setOpened(false)}
                >
                  Categories
                </Button>
              </Popover.Target>
              <Popover.Dropdown
                onMouseEnter={() => setOpened(true)}
                onMouseLeave={() => setOpened(false)}
              >
                {isLoading ? (
                  <Box p="sm">Loading...</Box>
                ) : (
                  <Group gap="md" wrap="wrap">
                    {categories.map((category) => (
                      <Button
                        key={category.slug}
                        variant="subtle"
                        size="sm"
                        onClick={() => handleCategoryClick(category.slug)}
                        style={{ whiteSpace: "wrap" }}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </Group>
                )}
              </Popover.Dropdown>
            </Popover>

            <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 300 }}>
              <TextInput
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={18} />}
                rightSection={
                  <ActionIcon type="submit" variant="subtle">
                    <IconSearch size={18} />
                  </ActionIcon>
                }
                style={{ width: "100%" }}
              />
            </form>
          </Group>

          <Group gap="sm">
            <ActionIcon variant="subtle" size="lg" radius="xl">
              <IconUser size={20} />
            </ActionIcon>
            <FavoritesIcon />
            <CartIcon />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};
