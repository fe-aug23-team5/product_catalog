import React from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  return (
    <div className={styles.content_container}>
      <h1 className={styles.cart_page_title}>
        Cart
      </h1>
      <OrderCard />
    </div>
  );
};
