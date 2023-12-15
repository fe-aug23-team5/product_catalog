import React from 'react';
import { CartItemProps } from '../../shared/types/CartItemProps';
import closeIcon from '../../img/icons/close_icon.svg';
import minusIcon from '../../img/icons/minus.svg';
import plusIcon from '../../img/icons/plus.svg';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import styles from './CartItem.module.scss';

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  image,
  price,
  phoneId,
  quantity,
  handleDecrease,
  handleIncrease,
  deleteCartItem,
  calculatePrice,
}) => {
  return (
    <li key={id} className={styles.phone__card}>
      <div className={styles.phone__card_container}>
        <button
          className={styles.phone__card_delete_button}
          type="button"
          onClick={() => deleteCartItem(phoneId)}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
        <img
          className={styles.phone__card_image}
          src={`${BASE_URL_IMG}${image}`}
          alt={name}
        />
        <h3 className={styles.phone__card_title}>{name}</h3>
      </div>
      <div className={styles.phone__card_manuals_container}>
        <div className={styles.phone__card_button_container}>
          <button
            type="button"
            className={styles.phone__card_quantity_button}
            onClick={() => handleDecrease(phoneId)}
          >
            <img src={minusIcon} alt="minus icon" />
          </button>
          <div className={styles.phone__card_quantity_container}>
            <p className={styles.phone__card_quantity}>{quantity}</p>
          </div>
          <button
            type="button"
            className={styles.phone__card_quantity_button}
            onClick={() => handleIncrease(phoneId)}
          >
            <img src={plusIcon} alt="plus icon" />
          </button>
        </div>
        <div className={styles.phone__card_price_container}>
          <p className={styles.phone__card_price}>
            {`$${calculatePrice(price, quantity)}`}
          </p>
        </div>
      </div>
    </li>
  );
};
