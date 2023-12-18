import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { Loader } from '../Loader';
import { ProductCard } from '../../entities/ProductCard';
import { Product } from '../../shared/types/Product';
import { getSuggestedProducts } from '../../shared/api/getProductHelper';

export const YouMayAlsoLike: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewProducts = async () => {
    try {
      const products = await getSuggestedProducts();

      setSuggestions(products);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchNewProducts()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SecondaryTitle>
        You may also like
      </SecondaryTitle>

      {isLoading
        ? <Loader />
        : (
          <ProductSlider>
            {suggestions.map(product => {
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
    </>
  );
};
