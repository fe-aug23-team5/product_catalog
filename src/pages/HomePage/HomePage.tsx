import React from 'react';
import './HomePage.scss';
import { CategoriesMenu } from '../../widgets/CategoriesMenu';
import { PhotosSlider } from '../../features/PhotosSlider';
import { PageTitle } from '../../shared/ui/PageTitle';
import { BrandNewModels } from '../../widgets/BrandNewModels';
import { HotPrices } from '../../widgets/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage__item">
        <PageTitle>Welcome to Nice Gadgets Store</PageTitle>

        <PhotosSlider />
      </div>

      <div className="homepage__item">
        <BrandNewModels />
      </div>

      <div className="homepage__item">
        <CategoriesMenu />
      </div>

      <div className="homepage__item">
        <HotPrices />
      </div>
    </div>
  );
};
