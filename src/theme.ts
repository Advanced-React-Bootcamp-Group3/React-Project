import { createTheme, type MantineColorsTuple } from "@mantine/core";

const brown: MantineColorsTuple = [
  "var(--color-brown-0)",
  "var(--color-brown-1)",
  "var(--color-brown-2)",
  "var(--color-brown-3)",
  "var(--color-brown-4)",
  "var(--color-brown-5)",
  "var(--color-brown-6)",
  "var(--color-brown-7)",
  "var(--color-brown-8)",
  "var(--color-brown-9)",
];

const gold: MantineColorsTuple = [
  "var(--color-gold-0)",
  "var(--color-gold-1)",
  "var(--color-gold-2)",
  "var(--color-gold-3)",
  "var(--color-gold-4)",
  "var(--color-gold-5)",
  "var(--color-gold-6)",
  "var(--color-gold-7)",
  "var(--color-gold-8)",
  "var(--color-gold-9)",
];

const gray: MantineColorsTuple = [
  "var(--color-gray-0)",
  "var(--color-gray-1)",
  "var(--color-gray-2)",
  "var(--color-gray-3)",
  "var(--color-gray-4)",
  "var(--color-gray-5)",
  "var(--color-gray-6)",
  "var(--color-gray-7)",
  "var(--color-gray-8)",
  "var(--color-gray-9)",
];

export const theme = createTheme({
  primaryColor: "brown",
  primaryShade: 6,
  colors: { brown, gold, gray },
  fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
  headings: {
    fontFamily: '"Playfair Display", "Cormorant Garamond", "Georgia", serif',
    fontWeight: "600",
  },
  defaultRadius: "sm",
  components: {
    Button: {
      defaultProps: { radius: "sm", color: "brown" },
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: "0.025em",
          textTransform: "uppercase",
          fontSize: "0.875rem",
        },
      },
    },
    Card: {
      defaultProps: { radius: "sm", shadow: "sm", withBorder: true },
      styles: {
        root: { borderColor: "#e0d4c4", backgroundColor: "#ffffff" },
      },
    },
    Input: {
      defaultProps: { radius: "sm" },
      styles: {
        input: {
          borderColor: "#e0d4c4",
          backgroundColor: "#fafafa",
          "&:focus": { borderColor: "#8b6f47" },
        },
      },
    },
  },
});

