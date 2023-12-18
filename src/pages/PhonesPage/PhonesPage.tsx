import React, { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../shared/types/Phone';
import { getAllPhonesWithParams } from '../../shared/api/phones';
import { Dropdown } from '../../shared/ui/Dropdown';
import { Pagination } from '../../features/Pagination';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { sortOptions, itemsOnPage } from '../../shared/helpers/searchParams';
import { getSearchWith } from '../../shared/helpers/searchHelper';
import { Catalog } from '../../widgets/Catalog';

export const PhonesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'name';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page');

  const [isLoading, setIsLoading] = useState(false);
  const [allPhones, setAllPhones] = useState<Phone[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  // const newSearchParams = useSearchParams();
  // if (newSearchParams.toString().split(',')[0] !== searchParams) {
  //   setSearchParams(newSearchParams.toString().split(',')[0]);
  // }

  const fetchPhones = async () => {
    setIsLoading(true);

    try {
      const phones = await getAllPhonesWithParams(searchParams.toString());

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

  useEffect(() => {
    const visibleSearchParams = {
      sortBy: sortBy === 'name' ? null : sortBy,
      perPage: perPage === '16' ? null : perPage,
      page: page === '1' ? null : page,
    };

    setSearchParams(getSearchWith(visibleSearchParams, searchParams));
  }, [sortBy, perPage, page, searchParams, setSearchParams]);

  const handleSortByChange = (value: string) => {
    setSearchParams(getSearchWith({ sortBy: value }, searchParams));
  };

  const handlePerPageChange = (value: string) => {
    setSearchParams(getSearchWith({ perPage: value }, searchParams));
  };

  return (
    <div className="phonesPage">
      <div className="phonesPage__top">
        <div className="phonesPage__path">
          <Breadcrumbs />
        </div>

        <h1 className="phonesPage__header">Mobile Phones</h1>

        <p className="phonesPage__count">{`${totalCount} models`}</p>

        <div className="dropdown">
          <div className="dropdown__sort">
            <p className="dropdown__title">
              Sort by
            </p>
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={handleSortByChange}
            />
          </div>
          <div className="dropdown__items">
            <p className="dropdown__title">
              Items on page
            </p>
            <Dropdown
              options={itemsOnPage}
              value={perPage}
              onChange={handlePerPageChange}
            />
          </div>
        </div>
      </div>

      <div className="phones">
        <div className="phones__container">
          <Catalog
            isLoading={isLoading}
            allProducts={allPhones}
            linkTo="phones"
          />
        </div>
      </div>

      {allPhones.length > 0 && (
        <div className="phones__pagination">
          <Pagination totalCount={totalCount} />
        </div>
      )}
    </div>
  );
};
