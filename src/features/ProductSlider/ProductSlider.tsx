import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick-theme.css';
import { ProductCard } from '../../entities/ProductCard';
import styles from './ProductSlider.module.scss';

export const ProductSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Product Slider</h1>
        <div className={styles.buttons}>
          <button type="button" className="button">
            b1
          </button>
          <button type="button" className="button">
            b2
          </button>
        </div>
      </div>
      <Slider {...settings} className={styles.slider}>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
        <div className={styles.item}>
          <ProductCard />
        </div>
      </Slider>
    </div>
  );
};
