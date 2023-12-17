import React from 'react';
import { CartItemProps } from '../../shared/types/CartItemProps';
import closeIcon from '../../shared/static/icons/close-icon.svg';
import minusIcon from '../../shared/static/icons/minus.svg';
import plusIcon from '../../shared/static/icons/plus.svg';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import styles from './CartItem.module.scss';

export const CartItem: React.FC<CartItemProps> = ({
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
    <li className={styles.cart_item}>
      <div className={styles.cart_item_container}>
        <button
          className={styles.cart_item_delete_button}
          type="button"
          onClick={() => deleteCartItem(phoneId)}
        >
          <img src={closeIcon} alt="close icon" />
        </button>
        <img
          className={styles.cart_item_image}
          src={`${BASE_URL_IMG}${image}`}
          alt={name}
        />
        <h3 className={styles.cart_item_title}>{name}</h3>
      </div>
      <div className={styles.cart_item_manuals_container}>
        <div className={styles.cart_item_button_container}>
          <button
            type="button"
            className={styles.cart_item_quantity_button}
            onClick={() => handleDecrease(phoneId)}
          >
            <img src={minusIcon} alt="minus icon" />
          </button>
          <div className={styles.cart_item_quantity_container}>
            <p className={styles.cart_item_quantity}>{quantity}</p>
          </div>
          <button
            type="button"
            className={styles.cart_item_quantity_button}
            onClick={() => handleIncrease(phoneId)}
          >
            <img src={plusIcon} alt="plus icon" />
          </button>
        </div>
        <div className={styles.cart_item_price_container}>
          <p className={styles.cart_item_price}>
            {`$${calculatePrice(price, quantity)}`}
          </p>
        </div>
      </div>
    </li>
  );
};
