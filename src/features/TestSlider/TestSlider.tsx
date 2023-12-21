/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './TestSlider.scss';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../../entities/ProductCard';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';

type Props = {
  products: Product[];
  heading: string;
};

export const TestSlider: React.FC<Props> = ({ products, heading }) => {
  const [index, setIndex] = useState(0);

  const slide = (): number => {
    return window.innerWidth < 1200 ? 253 : 288;
  };

  const disableNextButton = () => {
    const screenWidth = window.innerWidth < 1200 ? window.innerWidth : 1200;
    const maxIndex = Math.max(
      0,
      products.length - Math.floor(screenWidth / slide()),
    );

    return maxIndex;
  };

  useEffect(() => {
    window.addEventListener('resize', slide);

    return () => {
      window.removeEventListener('resize', slide);
    };
  }, []);

  const updateIndex = (i: number) => {
    setIndex(i);
  };

  return (
    <div className="container">
      <div className="slider">
        <div className="slider__buttons">
          <SecondaryTitle>{heading}</SecondaryTitle>

          <div className="buttons_wrapper">
            <button
              onClick={() => updateIndex(index - 1)}
              className={cn('previous button', {
                disable: index === 0,
              })}
              type="button"
              disabled={index === 0}
            />

            <button
              onClick={() => updateIndex(index + 1)}
              className={cn('next button', {
                disable: index === disableNextButton(),
              })}
              type="button"
              disabled={index === disableNextButton()}
            />
          </div>
        </div>

        <div
          className="slider__box"
          style={{
            transform: `translateX(-${index * slide()}px)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="wrapper">
              <ProductCard product={product} link={product.category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
