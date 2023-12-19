export interface CartItemProps {
  name: string;
  images: string[];
  priceDiscount: number;
  id: string;
  quantity: number;
  handleDecrease: (phoneId: string) => void;
  handleIncrease: (phoneId: string) => void;
  deleteCartItem: (phoneId: string) => void;
  calculatePrice: (price: number, quantity: number) => number;
}
