import React, { memo, useState, useRef } from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { scrollToTop } from '../../shared/helpers/scrollFunct';

interface Props {
  totalCount: number;
}

export const Pagination: React.FC<Props> = memo(({ totalCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const perPage = searchParams.get('perPage') || 16;
  const pagesNumber = Math.ceil(totalCount / +perPage);

  const pages = useRef<number[]>([]);
  const allPages = [];

  for (let i = 1; i <= pagesNumber; i += 1) {
    allPages.push(i);
  }

  if (pagesNumber > 8) {
    if (currentPage === 1) {
      pages.current = allPages.slice(0, 7);
    } else if (
      currentPage === pages.current[pages.current.length - 1]
      || currentPage === pages.current[0]
    ) {
      pages.current = allPages.slice(currentPage - 4, currentPage + 4);
    }
  } else {
    pages.current = allPages;
  }

  const setPage = (newPage: string) => {
    if (Number(newPage) > pagesNumber || Number(newPage) < 1) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (params.get('page')) {
      params.delete('page');
    }

    params.set('page', newPage);
    setSearchParams(params);
    setCurrentPage(Number(newPage));
    scrollToTop();
  };

  const handleBackClick = () => {
    setPage(`${+currentPage - 1}`);

    scrollToTop();
  };

  const handleForwardClick = () => {
    setPage(`${+currentPage + 1}`);

    scrollToTop();
  };

  if (currentPage > pagesNumber) {
    setPage('1');
  }

  return (
    <div className="pagination page__pagination">
      <button
        aria-label="previous page"
        type="button"
        className={cn('pagination__arrow-button', {
          'pagination__arrow-button--disabled': currentPage === 1,
        })}
        onClick={handleBackClick}
      >
        <div className="pagination__arrow-icon pagination__arrow-icon--left" />
      </button>
      <ul className="pagination__list">
        {pages.current.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              aria-label={`page ${pageNumber}`}
              type="button"
              className={cn('pagination__item', {
                'pagination__item--active': currentPage === pageNumber,
              })}
              onClick={() => {
                setPage(`${pageNumber}`);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
      <button
        aria-label="next page"
        type="button"
        className={cn('pagination__arrow-button', {
          'pagination__arrow-button--disabled': currentPage === pagesNumber,
        })}
        onClick={handleForwardClick}
      >
        <div className="pagination__arrow-icon pagination__arrow-icon--right" />
      </button>
    </div>
  );
});
