import React from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  return (
    <div className={styles.content_container}>
      <h1>Cart</h1>
      <OrderCard />
    </div>
  );
};
