import type { FavoritesRepository } from "./FavoritesRepository";
import type { FavoriteItem, Favorites } from "../entities/Favorite";

const STORAGE_KEY = "favorites";

const getFavorites = (): Favorites => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
  }
  return { items: [] };
};

const saveFavorites = (favorites: Favorites): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

export const localStorageFavorites = (): FavoritesRepository => {
  return {
    getAll: (): Favorites => getFavorites(),

    add: (item: FavoriteItem): void => {
      const favorites = getFavorites();
      if (!favorites.items.some((i) => i.productId === item.productId)) {
        favorites.items.push(item);
        saveFavorites(favorites);
      }
    },

    remove: (productId: number): void => {
      const favorites = getFavorites();
      favorites.items = favorites.items.filter((i) => i.productId !== productId);
      saveFavorites(favorites);
    },

    isFavorite: (productId: number): boolean => {
      return getFavorites().items.some((i) => i.productId === productId);
    },
  };
};
