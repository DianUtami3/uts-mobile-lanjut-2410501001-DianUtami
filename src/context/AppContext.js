// src/context/AppContext.js

import React, { createContext, useReducer } from 'react';

// Initial state untuk state global
const initialState = { favorites: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.show] };
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: state.favorites.filter(show => show.id !== action.id) };
    default:
      return state;
  }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };