import React from 'react';
import { Phone } from '../types/Phone';
import { Context } from '../types/Context';
import { ProviderProps } from '../types/ProviderProps';
import { useLocalStorage } from './useLocalStorage';

export const GlobalContext = React.createContext<Context>({
  cart: [],
  addCartItem: () => { },
  deleteCartItem: () => { },
  clearCart: () => { },
  updateCartItemQuantity: () => { },
  favourites: [],
  addFavouriteItem: () => { },
  deleteFavouriteItem: () => { },
});

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Phone[]>('cart', []);
  const [favourites, setFavourites]
    = useLocalStorage<Phone[]>('favourites', []);

  const addCartItem = (value: Phone) => {
    const updatedValue: Phone = { ...value, quantity: 1 };

    const updatedCart: Phone[] = [...cart, updatedValue];

    setCart(updatedCart);
  };

  const deleteCartItem = (phoneId: string) => {
    const updatedCart = cart.filter(item => item.itemId !== phoneId);

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

  const addFavouriteItem = (value: Phone) => {
    const updatedFavourites: Phone[] = [...favourites, value];

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
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
