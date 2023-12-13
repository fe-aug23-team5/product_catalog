import { Phone } from './Phone';

export type Context = {
  cart: Phone[];
  addCartItem: (value: Phone) => void;
  deleteCartItem: (phoneId: string) => void;
  favourites: Phone[];
  addFavouriteItem: (value: Phone) => void;
  deleteFavouriteItem: (phoneId: string) => void;
};
