import React from 'react';
import './HomePage.scss';
import { PhotosSlider } from '../../features/PhotosSlider';
import { BrandNewModels } from '../../widgets/BrandNewModels';
import { CategoriesMenu } from '../../widgets/CategoriesMenu';
import { HotPrices } from '../../widgets/HotPrices';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage__item">
        <h1 className="homepage__title">
          Welcome to Nice Gadgets Store
        </h1>

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
