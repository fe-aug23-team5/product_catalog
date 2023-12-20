/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import styles from './TestSlider.module.scss';
import { Product } from '../../shared/types/Product';
import { getNewestProducts } from '../../shared/api/getProductHelper';
import { ProductCard } from '../../entities/ProductCard';
// import { ProductCard } from '../../entities/ProductCard';

// type Props = {
//   children: React.ReactNode,
// };

export const TestSlider: React.FC = () => {
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getNewestProducts().then((data) => setDiscountProducts(data.slice(0, 7)));
  }, []);

  const updateIndex = (i: number) => {
    let indexToUpdate = i;

    if (indexToUpdate < 0) {
      indexToUpdate = discountProducts.length - 1;
    } else if (index >= discountProducts.length) {
      indexToUpdate = 0;
    }

    setIndex(indexToUpdate);
  };

  console.log(discountProducts);

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button
            onClick={() => updateIndex(index - 1)}
            className={styles.btn}
            type="button"
            disabled={index === 0}
          >
            previous
          </button>

          <button
            onClick={() => updateIndex(index + 1)}
            className={styles.btn}
            type="button"
            disabled={index === discountProducts.length - 4}
          >
            next
          </button>
        </div>

        <div
          className={styles.box__slider}
          style={{
            transform: `translateX(-${index * 277}px)`,
          }}
        >
          {discountProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              link={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
