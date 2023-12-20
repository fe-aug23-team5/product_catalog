/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import styles from './FetchError.module.scss';
import {
  ReactComponent as RefreshIcon,
} from '../../static/icons/refresh-white.svg';

interface Props {
  onClick: () => void;
}

export const FetchError: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>
        Error loading data. Please try again.
      </p>

      <button
        type="button"
        className={styles.retryButton}
        onClick={onClick}
      >
        <RefreshIcon className={styles.refreshIcon} />
      </button>
    </div>
  );
};
