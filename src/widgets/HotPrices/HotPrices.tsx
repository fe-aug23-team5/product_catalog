import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { Loader } from '../Loader';
import { ProductCard } from '../../entities/ProductCard';
import { Product } from '../../shared/types/Product';
import { getDiscountProducts } from '../../shared/api/getProductHelper';

export const HotPrices: React.FC = () => {
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDiscountProducts = async () => {
    try {
      const products = await getDiscountProducts();

      setDiscountProducts(products);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchDiscountProducts()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SecondaryTitle>
        Hot Prices
      </SecondaryTitle>

      {isLoading && <Loader />}

      {!isLoading && discountProducts.length && (
        (
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
        )
      )}

      {!isLoading && !discountProducts.length && (
        <h2>Nothing to display</h2>
      )}
    </>
  );
};
