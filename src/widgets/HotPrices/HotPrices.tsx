import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { Loader } from '../Loader';
import { getDiscountPhones } from '../../shared/api/phones';
import { Phone } from '../../shared/types/Phone';
import { ProductCard } from '../../entities/ProductCard';

export const HotPrices: React.FC = () => {
  const [discountPhones, setDiscountPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewPhones = async () => {
    try {
      const phones = await getDiscountPhones();

      setDiscountPhones(phones);
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
        Hot Prices
      </SecondaryTitle>

      {isLoading
        ? <Loader />
        : (
          <ProductSlider>
            {discountPhones.map((phone) => {
              return <ProductCard key={phone.phoneId} phone={phone} />;
            })}
          </ProductSlider>
        )}
    </>
  );
};
