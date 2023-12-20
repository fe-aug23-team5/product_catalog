import React from 'react';
// import { Loader } from '../Loader';
import { ProductCard } from '../../entities/ProductCard';
import { Phone } from '../../shared/types/Phone';
import { Tablet } from '../../shared/types/Tablet';

type Props = {
  isLoading: boolean,
  allProducts: Phone[] | Tablet[],
};

export const Catalog: React.FC<Props> = ({
  isLoading,
  allProducts,
}) => {
  return (
    <>
      {/* {isLoading && <Loader />} */}

      {
        !isLoading && allProducts.length && (
          allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              link={product.category}
            />
          ))
        )
      }
    </>
  );
};
