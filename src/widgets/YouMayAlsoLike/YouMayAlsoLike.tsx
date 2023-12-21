import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { ProductCard } from '../../entities/ProductCard';
import { Loader } from '../Loader';
import { Product } from '../../shared/types/Product';
import { getSuggestedProducts } from '../../shared/api/getProductHelper';
import { Notification } from '../../shared/ui/Notification';

export const YouMayAlsoLike: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSuggested = async () => {
    try {
      const products = await getSuggestedProducts();

      setSuggestions(products);

      if (products.length === 0) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchSuggested()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SecondaryTitle>
        You may also like
      </SecondaryTitle>

      {isLoading && <Loader />}

      {error && (
        <Notification message="Sorry, data is unavailable at the moment" />
      )}

      {!isLoading && suggestions.length > 0 && (
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

      {!isLoading && suggestions.length === 0 && !error && (
        <h2>Nothing to display</h2>
      )}
    </>
  );
};
