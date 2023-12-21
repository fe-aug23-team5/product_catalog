import React, { useEffect, useState } from 'react';
import './AccessoriesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../../shared/ui/Dropdown';
import { Pagination } from '../../features/Pagination';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs';
import { sortOptions, itemsOnPage } from '../../shared/helpers/searchParams';
import { getSearchWith } from '../../shared/helpers/searchHelper';
import { Catalog } from '../../widgets/Catalog';
import { getAllAccWithParams } from '../../shared/api/accessories';
import { Accessory } from '../../shared/types/Accessory';
import { FetchError } from '../../shared/ui/FetchError/FetchError';
import { Notification } from '../../shared/ui/Notification';
import { SkeletonCard } from '../../widgets/SceletonCard';

export const AccessoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'name';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page');
  const query = searchParams.get('query');

  const [allAcc, setAllAcc] = useState<Accessory[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAccessories = async () => {
    setIsLoading(true);

    try {
      const acc = await getAllAccWithParams(searchParams.toString());

      setAllAcc(acc.data);
      setTotalCount(acc.totalCount);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    const visibleSearchParams = {
      sortBy: sortBy === 'name' ? null : sortBy,
      perPage: perPage === '16' ? null : perPage,
      page: page === '1' ? null : page,
      query: query === '' ? null : query,
    };

    setSearchParams(getSearchWith(visibleSearchParams, searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSortByChange = (value: string) => {
    setSearchParams(getSearchWith({ sortBy: value }, searchParams));
  };

  const handlePerPageChange = (value: string) => {
    setSearchParams(getSearchWith({ perPage: value }, searchParams));
  };

  const handleRetry = () => {
    setError(false);
    fetchAccessories();
  };

  return (
    <div className="phonesPage">
      <div className="phonesPage__top">
        <div className="phonesPage__path">
          <Breadcrumbs />
        </div>

        <h1 className="phonesPage__header">Accessories</h1>

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

          {isLoading && (
            <div className="loader__container">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <SkeletonCard cards={4} />
            </div>
          )}

          {error && (
            <div className="phones__error">
              <FetchError onClick={handleRetry} />
            </div>
          )}

          {!error && allAcc.length > 0 && (
            <Catalog
              isLoading={isLoading}
              allProducts={allAcc}
            />
          )}

          {!error && !isLoading && allAcc.length === 0 && (
            <div className="phones__error">
              <Notification
                message="Sorry, there are no
              accessories matching following criteria"
              />
            </div>
          )}

        </div>
      </div>

      {!error && allAcc.length > 0 && !isLoading && (
        <div className="phones__pagination">
          <Pagination totalCount={totalCount} />
        </div>
      )}
    </div>
  );
};
