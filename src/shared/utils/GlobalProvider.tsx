import React from 'react';
import { Phone } from '../types/Phone';
import { useLocalStorage } from './useLocalStorage';

export type Context = {
  cart: Phone[];
  addCartItem: (value: Phone) => void;
  deleteCartItem: (phoneId: string) => void;
};

export const GlobalContext = React.createContext<Context>({
  cart: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Phone[]>('cart', []);
  // const [favourites, setFavourites] = useLocalStorage<Phone[]>('favourites', []);

  const addCartItem = (value: Phone) => {
    const updatedCart: Phone[] = [...cart, value];

    setCart(updatedCart);
  };

  const deleteCartItem = (phoneId: string) => {
    const updatedCart = cart.filter(item => item.phoneId !== phoneId);

    setCart(updatedCart);
  };

  const value = {
    cart,
    addCartItem,
    deleteCartItem,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
