import React from 'react';
import './HomePage.scss';
import { CategoriesMenu } from '../../widgets/CategoriesMenu';
import { PhotosSlider } from '../../features/PhotosSlider';
import { PageTitle } from '../../shared/ui/PageTitle';
import { BrandNewModels } from '../../widgets/BrandNewModels';
import { HotPrices } from '../../widgets/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <div className="content_container">
      <div className="content_container_item">
        <PageTitle>Welcome to Nice Gadgets Store</PageTitle>

        <PhotosSlider />
      </div>

      <div className="content_container_item">
        <BrandNewModels />
      </div>

      <div className="content_container_item">
        <CategoriesMenu />
      </div>

      <div className="content_container_item">
        <HotPrices />
      </div>
    </div>
  );
};
