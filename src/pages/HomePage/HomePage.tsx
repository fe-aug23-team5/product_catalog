import React from 'react';
import './HomePage.scss';
import { ProductCard } from '../../entities/ProductCard';
import { ProductSlider } from '../../features/ProductSlider';
import { CategoriesMenu } from '../../widgets/CategoriesMenu';
import { PhotosSlider } from '../../features/PhotosSlider';
import { PageTitle } from '../../shared/ui/PageTitle';

export const HomePage: React.FC = () => {
  return (
    <div className="content_container">
      <div className="content_container_item">
        <PageTitle>Welcome to Nice Gadgets Store</PageTitle>

        <PhotosSlider />
      </div>

      <div className="content_container_item">
        <ProductSlider />
      </div>

      <div className="content_container_item">
        <CategoriesMenu />
      </div>

      <div className="content_container_item">
        <ProductSlider />
      </div>

      <ProductCard />
    </div>
  );
};
