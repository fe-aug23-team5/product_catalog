import React from 'react';
import cn from 'classnames';

import styles from './ProductCapacityDetails.module.scss';
import { ProductDetails } from '../../shared/types/Product';

type Props = {
  productDetail: ProductDetails | null;
  changeCapacity: (capacity: string) => void;
};

export const ProductCapacityDetails: React.FC<Props> = ({
  productDetail,
  changeCapacity,
}) => {
  return (
    <div className={styles.capacity}>
      <p className={styles.capacity__text}>Select capacity</p>

      <ul className={styles.capacity__list}>
        {productDetail?.capacityAvailable.map((capacityItem) => (
          <li
            key={capacityItem}
            className={cn(styles.capacity__item, {
              [styles.capacity__item_active]:
                capacityItem === productDetail.capacity,
            })}
          >
            <button
              type="button"
              className={cn(styles.capacity__button, {
                [styles.capacity__button_active]:
                  capacityItem === productDetail.capacity,
              })}
              onClick={() => changeCapacity(capacityItem.toLowerCase())}
            >
              {capacityItem}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
