/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useContext } from 'react';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import styles from './OrderCard.module.scss';
import closeIcon from '../../img/icons/close_icon.svg';
import minusIcon from '../../img/icons/minus.svg';
import plusIcon from '../../img/icons/plus.svg';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';

export const OrderCard: React.FC = () => {
  const { cart, deleteCartItem, updateCartItemQuantity } = useContext(GlobalContext);

  const handleDecrease = (phoneId: string) => {
    const selectedPhone = cart.find(phone => phone.phoneId === phoneId);

    if (selectedPhone && selectedPhone.quantity > 1) {
      updateCartItemQuantity(selectedPhone.phoneId, selectedPhone.quantity - 1);
    }
  };

  const handleIncrease = (phoneId: string) => {
    const selectedPhone = cart.find(phone => phone.phoneId === phoneId);

    if (selectedPhone) {
      updateCartItemQuantity(selectedPhone.phoneId, selectedPhone.quantity + 1);
    }
  };

  const calculatePrice = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const calculateTotalPrice = (): number => {
    return cart.reduce((total, phone) => total + calculatePrice(phone.price, phone.quantity), 0);
  };

  const calculateTotalItems = (): number => {
    return cart.reduce((total, phone) => total + phone.quantity, 0);
  };

  // const baseUrl = 'https://raw.githubusercontent.com/fe-aug23-team5/product_catalog-static/main/';

  const handleDefaultAction = () => {
    console.log('Default action');
  };

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className={styles.card_page_container_cart}>
            <ul>
              {cart.map(({
                id, name, image, price, phoneId, quantity,
              }) => (
                <li key={id} className={styles.phone__card}>
                  <div className={styles.phone__card_container}>
                    <button
                      className={styles.phone__card_delete_button}
                      type="button"
                      onClick={() => deleteCartItem(phoneId)}
                    >
                      <img
                        src={closeIcon}
                        alt="closeIcon"
                      />
                    </button>
                    <img
                      className={styles.phone__card_image}
                      src={`${BASE_URL_IMG}${image}`}
                      alt={name}
                    />
                    <h3 className={styles.phone__card_title}>{name}</h3>
                  </div>
                  <div className={styles.phone__card_quantity_container}>
                    <div className={styles.phone__card_button_container}>
                      <button
                        type="button"
                        className={styles.phone__card_quantity_button}
                        onClick={() => handleDecrease(phoneId)}
                      >
                        <img
                          src={minusIcon}
                          alt="closeIcon"
                        />
                      </button>
                      <p className={styles.phone__card_quantity}>
                        {quantity}
                      </p>
                      <button
                        type="button"
                        className={styles.phone__card_quantity_button}
                        onClick={() => handleIncrease(phoneId)}
                      >
                        <img
                          src={plusIcon}
                          alt="closeIcon"
                        />
                      </button>
                    </div>
                    <p className={styles.phone__card_price}>{`$${calculatePrice(price, quantity)}`}</p>
                  </div>
                </li>
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
        <p className={styles.phone__card_message}>Your cart is empty</p>
      )}
    </>
  );
};
