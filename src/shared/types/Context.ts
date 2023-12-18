import { PhoneWithQuantity } from './PhoneWithQuantity';

export type Context = {
  cart: PhoneWithQuantity[];
  addCartItem: (itemId: string) => void;
  deleteCartItem: (itemId: string) => void;
  clearCart: () => void;
  updateCartItemQuantity?: (itemId: string, newQuantity: number) => void;
  favourites: PhoneWithQuantity[];
  addFavouriteItem: (itemId: string) => void;
  deleteFavouriteItem: (itemId: string) => void;
};
