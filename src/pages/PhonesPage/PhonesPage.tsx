import React, { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { Phone } from '../../shared/types/Phone';
import { getAllPhones } from '../../shared/api/phones';
import { ProductCard } from '../../entities/ProductCard';

export const PhonesPage: React.FC = () => {
  const [allPhones, setAllPhones] = useState<Phone[]>([]);

  const fetchPhones = async () => {
    try {
      const phones = await getAllPhones();

      setAllPhones(phones.rows);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <div className="phones_container">
      {allPhones.map(phone => <ProductCard key={phone.id} phone={phone} />)}
    </div>
  );
};
