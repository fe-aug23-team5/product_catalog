import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import search from '../../shared/static/icons/icons-search.svg';
import close from '../../shared/static/icons/close-icon-black.svg';

interface Props {
  text: string;
}

export const SearchBar: React.FC<Props> = ({ text }) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputOpen(true);
  };

  const handleInputBlur = () => {
    setIsInputOpen(false);
  };

  const handleClearClick = () => {
    setInputValue('');
  };

  const isCloseIconVisible = inputValue.length;

  return (
    <div className={styles.box}>
      <input
        data-cy="NameFilter"
        type="search"
        className={`${styles.input} ${isInputOpen ? styles['input__select-open'] : ''}`}
        placeholder={`Search in ${text}...`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={inputValue}
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
        <span className={styles.icon}>
          <img src={search} alt="Icon Search" />
        </span>
      )}
    </div>
  );
};
