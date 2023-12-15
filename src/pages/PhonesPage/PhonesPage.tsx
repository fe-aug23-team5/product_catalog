import React, { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { Phone } from '../../shared/types/Phone';
import { getAllPhones } from '../../shared/api/phones';
import { ProductCard } from '../../entities/ProductCard';
import { Dropdown } from '../../shared/ui/Dropdown';

export const PhonesPage: React.FC = () => {
  const [allPhones, setAllPhones] = useState<Phone[]>([]);

  const filteredOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'PriceLowest', value: 'priceLowest' },
    { label: 'PriceHighest', value: 'priceHighest' },
  ];

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
    <div className="container">
      <Dropdown options={filteredOptions} />

      <div className="phones_container">
        {allPhones.map(phone => <ProductCard key={phone.id} phone={phone} />)}
      </div>
    </div>
  );
};
