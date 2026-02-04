/* eslint-disable react-refresh/only-export-components */
import { useContext, type PropsWithChildren } from "react";
import {
  FeatureFlagContext,
  type FeatureFlagsProps,
} from "./Context";

export type { FeatureFlagsProps } from "./Context";

export const FeatureFlagProvider = ({
  children,
  value,
}: PropsWithChildren<{
  value: FeatureFlagsProps;
}>) => {
  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagProvider"
    );
  }
  return context;
};
