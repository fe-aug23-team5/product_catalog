import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { getDiscountProducts } from '../../shared/api/getProductHelper';
import { ProductSlider } from '../../features/ProductSlider';
import { ProductCard } from '../../entities/ProductCard';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { Notification } from '../../shared/ui/Notification';
import { Product } from '../../shared/types/Product';
import { SkeletonCard } from '../SceletonCard';
import styles from './HotPrices.module.scss';

export const HotPrices: React.FC = () => {
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDiscountProducts = async () => {
    try {
      const products = await getDiscountProducts();

      setDiscountProducts(products);

      if (products.length === 0) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchDiscountProducts()
      .finally(() => setIsLoading(false));
  }, []);

  const smallScreen = useMediaQuery('(max-width: 560px)');
  const mediumScreen = useMediaQuery('(max-width: 850px)');
  const bigScreen = useMediaQuery('(max-width: 1100px)');

  let cardsCount = 4;

  if (smallScreen) {
    cardsCount = 1;
  } else if (mediumScreen) {
    cardsCount = 2;
  } else if (bigScreen) {
    cardsCount = 3;
  }

  return (
    <>
      <SecondaryTitle>
        Hot Prices
      </SecondaryTitle>

      {isLoading && (
        <div className={styles.loader__container}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <SkeletonCard cards={cardsCount} />
        </div>
      )}

      {error && (
        <Notification message="Sorry, data is unavailable at the moment" />
      )}

      {!isLoading && discountProducts.length > 0 && (
        <ProductSlider>
          {discountProducts.map(product => {
            return (
              <ProductCard
                key={product.itemId}
                product={product}
                link={product.category}
              />
            );
          })}
        </ProductSlider>
      )}

      {!isLoading && discountProducts.length === 0 && !error && (
        <h2>Nothing to display</h2>
      )}
    </>
  );
};
