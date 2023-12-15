import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { Loader } from '../Loader';
import { getNewestPhones } from '../../shared/api/phones';
import { Phone } from '../../shared/types/Phone';
import { ProductCard } from '../../entities/ProductCard';

export const BrandNewModels: React.FC = () => {
  const [newPhones, setNewPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewPhones = async () => {
    try {
      const phones = await getNewestPhones();

      setNewPhones(phones);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchNewPhones()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SecondaryTitle>
        Brand new models
      </SecondaryTitle>

      {isLoading
        ? <Loader />
        : (
          <ProductSlider>
            {newPhones.map(phone => {
              return <ProductCard key={phone.phoneId} phone={phone} />;
            })}
          </ProductSlider>
        )}
    </>
  );
};
