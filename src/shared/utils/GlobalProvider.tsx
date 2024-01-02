import React from 'react';
import { Context } from '../types/Context';
import { ProviderProps } from '../types/ProviderProps';
import { useLocalStorage } from './useLocalStorage';
import { PhoneWithQuantity } from '../types/PhoneWithQuantity';
import { removeScrollForBody } from '../helpers/removeScrollForBody';

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

  const addCartItem = (itemId: string) => {
    const updatedCart = [...cart, { itemId, quantity: 1 }];

    setCart(updatedCart);
  };

  const deleteCartItem = (itemId: string) => {
    const updatedCart = cart.filter(item => item.itemId !== itemId);

    setCart(updatedCart);
  };

  const clearCart = () => {
    removeScrollForBody(false);
    setCart([]);
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.itemId === itemId) {
        return { ...item, quantity: newQuantity };
      }

      return item;
    });

    setCart(updatedCart);
  };

  const addFavouriteItem = (itemId: string) => {
    const updatedFavourites = [...favourites, { itemId }];

    setFavourites(updatedFavourites);
  };

  const deleteFavouriteItem = (itemId: string) => {
    const updatedFavourites
      = favourites.filter(item => item.itemId !== itemId);

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
