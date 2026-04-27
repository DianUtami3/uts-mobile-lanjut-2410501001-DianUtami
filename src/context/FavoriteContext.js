import React, { createContext, useContext, useReducer } from "react";

const FavoriteContext = createContext(null);

const initialState = [];

function favoriteReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const exists = state.some((item) => item.id === action.payload.id);

      if (exists) {
        return state;
      }

      return [...state, action.payload];
    }

    case "REMOVE_FAVORITE": {
      return state.filter((item) => item.id !== action.payload);
    }

    case "CLEAR_FAVORITES": {
      return [];
    }

    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const addFavorite = (show) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: show,
    });
  };

  const removeFavorite = (id) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: id,
    });
  };

  const clearFavorites = () => {
    dispatch({
      type: "CLEAR_FAVORITES",
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  const totalFavorites = favorites.length;

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        totalFavorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error("useFavorites harus digunakan di dalam FavoriteProvider");
  }

  return context;
}