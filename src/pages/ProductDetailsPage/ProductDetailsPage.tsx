/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductDetails.module.scss';
import { getPhoneById, getSuggestedPhones } from '../../shared/api/phones';
import { PhoneDetails } from '../../shared/types/PhoneDetails';
import { Phone } from '../../shared/types/Phone';
import leftArrow from '../../img/icons/Chevron (Arrow Right).svg';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { Loader } from '../../widgets/Loader';
import { ProductSlider } from '../../features/ProductSlider';
import { ProductCard } from '../../entities/ProductCard';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';

enum TechSpecs {
  SCREEN = 'screen',
  RESOLUTION = 'resolution',
  PROCESSOR = 'processor',
  RAM = 'ram',
  CAPACITY = 'capacity',
  CAMERA = 'camera',
  ZOOM = 'zoom',
  CELL = 'cell',
}

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState<PhoneDetails | null>(null);
  const [
    recommendedProducts, setRecommendedProducts,
  ] = useState<Phone[] | null>(null);
  const [productImage, setProductImage] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [capacity, setCapacity] = useState(productDetail?.capacity);
  const [
    productColor, setProductColor,
  ] = useState(location.pathname.split('-').at(-1));

  useEffect(() => {
    setIsLoad(true);
    getPhoneById(`${location.pathname.split('/')[2]}`)
      .then((data) => {
        setProductDetail(data);
        setProductImage(`${BASE_URL_IMG}${data.images[0]}`);
      })
      .catch(error => {
        throw error;
      })
      .finally(() => setIsLoad(false));
  }, [capacity, productColor, location.pathname]);

  useEffect(() => {
    getSuggestedPhones()
      .then(setRecommendedProducts)
      .catch(error => {
        throw error;
      })
      .finally(() => setIsLoad(false));
  }, []);

  const changeProductColor = (color: string) => {
    if (color === productColor) {
      return;
    }

    const productId = location.pathname
      .split('/')[2].split('-').slice(0, -1).join('-');

    setIsLoad(true);
    setProductColor(color);
    navigate(`/phones/${productId}-${color}`);
  };

  const changeCapacity = (value: string) => {
    if (value === capacity) {
      return;
    }

    const productId = location.pathname
      .split('/')[2].split('-').slice(0, -1).join('-')
      .split('-')
      .map(item => (item.includes('gb') ? value : item))
      .join('-');

    setIsLoad(true);
    setCapacity(value);
    navigate(`/phones/${productId}-${location.pathname.split('-').at(-1)}`);
  };

  const goBack = () => {
    navigate('..');
  };

  const convertTechDetails = (value: string) => {
    if (value === 'ram') {
      return 'RAM';
    }

    if (value === 'capacity') {
      return 'Built in memory';
    }

    return value.replace(value[0], value[0].toUpperCase());
  };

  return isLoad
    ? (<Loader />)
    : (
      <div className={styles.product_details}>
        <div className={styles.block_top}>
          <div className={styles.bread_crumbs}>
            <Breadcrumbs productName={productDetail?.name} />
          </div>
          <button
            className={styles.goback_button}
            type="button"
            onClick={goBack}
          >
            <img
              className={styles.icon}
              src={leftArrow}
              alt="Rigth arrow icon"
            />
            Back
          </button>

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
                {Object.values(TechSpecs).slice(0, 4).map(item => {
                  return (
                    <p key={item} className={styles.details__text}>
                      <span className={styles.details__key}>
                        {convertTechDetails(item)}
                      </span>

                      <span className={styles.details__value}>
                        {productDetail !== null && productDetail[item]}
                      </span>
                    </p>
                  );
                })}
              </div>
            </div>
          </article>
        </div>

        <div className={styles.block_about}>
          <section className={styles.about}>
            <SecondaryTitle>
              About
            </SecondaryTitle>

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
            <SecondaryTitle>
              Tech specs
            </SecondaryTitle>

            <article className={styles.tech__details}>
              {Object.values(TechSpecs).map(item => (
                <p key={item} className={styles.tech__wrapper}>
                  <span className={styles.tech__key}>
                    {convertTechDetails(item)}
                  </span>

                  <span className={styles.tech__value}>
                    {productDetail !== null && productDetail[item]}
                  </span>
                </p>
              ))}
            </article>
          </section>
        </div>

        <section className={styles.recommended}>
          <SecondaryTitle>
            You may also like
          </SecondaryTitle>

          <ProductSlider>
            {
              recommendedProducts !== null && recommendedProducts
                .map((phone) => {
                  return <ProductCard key={phone.phoneId} phone={phone} />;
                })
            }
          </ProductSlider>
        </section>
      </div>
    );
};
