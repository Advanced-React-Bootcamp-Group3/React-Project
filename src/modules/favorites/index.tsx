import { createContext, useContext, type ReactNode } from "react";
import { localStorageFavorites } from "./repository/localStorageFavorites";
import type { FavoritesRepository } from "./repository/FavoritesRepository";

const FavoritesContext = createContext<{ repository: FavoritesRepository } | null>(null);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavoritesContext must be used within FavoritesProvider");
  }
  return context;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const repository = localStorageFavorites();

  return (
    <FavoritesContext.Provider value={{ repository }}>
      {children}
    </FavoritesContext.Provider>
  );
};
