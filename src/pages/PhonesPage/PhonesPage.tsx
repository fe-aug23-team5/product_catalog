import React, { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../shared/types/Phone';
import { getAllPhonesWithParams } from '../../shared/api/phones';
import { ProductCard } from '../../entities/ProductCard';
import { Dropdown } from '../../shared/ui/Dropdown';
import { Loader } from '../../widgets/Loader';
import { Pagination } from '../../features/Pagination';

export const PhonesPage: React.FC = () => {
  const [allPhones, setAllPhones] = useState<Phone[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useState('');
  const newSearchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  if (newSearchParams.toString().split(',')[0] !== searchParams) {
    setSearchParams(newSearchParams.toString().split(',')[0]);
  }

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
    setIsLoading(true);

    try {
      const phones = await getAllPhonesWithParams(searchParams);

      setAllPhones(phones.data);
      setTotalCount(phones.totalCount);
    } catch (error) {
      throw new Error('Unexpected Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
    // eslint-disable-next-line
  }, [searchParams]);

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

      <div className="phones">
        <div className="phones__container">

          {isLoading && <Loader />}

          {!isLoading && allPhones.length && (
            allPhones.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))
          )}
        </div>

      </div>
      {allPhones.length > 0 && <Pagination totalCount={totalCount} />}
    </div>
  );
};
