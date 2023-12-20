import React, { useEffect, useState } from 'react';
import { getNewestProducts } from '../../shared/api/getProductHelper';
import { ProductSlider } from '../../features/ProductSlider';
import { ProductCard } from '../../entities/ProductCard';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { Notification } from '../../shared/ui/Notification/Notification';
import { Product } from '../../shared/types/Product';
import { Loader } from '../Loader';

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

  return (
    <>
      <SecondaryTitle>
        Brand new models
      </SecondaryTitle>

      {isLoading && <Loader />}

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
