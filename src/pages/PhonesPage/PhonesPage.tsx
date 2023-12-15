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

  const itemsOnPage = [
    { label: '4', value: 4 },
    { label: '8', value: 8 },
    { label: '16', value: 16 },
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
      <div className="dropdown">
        <div className="dropdown__sort">
          <p className="dropdown__title">
            Sort by
          </p>
          <Dropdown options={filteredOptions} />
        </div>
        <div className="dropdown__items">
          <p className="dropdown__title">
            Items on page
          </p>
          <Dropdown options={itemsOnPage} />
        </div>
      </div>

      <div className="phones__container">
        {allPhones.map(phone => <ProductCard key={phone.id} phone={phone} />)}
      </div>
    </div>
  );
};
