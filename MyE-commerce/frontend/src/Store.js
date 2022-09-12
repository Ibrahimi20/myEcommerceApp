import React, { createContext, useContext, useReducer } from 'react';

export const Store = createContext();

const initialvalue = {
  cart: { carteItem: [] },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          carteItem: [...state.cart.carteItem, action.payload],
        },
      };

    default:
      return state;
  }
};

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialvalue);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
