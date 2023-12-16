import React, { useEffect, useState } from 'react';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductSlider } from '../../features/ProductSlider';
import { Loader } from '../Loader';
import { getSuggestedPhones } from '../../shared/api/phones';
import { Phone } from '../../shared/types/Phone';
import { ProductCard } from '../../entities/ProductCard';

export const YouMayAlsoLike: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewPhones = async () => {
    try {
      const phones = await getSuggestedPhones();

      setSuggestions(phones);
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
        You may also like
      </SecondaryTitle>

      {isLoading
        ? <Loader />
        : (
          <ProductSlider>
            {suggestions.map(phone => {
              return <ProductCard key={phone.phoneId} phone={phone} />;
            })}
          </ProductSlider>
        )}
    </>
  );
};
