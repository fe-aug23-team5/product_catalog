export interface CartItemProps {
  name: string;
  image: string;
  price: number;
  phoneId: string;
  quantity: number;
  handleDecrease: (phoneId: string) => void;
  handleIncrease: (phoneId: string) => void;
  deleteCartItem: (phoneId: string) => void;
  calculatePrice: (price: number, quantity: number) => number;
}
