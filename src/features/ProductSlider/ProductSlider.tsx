import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.scss';
import classNames from 'classnames';

interface Props {
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

export const ProductSlider: React.FC<Props> = ({ children }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: (
      <SamplePrevArrow
        isDisabled={false}
        onClick={() => {}}
      />
    ),
    nextArrow: (
      <SampleNextArrow
        isDisabled={false}
        onClick={() => {}}
      />
    ),
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
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
