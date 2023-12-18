import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PhotosSlider.scss';
import { Link } from 'react-router-dom';

export const PhotosSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrow: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="photo-slider__container">
      <Slider {...settings} className="photo-slider__slider">
        <div>
          <Link to="/phones">
            <div className="photo__item" />
          </Link>
        </div>
        <div>
          <Link to="/phones">
            <div className="photo__item" />
          </Link>
        </div>
        <div>
          <Link to="/phones">
            <div className="photo__item" />
          </Link>
        </div>
      </Slider>
    </div>
  );
};
