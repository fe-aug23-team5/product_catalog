import React from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';
import { BackButton } from '../../shared/ui/BackButton';

export const CartPage: React.FC = () => {
  return (
    <div className={styles.cart_page__container}>
      <div className={styles.cart_page__topbar}>
        <div className={styles.cart_page__back}>
          <BackButton />
        </div>

        <h1 className={styles.cart_page__title}>
          Cart
        </h1>
      </div>

      <OrderCard />
    </div>
  );
};
