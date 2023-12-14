/* eslint-disable no-console */
import React, { useContext } from 'react';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import styles from './OrderCard.module.scss';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { CartItem } from '../CartItem';
import emptyCartIcon from '../../img/icons/empty-cart.svg';

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
          <div className={styles.card_page_container_cart}>
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

          <div className={styles.card_page_container_total}>
            <div className={styles.cart__page_amount}>
              <div className={styles.cart__page_price}>
                <p className={styles.cart__page_total_price}>
                  {`$${calculateTotalPrice()}`}
                </p>

                <p className={styles.cart__page_items_length}>
                  {`Total for ${calculateTotalItems()} items`}
                </p>
              </div>

              <div className={styles.cart__page_break_line} />

              <PrimaryButton
                defaultAction={handleDefaultAction}
                defaultTitle="Checkout"
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.cart__page_empty_container}>
          <p className={styles.cart__page_message}>Your cart is empty</p>
          <img
            className={styles.cart__page_empty_icon}
            src={emptyCartIcon}
            alt="empty cart"
          />
        </div>
      )}
    </>
  );
};
