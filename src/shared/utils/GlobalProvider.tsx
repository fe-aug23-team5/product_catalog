/* eslint-disable no-console */
import React from 'react';
import { Context } from '../types/Context';
import { ProviderProps } from '../types/ProviderProps';
import { useLocalStorage } from './useLocalStorage';
import { PhoneWithQuantity } from '../types/PhoneWithQuantity';

export const GlobalContext = React.createContext<Context>({
  cart: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
  updateCartItemQuantity: () => {},
  favourites: [],
  addFavouriteItem: () => {},
  deleteFavouriteItem: () => {},
});

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<PhoneWithQuantity[]>('cart', []);
  const [favourites, setFavourites] = useLocalStorage<PhoneWithQuantity[]>(
    'favourites',
    [],
  );

  console.log('cart', cart);
  console.log('favourites', favourites);

  const addCartItem = (phoneId: string) => {
    const updatedCart = [...cart, { phoneId, quantity: 1 }];

    setCart(updatedCart);
  };

  const deleteCartItem = (phoneId: string) => {
    const updatedCart = cart.filter(item => item.itemId !== phoneId);
    // const updatedCart = cart.filter((item) => item.phoneId !== phoneId);

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (phoneId: string, newQuantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.itemId === phoneId) {
        return { ...item, quantity: newQuantity };
      }

      return item;
    });

    setCart(updatedCart);
  };

  const addFavouriteItem = (phoneId: string) => {
    const updatedFavourites = [...favourites, { phoneId, quantity: 1 }];

    setFavourites(updatedFavourites);
  };

  const deleteFavouriteItem = (phoneId: string) => {
    const updatedFavourites
      = favourites.filter(item => item.itemId !== phoneId);

    setFavourites(updatedFavourites);
  };

  const value = {
    cart,
    addCartItem,
    deleteCartItem,
    clearCart,
    updateCartItemQuantity,
    favourites,
    addFavouriteItem,
    deleteFavouriteItem,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
