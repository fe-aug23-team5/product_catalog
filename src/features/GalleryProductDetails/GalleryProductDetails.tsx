import React, { useState } from 'react';
import cn from 'classnames';

import styles from './GalleryProductDetails.module.scss';
import { ProductDetails } from '../../shared/types/Product';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';

type Props = {
  productDetail: ProductDetails | null;
  productImage: string;
  setProductImage: (url: string) => void;

};

export const GalleryProductDetails: React.FC<Props> = ({
  productDetail,
  productImage,
  setProductImage,
}) => {
  const [isActiveMainImg, setIsActiveMainImg] = useState(true);

  const changeProductImage = (image: string) => {
    setIsActiveMainImg(false);
    setTimeout(() => {
      setProductImage(`${BASE_URL_IMG}${image}`);
      setIsActiveMainImg(true);
    }, 300);
  };

  return (
    <div className={styles.block_gallery}>
      <div className={styles.block_gallery__image_wrapper}>
        <img
          className={cn(styles.block_gallery_main_image, {
            [styles.block_gallery_main_image_active]: isActiveMainImg,
          })}
          src={productImage}
          alt="Product"
        />
      </div>

      <ul className={styles.block_gallery__list}>
        {productDetail?.images.map((image) => (
          <li key={image} className={styles.block_gallery__item}>
            <button
              className={cn(styles.block_gallery__button, {
                [styles.block_gallery__button_active]:
                  productImage === `${BASE_URL_IMG}${image}`,
              })}
              type="button"
              onClick={() => changeProductImage(image)}
            >
              <img
                className={styles.block_gallery__image}
                src={`${BASE_URL_IMG}${image}`}
                alt="Product"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
