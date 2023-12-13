import React from 'react';
import styles from './HomePage.scss';
import { ProductSlider } from '../../features/ProductSlider';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>HomePage</h1>
      <ProductSlider />
    </div>
  );
};
