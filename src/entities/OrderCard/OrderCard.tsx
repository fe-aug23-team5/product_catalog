import React, { useContext } from 'react';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { CartItem } from '../CartItem';
import { CartTotal } from '../CartTotal';
import emptyCartIcon from '../../shared/static/icons/empty-cart.svg';
import styles from './OrderCard.module.scss';
// import { PhoneDetails } from '../../shared/types/PhoneDetails';
import { ProductDetails } from '../../shared/types/Product';

type Props = {
  phones: ProductDetails[];
};

export const OrderCard: React.FC<Props> = ({ phones }) => {
  const { cart, updateCartItemQuantity, deleteCartItem }
    = useContext(GlobalContext);

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
      const phoneDetails = phones.find((detail) => detail.id === phone.itemId);

      if (phoneDetails) {
        return (
          total + calculatePrice(
            phoneDetails.priceDiscount, phone.quantity ?? 0,
          )
        );
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
                  (item) => item.itemId === phone.id,
                ) || { quantity: 0 };

                return (
                  <CartItem
                    key={phone.id}
                    {...phone}
                    quantity={cartItem.quantity ?? 1}
                    handleDecrease={() => handleDecrease(phone.id)}
                    handleIncrease={() => handleIncrease(phone.id)}
                    calculatePrice={calculatePrice}
                    deleteCartItem={() => deleteCartItem(phone.id)}
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
        </div>
      )}
    </>
  );
};
