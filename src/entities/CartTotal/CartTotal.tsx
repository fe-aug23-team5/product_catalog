import React from 'react';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { CartTotalProps } from '../../shared/types/CartTotalProps';
import styles from './CartTotal.module.scss';

export const CartTotal: React.FC<CartTotalProps> = ({
  calculateTotalPrice,
  calculateTotalItems,
  handleDefaultAction,
}) => {
  return (
    <div className={styles.cart__total_container}>
      <div className={styles.cart__total_box}>
        <p className={styles.cart__total_price}>
          {`$${calculateTotalPrice()}`}
        </p>

        <p className={styles.cart__total_items_length}>
          {`Total for ${calculateTotalItems()} items`}
        </p>
      </div>

      <div className={styles.cart__total_break_line} />

      <PrimaryButton
        defaultAction={handleDefaultAction}
        defaultTitle="Checkout"
      />
    </div>
  );
};
