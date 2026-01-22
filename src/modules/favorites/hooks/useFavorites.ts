import { useCallback } from "react";
import { useFavoritesContext } from "../index";
import type { FavoriteItem } from "../entities/Favorite";

export const useFavorites = () => {
  const { repository } = useFavoritesContext();

  const addItem = useCallback(
    (item: FavoriteItem) => {
      repository.add(item);
    },
    [repository]
  );

  const removeItem = useCallback(
    (productId: number) => {
      repository.remove(productId);
    },
    [repository]
  );

  const isFavorite = useCallback(
    (productId: number): boolean => {
      return repository.isFavorite(productId);
    },
    [repository]
  );

  const getAll = useCallback(() => {
    return repository.getAll();
  }, [repository]);

  return {
    addItem,
    removeItem,
    isFavorite,
    getAll,
    count: getAll().items.length,
  };
};
