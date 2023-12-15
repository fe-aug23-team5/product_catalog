import React, { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../shared/types/Phone';
import { getAllPhonesWithParams } from '../../shared/api/phones';
import { ProductCard } from '../../entities/ProductCard';
import { Pagination } from '../../features/Pagination';

export const PhonesPage: React.FC = () => {
  const [allPhones, setAllPhones] = useState<Phone[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useState('');
  const newSearchParams = useSearchParams();

  if (newSearchParams.toString().split(',')[0] !== searchParams) {
    setSearchParams(newSearchParams.toString().split(',')[0]);
  }

  const fetchPhones = async () => {
    try {
      const phones = await getAllPhonesWithParams(searchParams);

      setAllPhones(phones.data);
      setTotalCount(phones.totalCount);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    fetchPhones();
  }, [searchParams]);

  return (
    <div className="phones">
      <div className="phones_container">
        {allPhones.map((phone) => (
          <ProductCard key={phone.id} phone={phone} />
        ))}
      </div>
      {allPhones.length > 0 && <Pagination totalCount={totalCount} />}
    </div>
  );
};
