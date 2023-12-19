import React from 'react';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../../entities/ProductCard';
import './ProductSlider2.scss';

interface Props {
  newProducts: Product[];
}

export const ProductSlider2: React.FC<Props> = ({ newProducts }) => {
  return (
    <div className="slider-container">
      <h2>hello</h2>
      <div className="slider">
        {newProducts.map(product => (
          <ProductCard
            key={product.id}
            link={product.category}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
