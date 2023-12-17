/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductDetails.module.scss';
import { getPhoneById } from '../../shared/api/phones';
import { PhoneDetails } from '../../shared/types/PhoneDetails';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { Loader } from '../../widgets/Loader';
import { YouMayAlsoLike } from '../../widgets/YouMayAlsoLike';
import { BackButton } from '../../shared/ui/BackButton';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const [productDetail, setProductDetail] = useState<PhoneDetails | null>(null);
  const [productImage, setProductImage] = useState('');
  const [isLoad, setIsLoad] = useState(true);
  const [capacity, setCapacity] = useState(productDetail?.capacity);

  const productId = useRef(location.pathname
    .split('/')[2].split('-').slice(0, -1).join('-'));

  const [
    productColor, setProductColor,
  ] = useState(location.pathname.split('-').at(-1));

  useEffect(() => {
    getPhoneById(`${productId.current}-${productColor}`)
      .then((data) => {
        setProductDetail(data);
        setProductImage(`${BASE_URL_IMG}${data.images[0]}`);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => setIsLoad(false));
  }, [capacity, productColor]);

  const changeProductColor = (color: string) => {
    if (color === productColor) {
      return;
    }

    setIsLoad(true);
    setProductColor(color);
  };

  const changeCapacity = (value: string) => {
    if (value === capacity) {
      return;
    }

    productId.current = productId.current
      .split('-').map(item => (item.includes('gb') ? value : item)).join('-');
    setIsLoad(true);
    setCapacity(value);
  };

  return isLoad
    ? (<Loader />)
    : (
      <div className={styles.product_details}>
        <div className={styles.block_top}>
          <Breadcrumbs />

          <div className={styles.goback_button}>
            <BackButton />
          </div>

          <h1 className={styles.section_image__title}>
            {productDetail?.name}
          </h1>
        </div>

        <div className={styles.block_gallery}>
          <div className={styles.block_gallery__image_wrapper}>
            <img
              className={styles.block_gallery_main_image}
              src={productImage}
              alt="Product"
            />
          </div>

          <ul className={styles.block_gallery__list}>
            {productDetail?.images.map(image => (
              <li key={image} className={styles.block_gallery__item}>
                <button
                  className={cn(styles.block_gallery__button, {
                    [
                    styles.block_gallery__button_active
                    ]: productImage === `${BASE_URL_IMG}${image}`,
                  })}
                  type="button"
                  onClick={() => setProductImage(`${BASE_URL_IMG}${image}`)}
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

        <div className={styles.block_info}>
          <article className={styles.block_info__information}>
            <div className={styles.color}>
              <div className={styles.color__text}>
                <span className={styles.color__description}>
                  Available colors
                </span>

                <span className={styles.color__description}>
                  ID:123
                </span>
              </div>

              <ul className={styles.color__list}>
                {productDetail?.colorsAvailable.map(color => (
                  <li
                    key={color}
                    className={cn(styles.color__item, {
                      [styles.color__item_active]: color === productColor,
                    })}
                  >
                    <button
                      onClick={() => changeProductColor(color)}
                      style={{ backgroundColor: `${color}` }}
                      className={styles.color__button}
                      type="button"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.capacity}>
              <p className={styles.capacity__text}>
                Select capacity
              </p>

              <ul className={styles.capacity__list}>
                {productDetail?.capacityAvailable.map(capacityItem => (
                  <li
                    key={capacityItem}
                    className={cn(styles.capacity__item, {
                      [
                      styles.capacity__item_active
                      ]: capacityItem === productDetail.capacity,
                    })}
                  >
                    <button
                      type="button"
                      className={cn(styles.capacity__button, {
                        [
                        styles.capacity__button_active
                        ]: capacityItem === productDetail.capacity,
                      })}
                      onClick={() => changeCapacity(capacityItem.toLowerCase())}
                    >
                      {capacityItem}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.price}>
              <p className={styles.price__amount}>
                <span className={styles.price__discount}>
                  {`$${productDetail?.priceDiscount}`}
                </span>

                <span className={styles.price__regular}>
                  {`$${productDetail?.priceRegular}`}
                </span>
              </p>

              <div className={styles.price__buttons}>
                <PrimaryButton
                  defaultAction={() => { }}
                  defaultTitle="Checkout"
                />

                <IconButton
                  defaultAction={() => { }}
                />
              </div>

              <div className={styles.details}>
                <p className={styles.details__text}>
                  <span className={styles.details__key}>
                    Screen
                  </span>

                  <span className={styles.details__value}>
                    {productDetail?.screen}
                  </span>
                </p>

                <p className={styles.details__text}>
                  <span className={styles.details__key}>
                    Resolution
                  </span>

                  <span className={styles.details__value}>
                    {productDetail?.resolution}
                  </span>
                </p>

                <p className={styles.details__text}>
                  <span className={styles.details__key}>
                    Processor
                  </span>

                  <span className={styles.details__value}>
                    {productDetail?.processor}
                  </span>
                </p>

                <p className={styles.details__text}>
                  <span className={styles.details__key}>
                    RAM
                  </span>

                  <span className={styles.details__value}>
                    {productDetail?.ram}
                  </span>
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className={styles.block_about}>
          <section className={styles.about}>
            <h2 className={styles.about__title}>
              About
            </h2>

            {productDetail?.description.map(info => {
              const { text, title } = info;

              return (
                <article key={title} className={styles.description}>
                  <h3 className={styles.description__title}>
                    {title}
                  </h3>

                  <p className={styles.description__text}>
                    {text}
                  </p>
                </article>
              );
            })}
          </section>
        </div>

        <div className={styles.block_tech}>
          <section className={styles.tech}>
            <h2 className={styles.tech__title}>
              Tech specs
            </h2>

            <article className={styles.tech__details}>
              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Screen
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.screen}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Resolution
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.resolution}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Processor
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.processor}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  RAM
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.ram}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Built in memory
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.capacity}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Camera
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.camera}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Zoom
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.zoom}
                </span>
              </p>

              <p className={styles.tech__wrapper}>
                <span className={styles.tech__key}>
                  Cell
                </span>

                <span className={styles.tech__value}>
                  {productDetail?.cell.join(', ')}
                </span>
              </p>
            </article>
          </section>
        </div>

        <section className={styles.slider}>
          <YouMayAlsoLike />
        </section>
      </div>
    );
};
