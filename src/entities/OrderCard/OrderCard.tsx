/* eslint-disable max-len */
import React, { useContext } from 'react';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import styles from './OrderCard.module.scss';
import closeIcon from '../../img/icons/close_icon.svg';
import minusIcon from '../../img/icons/minus.svg';
import plusIcon from '../../img/icons/plus.svg';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';

export const OrderCard: React.FC = () => {
  const { cart } = useContext(GlobalContext);

  const baseUrl = 'https://raw.githubusercontent.com/fe-aug23-team5/product_catalog-static/main/';

  // console.log(cart);

  return (
    <div className={styles.cart__page_container}>
      <ul>
        {cart.map(({
          id, name, image, price,
        }) => (
          <li key={id} className={styles.phone__card}>
            <div className={styles.phone__card_container}>
              <button className={styles.phone__card_delete_button} type="button">
                <img
                  src={closeIcon}
                  alt="closeIcon"
                />
              </button>
              <img
                className={styles.phone__card_image}
                src={`${baseUrl}${image}`}
                alt={name}
              />
              <h3 className={styles.phone__card_title}>{name}</h3>
            </div>
            <div className={styles.phone__card_quantity_container}>
              <div className={styles.phone__card_button_container}>
                <button
                  type="button"
                  className={styles.phone__card_quantity_button}
                >
                  <img
                    src={minusIcon}
                    alt="closeIcon"
                  />
                </button>
                <p className={styles.phone__card_quantity}>
                  1
                </p>
                <button
                  type="button"
                  className={styles.phone__card_quantity_button}
                >
                  <img
                    src={plusIcon}
                    alt="closeIcon"
                  />
                </button>
              </div>
              <p className={styles.phone__card_price}>{`$${price}`}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.cart__page_amount}>
        {/* <div className={styles.cart__page_total_amount}> */}
        <div className={styles.cart__page_price}>
          <p className={styles.cart__page_total_price}>
            $2657
          </p>

          <p className={styles.cart__page_items_length}>
            Total for 3 items
          </p>
        </div>

        <div className="cart-page__break-line" />

        <PrimaryButton />
      </div>
      {/* </div> */}
    </div>
  );
};
