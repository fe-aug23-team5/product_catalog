import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { Loader } from '../Loader';
import { ProductCard } from '../../entities/ProductCard';
import { Product } from '../../shared/types/Product';
import { getNewestProducts } from '../../shared/api/getProductHelper';

export const BrandNewModels: React.FC = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewProducts = async () => {
    try {
      const products = await getNewestProducts();

      setNewProducts(products);
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
        Brand new models
      </SecondaryTitle>

      {isLoading && <Loader />}

      {!isLoading && newProducts.length && (
        (
          <ProductSlider>
            {newProducts.map(product => {
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

      {!isLoading && !newProducts.length && (
        <h2>Nothing to display</h2>
      )}
    </>
  );
};
