import { createContext } from "react";

export type FeatureFlagsProps = {
  isFlashSaleEnabled: boolean;
};

export const FeatureFlagContext = createContext<FeatureFlagsProps | null>(null);
