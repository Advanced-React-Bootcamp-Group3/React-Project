import "@mantine/core/styles.css";
import { Products } from "./modules/products/views";
import { Categories } from "./modules/categories/views";
import { Stack, Divider } from "@mantine/core";

function App() {
  return (
    <Stack gap="xl" p="md">
      <Categories />
      <Divider my="xl" size="md" />
      <Products />
    </Stack>
  );
}

export default App;
