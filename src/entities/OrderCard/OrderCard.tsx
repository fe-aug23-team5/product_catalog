/* eslint-disable no-console */
import React, { useContext } from 'react';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { CartItem } from '../CartItem';
import { CartTotal } from '../CartTotal';
import emptyCartIcon from '../../img/icons/empty-cart.svg';
import styles from './OrderCard.module.scss';

export const OrderCard: React.FC = () => {
  const { cart, deleteCartItem, updateCartItemQuantity }
  = useContext(GlobalContext);

  const handleDecrease = (phoneId: string) => {
    const selectedPhone = cart.find((phone) => phone.phoneId === phoneId);

    if (selectedPhone && selectedPhone.quantity > 1) {
      updateCartItemQuantity(selectedPhone.phoneId, selectedPhone.quantity - 1);
    }
  };

  const handleIncrease = (phoneId: string) => {
    const selectedPhone = cart.find((phone) => phone.phoneId === phoneId);

    if (selectedPhone) {
      updateCartItemQuantity(selectedPhone.phoneId, selectedPhone.quantity + 1);
    }
  };

  const calculatePrice = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const calculateTotalPrice = (): number => {
    return cart.reduce(
      (total, phone) => total + calculatePrice(phone.price, phone.quantity),
      0,
    );
  };

  const calculateTotalItems = (): number => {
    return cart.reduce((total, phone) => total + phone.quantity, 0);
  };

  const handleDefaultAction = () => {
    console.log('Default action');
  };

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className={styles.order__card_cart_item_container}>
            <ul>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  handleDecrease={handleDecrease}
                  handleIncrease={handleIncrease}
                  deleteCartItem={deleteCartItem}
                  calculatePrice={calculatePrice}
                />
              ))}
            </ul>
          </div>

          <div className={styles.order__card_cart_total_container}>
            <CartTotal
              calculateTotalPrice={calculateTotalPrice}
              calculateTotalItems={calculateTotalItems}
              handleDefaultAction={handleDefaultAction}
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
        </div>
      )}
    </>
  );
};
