import React from 'react';
import classes from './ProductCard.module.scss';
import img from '../../img/phones/apple-iphone-7/silver/00.jpg';

export const ProductCard: React.FC = () => {
  return (
    <>
      <article className={classes.card}>
        <img
          className={classes.photo}
          src={img}
          alt="Phone card"
        />

        <h3 className={classes.header}>Apple iPhone Xs 64GB Silver (iMT9G2FS/A)</h3>

        <p className={classes.price}>
          <span className={classes.actual}>$799</span>
          <span className={classes.preliminary}>$899</span>
        </p>

        <div className={classes.line} />

        <div className={classes.information}>
          <p className={classes.block}>
            <span className={classes.text}>Screen</span>
            <span className={classes.value}>5.8” OLED</span>
          </p>

          <p className={classes.block}>
            <span className={classes.text}>Capacity</span>
            <span className={classes.value}>64 GB</span>
          </p>

          <p className={classes.block}>
            <span className={classes.text}>RAM</span>
            <span className={classes.value}>4 GB</span>
          </p>
        </div>
      </article>
    </>
  );
};
