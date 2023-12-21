import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { getNewestProducts } from '../../shared/api/getProductHelper';
import { ProductSlider } from '../../features/ProductSlider';
import { ProductCard } from '../../entities/ProductCard';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { Notification } from '../../shared/ui/Notification/Notification';
import { Product } from '../../shared/types/Product';
import { SkeletonCard } from '../SceletonCard';
import styles from './BrandNewModels.module.scss';

export const BrandNewModels: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchNewProducts = async () => {
    try {
      const products = await getNewestProducts();

      setNewProducts(products);

      if (products.length === 0) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchNewProducts()
      .finally(() => setIsLoading(false));
  }, []);

  const smallScreen = useMediaQuery('(max-width: 560px)');
  const mediumScreen = useMediaQuery('(max-width: 850px)');
  const bigScreen = useMediaQuery('(max-width: 1100px)');

  let cardsCount = 0;

  if (smallScreen) {
    cardsCount = 1;
  } else if (mediumScreen) {
    cardsCount = 2;
  } else if (bigScreen) {
    cardsCount = 3;
  } else {
    cardsCount = 4;
  }

  return (
    <>
      <SecondaryTitle>
        Brand new models
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

      {!isLoading && newProducts.length > 0 && (
        <ProductSlider>
          {newProducts.map(product => (
            <ProductCard
              key={product.itemId}
              product={product}
              link={product.category}
            />
          ))}
        </ProductSlider>
      )}

      {!isLoading && newProducts.length === 0 && !error && (
        <h2>Nothing to display</h2>
      )}
    </>
  );
};

export default BrandNewModels;
