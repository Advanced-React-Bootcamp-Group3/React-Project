import { Box, Button, Stack, Text, Title, Badge } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

type HeroBannerProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  backgroundImage?: string;
};

export const HeroBanner = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  badge,
  backgroundImage,
}: HeroBannerProps) => {
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
        }}
      />
      <Stack
        gap="lg"
        style={{
          position: "relative",
          height: "100%",
          padding: "80px 60px",
          justifyContent: "center",
          maxWidth: "800px",
          zIndex: 1,
        }}
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge size="lg" color="gold" variant="filled" style={{ width: "fit-content" }}>
              {badge}
            </Badge>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Title order={1} c="white" size="4rem" fw={900} style={{ lineHeight: 1.2 }}>
            {title}
          </Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Text size="xl" c="gray.2" style={{ maxWidth: "600px" }}>
            {subtitle}
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            component={Link}
            to={ctaLink}
            size="lg"
            variant="white"
            color="dark"
            rightSection={<IconArrowRight size={20} />}
            style={{ width: "fit-content", fontSize: "18px", padding: "14px 40px" }}
          >
            {ctaText}
          </Button>
        </motion.div>
      </Stack>
    </Box>
  );
};
