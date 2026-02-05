import { Paper, Text, Group, Image, Stack, Box, Badge, Divider } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../modules/products/entities/Product";

interface SearchResultsProps {
    products: Product[];
    isVisible: boolean;
    onClose: () => void;
}

export const SearchResults = ({ products, isVisible, onClose }: SearchResultsProps) => {
    if (!isVisible) return null;

    return (
        <AnimatePresence>
        {isVisible && (
            <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1000,
                marginTop: "8px",
            }}
            >
            <Paper
                shadow="xl"
                radius="md"
                p={0}
                style={{
                maxHeight: "500px",
                overflowY: "auto",
                border: "1px solid #e0d4c4",
                backgroundColor: "#ffffff",
                }}
            >
                {products.length === 0 ? (
                <Box p="xl" style={{ textAlign: "center" }}>
                    <Text size="sm" c="dimmed" fw={500}>
                    No products found
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>
                    Try searching for something else
                    </Text>
                </Box>
                ) : (
                <>
                    <Box
                    p="sm"
                    style={{
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #e9ecef",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                    }}
                    >
                    <Group justify="space-between" align="center">
                        <Text size="sm" fw={600} c="brown.7">
                        Search Results
                        </Text>
                        <Badge size="sm" color="brown" variant="light">
                        {products.length} {products.length === 1 ? "product" : "products"}
                        </Badge>
                    </Group>
                    </Box>

                    <Stack gap={0}>
                    {products.map((product, index) => (
                        <Box key={product.id}>
                        <Link
                            to={`/product/$productId`}
                            params={{ productId: String(product.id) }}
                            onClick={onClose}
                            style={{ textDecoration: "none" }}
                        >
                            <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                            <Box
                                p="md"
                                style={{
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                backgroundColor: "transparent",
                                }}
                                onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#f8f4f0";
                                }}
                                onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                }}
                            >
                                <Group gap="md" wrap="nowrap" align="flex-start">
                                <Box
                                    style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                    border: "1px solid #e9ecef",
                                    }}
                                >
                                    <Image
                                    src={product.image}
                                    alt={product.name}
                                    h={70}
                                    w={70}
                                    fit="cover"
                                    style={{
                                        transition: "transform 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                    />
                                </Box>

                                <Box style={{ flex: 1, minWidth: 0 }}>
                                    <Text
                                    fw={600}
                                    size="sm"
                                    lineClamp={1}
                                    c="dark.8"
                                    mb={4}
                                    style={{
                                        letterSpacing: "0.02em",
                                    }}
                                    >
                                    {product.name}
                                    </Text>
                                    <Text
                                    size="xs"
                                    c="dimmed"
                                    lineClamp={2}
                                    mb={8}
                                    style={{ lineHeight: 1.4 }}
                                    >
                                    {product.description}
                                    </Text>
                                </Box>
                                </Group>
                            </Box>
                            </motion.div>
                        </Link>
                        {index < products.length - 1 && <Divider color="#e9ecef" />}
                        </Box>
                    ))}
                    </Stack>
                </>
                )}
            </Paper>
            </motion.div>
        )}
        </AnimatePresence>
    );
};