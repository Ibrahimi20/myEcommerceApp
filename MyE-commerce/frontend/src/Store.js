import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialvalue = {
  userinfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    shippingAdress: localStorage.getItem('shippingAdress')
      ? JSON.parse(localStorage.getItem('shippingAdress'))
      : {},
    carteItem: localStorage.getItem('cartitems')
      ? JSON.parse(localStorage.getItem('cartitems'))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const payload = action.payload;
      const existeItem = state.cart.carteItem.find(
        (x) => x._id === payload._id
      );

      const items = existeItem
        ? state.cart.carteItem.map((item) =>
            item._id === existeItem._id ? payload : item
          )
        : [...state.cart.carteItem, payload];

      localStorage.setItem('cartitems', JSON.stringify(items));

      return {
        ...state,
        cart: {
          ...state.cart,
          carteItem: items,
        },
      };
    case 'CART_REMOVE_ITEM':
      const Items = state.cart.carteItem.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartitems', JSON.stringify(Items));

      return {
        ...state,
        cart: {
          ...state.cart,
          carteItem: Items,
        },
      };

    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, carteItem: [] } };

    case 'USER_SIGNIN':
      return { ...state, userinfo: action.payload };

    case 'SIGN_OUT':
      return {
        ...state,
        userinfo: null,
        cart: { carteItem: [], shippingAdress: {}, paymentMethod: '' },
      };

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAdress: action.payload,
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
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
