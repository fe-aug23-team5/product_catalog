import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import styles from './OrderCard.module.scss';
import { CartItem } from '../CartItem';
import { CartTotal } from '../CartTotal';
import { Product } from '../../shared/types/Product';
import emptyCartIcon from '../../shared/static/icons/empty-cart.svg';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';

type Props = {
  phones: Product[];
};

export const OrderCard: React.FC<Props> = ({ phones }) => {
  const { cart, updateCartItemQuantity, deleteCartItem }
    = useContext(GlobalContext);

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const handleDecrease = (phoneId: string) => {
    const selectedPhone = cart.find((item) => item.itemId === phoneId);

    if (selectedPhone && updateCartItemQuantity) {
      const newQuantity = Math.max(1, (selectedPhone.quantity ?? 0) - 1);

      updateCartItemQuantity(selectedPhone.itemId, newQuantity);
    }
  };

  const handleIncrease = (phoneId: string) => {
    const selectedPhone = cart.find((item) => item.itemId === phoneId);

    if (selectedPhone && updateCartItemQuantity) {
      updateCartItemQuantity(
        selectedPhone.itemId,
        (selectedPhone.quantity ?? 0) + 1,
      );
    }
  };

  const calculatePrice = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const calculateTotalPrice = (): number => {
    return cart.reduce((total, phone) => {
      const phoneDetails = phones.find(
        (detail) => detail.itemId === phone.itemId,
      );

      if (phoneDetails) {
        return total + calculatePrice(phoneDetails.price, phone.quantity ?? 0);
      }

      return total;
    }, 0);
  };

  const calculateTotalItems = (): number => {
    return cart.reduce((total, phone) => total + (phone.quantity ?? 0), 0);
  };

  return (
    <>
      {phones.length > 0 ? (
        <>
          <div className={styles.order__card_cart_item_container}>
            <ul>
              {phones.map((phone) => {
                const cartItem = cart.find(
                  (item) => item.itemId === phone.itemId,
                ) || { quantity: 0 };

                return (
                  <CartItem
                    key={phone.id}
                    {...phone}
                    quantity={cartItem.quantity ?? 1}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                    calculatePrice={calculatePrice}
                    deleteCartItem={deleteCartItem}
                  />
                );
              })}
            </ul>
          </div>

          <div className={styles.order__card_cart_total_container}>
            <CartTotal
              calculateTotalPrice={calculateTotalPrice}
              calculateTotalItems={calculateTotalItems}
            />
          </div>
        </>
      ) : (
        <div className={styles.order__card_empty_container}>
          <p className={styles.order__card_message}>Your cart is empty</p>

          <img
            className={styles.order__card_empty_icon}
            src={emptyCartIcon}
            alt="empty cart"
          />

          <div className={styles.order__card_button}>
            <PrimaryButton
              defaultTitle="Go Shopping!"
              defaultAction={navigateToHome}
            />
          </div>
        </div>
      )}
    </>
  );
};
