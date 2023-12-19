import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { CartItemProps } from '../../shared/types/CartItemProps';
import closeIcon from '../../shared/static/icons/close-icon.svg';
import minusIcon from '../../shared/static/icons/minus.svg';
import plusIcon from '../../shared/static/icons/plus.svg';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';

export const CartItem: React.FC<CartItemProps> = ({
  name,
  image,
  itemId,
  price,
  quantity,
  handleDecrease,
  handleIncrease,
  calculatePrice,
  deleteCartItem,
}) => {
  return (
    <li className={styles.cart_item}>
      <div className={styles.cart_item_container}>
        <button
          className={styles.cart_item_delete_button}
          type="button"
          onClick={() => deleteCartItem(itemId)}
        >
          <img src={closeIcon} alt="close icon" />
        </button>

        <Link to={`/phones/${itemId}`}>
          <img
            className={styles.cart_item_image}
            src={`${BASE_URL_IMG}${image}`}
            alt={name}
          />
        </Link>

        <h3 className={styles.cart_item_title}>{name}</h3>
      </div>

      <div className={styles.cart_item_manuals_container}>
        <div className={styles.cart_item_button_container}>
          <button
            type="button"
            className={styles.cart_item_quantity_button}
            onClick={() => handleDecrease(itemId)}
          >
            <img src={minusIcon} alt="minus icon" />
          </button>

          <div className={styles.cart_item_quantity_container}>
            <p className={styles.cart_item_quantity}>{quantity}</p>
          </div>

          <button
            type="button"
            className={styles.cart_item_quantity_button}
            onClick={() => handleIncrease(itemId)}
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
