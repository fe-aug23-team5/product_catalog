// import { Phone } from './Phone';

import { PhoneWithQuantity } from './PhoneWithQuantity';

export type Context = {
  cart: PhoneWithQuantity[];
  addCartItem: (phoneId: string) => void;
  deleteCartItem: (phoneId: string) => void;
  clearCart: () => void;
  updateCartItemQuantity?: (phoneId: string, newQuantity: number) => void;
  favourites: PhoneWithQuantity[];
  addFavouriteItem: (phoneId: string) => void;
  deleteFavouriteItem: (phoneId: string) => void;
};
