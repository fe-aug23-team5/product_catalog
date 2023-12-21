import React, { useEffect, useState } from 'react';
import { getDiscountProducts } from '../../shared/api/getProductHelper';
// import { ProductSlider } from '../../features/ProductSlider';
// import { ProductCard } from '../../entities/ProductCard';
// import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { Notification } from '../../shared/ui/Notification';
import { Product } from '../../shared/types/Product';
import { Loader } from '../Loader';
import { TestSlider } from '../../features/TestSlider/TestSlider';

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

  return (
    <>
      {/* <SecondaryTitle>
        Hot Prices
      </SecondaryTitle> */}

      {isLoading && <Loader />}

      {error && (
        <Notification message="Sorry, data is unavailable at the moment" />
      )}

      {!isLoading && discountProducts.length > 0 && (
        // <ProductSlider>
        //   {discountProducts.map(product => {
        //     return (
        //       <ProductCard
        //         key={product.itemId}
        //         product={product}
        //         link={product.category}
        //       />
        //     );
        //   })}
        // </ProductSlider>
        <TestSlider
          heading="Hot Prices"
          products={discountProducts.slice(0, 7)}
        />
      )}

      {!isLoading && discountProducts.length === 0 && !error && (
        <h2>Nothing to display</h2>
      )}
    </>
  );
};
