/* eslint-disable react/no-array-index-key */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './SceletonCard.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SkeletonCard: React.FC = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className={styles.card__wrapper} key={i}>
        <div className={styles.card__photo}>
          <Skeleton height={196} style={{ marginBottom: '20px' }} />
        </div>
        <div className={styles.card__title}>
          <Skeleton height={40} style={{ marginBottom: '20px' }} />
        </div>
        <div className={styles.card__price}>
          <Skeleton height={20} style={{ marginBottom: '20px' }} />
        </div>
        <div className={styles.card__screen}>
          <Skeleton />
        </div>
        <div className={styles.card__capacity}>
          <Skeleton />
        </div>
        <div className={styles.card__ram}>
          <Skeleton style={{ marginBottom: '20px' }} />
        </div>
        <div className={styles.card__button}>
          <Skeleton height={40} />
        </div>
      </div>
    ));
};
