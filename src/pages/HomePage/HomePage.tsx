import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { ProductCard } from '../../entities/ProductCard';
import { ProductSlider } from '../../features/ProductSlider';
import { CategoriesMenu } from '../../widgets/CategoriesMenu';
import { PhotosSlider } from '../../features/PhotosSlider';
import { PageTitle } from '../../shared/ui/PageTitle';
import { Phone } from '../../shared/types/Phone';
import { getAllPhones } from '../../shared/api/phones';

export const HomePage: React.FC = () => {
  const [allPhones, setAllPhones] = useState<Phone[]>([]);

  const fetchPhones = async () => {
    try {
      const phones = await getAllPhones();

      setAllPhones(phones.data);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <div className="content_container">
      <div className="content_container_item">
        <PageTitle>Welcome to Nice Gadgets Store</PageTitle>

        <PhotosSlider />
      </div>

      <div className="content_container_item">
        <ProductSlider>
          {allPhones.map(phone => <ProductCard key={phone.id} phone={phone} />)}
        </ProductSlider>
      </div>

      <div className="content_container_item">
        <CategoriesMenu />
      </div>

      <div className="content_container_item">
        <ProductSlider>
          {allPhones.map(phone => <ProductCard key={phone.id} phone={phone} />)}
        </ProductSlider>
      </div>
    </div>
  );
};
