export interface CartTotalProps {
  calculateTotalPrice: () => number;
  calculateTotalItems: () => number;
  handleDefaultAction: () => void;
}
