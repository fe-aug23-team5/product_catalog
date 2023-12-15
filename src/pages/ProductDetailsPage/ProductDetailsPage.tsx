/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { getPhoneById } from '../../shared/api/phones';
import { PhoneDetails } from '../../shared/types/PhoneDetails';
import styles from './ProductDetails.module.scss';
import homeIcon from '../../img/icons/Home_icon.svg';
import rightArrow from '../../img/icons/right_arrow.svg';
import leftArrow from '../../img/icons/Chevron (Arrow Right).svg';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { Loader } from '../../widgets/Loader';
// import { GlobalContext } from '../../shared/utils/GlobalProvider';
// import { PrimaryButton } from '../../shared/ui/PrimaryButton';
// import { IconButton } from '../../shared/ui/IconButton';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const [productDetail, setProductDetail] = useState<PhoneDetails | null>(null);
  const [isLoad, setIsLoad] = useState(true);
  const [
    productColor, setProductColor,
  ] = useState(location.pathname.split('-').at(-1));

  const imgUrl = `${BASE_URL_IMG}${productDetail?.images[0]}`;
  const productId = location.pathname
    .split('/')[2].split('-').slice(0, -1).join('-');

  useEffect(() => {
    getPhoneById(`${productId}-${productColor}`)
      .then((data) => setProductDetail(data))
      .catch(error => {
        throw error;
      })
      .finally(() => setIsLoad(false));
  }, [productId, productColor]);

  // const changeProductColor = useCallback((color: string) => {
  //   setIsLoad(true);
  //   setProductColor(color);
  //   console.log(color, productColor);
  // }, [productColor]);

  const changeProductColor = (color: string) => {
    if (color === productColor) {
      return;
    }

    setIsLoad(true);
    setProductColor(color);

    console.log(color, productColor);
  };

  // const {
  //   cart,
  //   addCartItem,
  //   deleteCartItem,
  //   favourites,
  //   addFavouriteItem,
  //   deleteFavouriteItem,
  // } = useContext(GlobalContext);

  return isLoad
    ? (<Loader />)
    : (
      <div className={styles.product_details}>
        <div className={styles.product_details__top}>
          <div className={styles.product_details__path}>
            <img className={styles.icon} src={homeIcon} alt="Home icon" />

            <img
              className={styles.icon}
              src={rightArrow}
              alt="Rigth arrow icon"
            />

            <span className={styles.span}>Phones</span>

            <img
              className={styles.icon}
              src={rightArrow}
              alt="Rigth arrow icon"
            />

            <span className={styles.span}>
              {productDetail?.name}
            </span>
          </div>

          <button className={styles.goback_button} type="button">
            <img
              className={styles.icon}
              src={leftArrow}
              alt="Rigth arrow icon"
            />
            Back
          </button>
        </div>

        <section className={styles.section_image}>
          <h1 className={styles.section_image__title}>{productDetail?.name}</h1>

          <article className={styles.product}>
            <div className={styles.product__image_wrapper}>
              <img
                className={styles.product_main_image}
                src={imgUrl}
                alt="Product"
              />
            </div>

            <ul className={styles.product__list}>
              {productDetail?.images.map(image => (
                <li key={image} className={styles.product__item}>
                  <button
                    className={styles.product__button}
                    type="button"
                  >
                    <img
                      className={styles.product__image}
                      src={`${BASE_URL_IMG}${image}`}
                      alt="Product"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <article className={styles.product__info}>
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
                      // className={styles.color__item}
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
                  {productDetail?.capacityAvailable.map(capacity => (
                    <li key={capacity} className={styles.capacity__item}>
                      <button type="button" className={styles.capacity__button}>
                        {capacity}
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
                  {/* <PrimaryButton />
                  <IconButton /> */}
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
          </article>
        </section>

        <div className={styles.product_details__section_wrapper}>
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
      </div>
    );
};
