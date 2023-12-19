import React from 'react';
import styles from './ProductTechDetails.module.scss';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { ProductDetails } from '../../shared/types/Product';
import {
  TechSpecsAccessory,
  TechSpecsPhoneTablet,
} from '../../shared/types/TechSpecs';
import {
  convertTechDetails, isTechSpecKey,
} from '../../shared/helpers/ConvertTechDetails';

type Props = {
  productDetail: ProductDetails | null;
  productType: string;
};

export const ProductTechDetails: React.FC<Props> = ({
  productDetail,
  productType,
}) => {
  const TECH_SPECS = productType === 'watch'
    ? Object.values(TechSpecsAccessory)
    : Object.values(TechSpecsPhoneTablet);

  return (
    <div className={styles.tech}>
      <SecondaryTitle>Tech specs</SecondaryTitle>

      <article className={styles.tech__details}>
        {TECH_SPECS.map((item) => (
          <p key={item} className={styles.tech__wrapper}>
            <span className={styles.tech__key}>
              {convertTechDetails(item)}
            </span>

            <span className={styles.details__value}>
              {productDetail !== null
              && isTechSpecKey(item)
              && productDetail[item]}
            </span>
          </p>
        ))}
      </article>
    </div>
  );
};
