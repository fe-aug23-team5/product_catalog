import React, { useEffect, useState } from 'react';
import './TabletsPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../../shared/ui/Dropdown';
import { Loader } from '../../widgets/Loader';
import { Pagination } from '../../features/Pagination';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { sortOptions, itemsOnPage } from '../../shared/helpers/searchParams';
import { getSearchWith } from '../../shared/helpers/searchHelper';
import productsFromServer from '../../shared/static/products.json';
import { Tablet } from '../../shared/types/Tablet';
import { ProductCard } from '../../entities/ProductCard';

export const TabletsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'name';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page');

  const [isLoading, setIsLoading] = useState(false);
  const [allTablets, setAllTablets] = useState<Tablet[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchTablets = async () => {
    setIsLoading(true);

    const tabletsFromServer = productsFromServer.filter(product => {
      return product.category === 'tablets';
    });

    setTimeout(() => {
      setAllTablets(tabletsFromServer);
      setTotalCount(tabletsFromServer.length);
      setIsLoading(false);
    }, 0);
  };

  useEffect(() => {
    fetchTablets();
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

        <h1 className="phonesPage__header">Tablets</h1>

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
          {isLoading && <Loader />}

          {!isLoading && allTablets.length && (
            allTablets.map((tablet) => (
              <ProductCard key={tablet.id} phone={tablet} />
            ))
          )}
        </div>
      </div>

      {allTablets.length > 0 && (
        <div className="phones__pagination">
          <Pagination totalCount={totalCount} />
        </div>
      )}
    </div>
  );
};
