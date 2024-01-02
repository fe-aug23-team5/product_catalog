import React from 'react';
import cn from 'classnames';
import styles from './ProductColorsDetails.module.scss';
import { ProductDetails } from '../../shared/types/Product';
import { HashProductColors } from '../../shared/types/ProductColors';
import { scrollToTop } from '../../shared/helpers/scrollFunct';

type Props = {
  productDetail: ProductDetails | null;
  productColor?: string;
  changeProductColor: (color: string) => void;
};

export const ProductColorsDetails: React.FC<Props> = ({
  productDetail,
  productColor,
  changeProductColor,
}) => {
  const handleClick = (color: string) => {
    changeProductColor(color);
    scrollToTop();
  };

  return (
    <div className={styles.color}>
      <div className={styles.color__text}>
        <span className={styles.color__description}>Available colors</span>

        <span className={styles.color__description}>
          {`ID: ${productDetail?.id.toUpperCase()}`}
        </span>
      </div>

      <ul className={styles.color__list}>
        {productDetail?.colorsAvailable.map((color) => (
          <li
            key={color}
            className={cn(styles.color__item, {
              [styles.color__item_active]: color === productColor,
            })}
          >
            <button
              onClick={() => handleClick(color)}
              style={{ backgroundColor: HashProductColors[color] }}
              className={styles.color__button}
              type="button"
              aria-label="change color button"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
