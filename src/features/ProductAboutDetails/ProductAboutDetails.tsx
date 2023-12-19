import React from 'react';
import styles from './ProductAboutDetails.module.scss';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductDetails } from '../../shared/types/Product';

type Props = {
  productDetail: ProductDetails | null;
};

export const ProductAboutDetails: React.FC<Props> = ({ productDetail }) => {
  return (
    <div className={styles.about}>
      <SecondaryTitle>About</SecondaryTitle>

      {productDetail?.description.map((info) => {
        const { text, title } = info;

        return (
          <article key={title} className={styles.description}>
            <h3 className={styles.description__title}>{title}</h3>

            <p className={styles.description__text}>{text}</p>
          </article>
        );
      })}
    </div>
  );
};
