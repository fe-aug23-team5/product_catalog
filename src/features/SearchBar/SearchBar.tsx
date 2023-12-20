import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import search from '../../shared/static/icons/icons-search.svg';
import close from '../../shared/static/icons/close-icon-black.svg';
import { getSearchWith } from '../../shared/helpers/searchHelper';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const currentCategory = location.pathname.split('/')[1];

  useEffect(() => {
    const currentQuery = new URLSearchParams(location.search).get('query');

    if (currentQuery !== null) {
      setInputValue(currentQuery);
    }
  }, [location.search]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const newSearchParams
        = getSearchWith({ query: inputValue }, new URLSearchParams());

      if (currentCategory) {
        navigate(`/${currentCategory}?${newSearchParams}`);
      }
    }
  };

  const handleInputFocus = () => {
    setIsInputOpen(true);
  };

  const handleInputBlur = () => {
    setIsInputOpen(false);
  };

  const getPlaceholder = () => {
    switch (currentCategory) {
      case 'phones':
        return 'Search in Phones...';
      case 'tablets':
        return 'Search in Tablets...';
      case 'accessories':
        return 'Search in Accessories...';
      default:
        return 'Search...';
    }
  };

  const handleClearClick = () => {
    setInputValue('');

    const newSearchParams = getSearchWith({ query: '' }, new URLSearchParams());

    if (currentCategory) {
      navigate(`/${currentCategory}?${newSearchParams}`);
    } else {
      navigate(`?${newSearchParams}`);
    }
  };

  const isCloseIconVisible = inputValue.length;

  const isHomeOrCart = location.pathname === '/'
    || location.pathname === '/cart'
    || location.pathname === '/favourites';

  return (
    <div className={`${styles.box} ${isHomeOrCart ? styles.hidden : ''}`}>
      <input
        data-cy="NameFilter"
        type="search"
        className={`${styles.input} ${isInputOpen ? styles['input__select-open'] : ''}`}
        placeholder={getPlaceholder()}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {isCloseIconVisible ? (
        <button
          className={styles.icon}
          onClick={handleClearClick}
          type="button"
        >
          <img src={close} alt="Close icon" />
        </button>
      ) : (
        <span
          className={styles.icon}
        >
          <img src={search} alt="Icon Search" />
        </span>
      )}
    </div>
  );
};
