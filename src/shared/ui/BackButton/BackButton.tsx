import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BackButton.module.scss';
import leftArrow from '../../static/icons/left-arrow-black.svg';

export const BackButton: React.FC = () => {
  return (
    <Link
      to=".."
      className={styles.backButton__container}
    >
      <img
        className={styles.backButton__container__icon}
        src={leftArrow}
        alt="Left arrow icon"
      />
      Back
    </Link>
  );
};
