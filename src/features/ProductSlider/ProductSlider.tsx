import React, { ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Slider from 'react-slick';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.scss';
import classNames from 'classnames';

interface SliderCustomProps {
  children: ReactNode;
}

interface ArrowProps {
  onClick?: () => void;
  isDisabled: boolean;
}

function SamplePrevArrow(props: ArrowProps) {
  const { onClick, isDisabled } = props;
  const classes = classNames('arrow arrow-left', { disabled: isDisabled });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={isDisabled ? undefined : onClick} className={classes} />
  );
}

function SampleNextArrow(props: ArrowProps) {
  const { onClick, isDisabled } = props;
  const classes = classNames('arrow arrow-right', { disabled: isDisabled });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={isDisabled ? undefined : onClick} className={classes} />
  );
}

export const ProductSlider: React.FC<SliderCustomProps> = ({ children }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: (
      <SampleNextArrow
        isDisabled={false}
        onClick={() => {}}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        isDisabled={false}
        onClick={() => {}}
      />
    ),
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <div className="slider-container__header">
        <h1 className="slider-container__title">Product Slider</h1>
      </div>
      <Slider {...settings} className="slider-container__slider">
        {children}
      </Slider>
    </div>
  );
};

SamplePrevArrow.defaultProps = {
  onClick: () => {},
};

SampleNextArrow.defaultProps = {
  onClick: () => {},
};
