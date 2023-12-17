import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import leftArrow from '../../static/icons/left-arrow-black.svg';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={styles.backButton__container}
      onClick={goBack}
    >
      <img
        className={styles.backButton__container__icon}
        src={leftArrow}
        alt="Left arrow icon"
      />
      Back
    </button>
  );
};
