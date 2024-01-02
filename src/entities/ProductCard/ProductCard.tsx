import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.scss';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Product } from '../../shared/types/Product';
import { scrollToTop } from '../../shared/helpers/scrollFunct';

type Props = {
  product: Product;
  link: string;
};

export const ProductCard: React.FC<Props> = ({ product, link }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isIconActive, setIsIconActive] = useState(false);
  const {
    cart,
    addCartItem,
    deleteCartItem,
    favourites,
    addFavouriteItem,
    deleteFavouriteItem,
  } = useContext(GlobalContext);

  useEffect(() => {
    const isPhoneInCart = cart.some((item) => item.itemId === product.itemId);

    setIsButtonActive(isPhoneInCart);
  }, [cart, cart.length, product.itemId]);

  useEffect(() => {
    const isInLiked = favourites.some((item) => item.itemId === product.itemId);

    setIsIconActive(isInLiked);
  }, [favourites, favourites.length, product.itemId]);

  const handleAddToCart = () => {
    addCartItem(product.itemId);
  };

  const handleDeleteFromCart = () => {
    deleteCartItem(product.itemId);
  };

  const handleAddToLikes = () => {
    addFavouriteItem(product.itemId);
  };

  const handleDeleteFromLikes = () => {
    deleteFavouriteItem(product.itemId);
  };

  return (
    <article className={classes.card}>
      <div>
        <Link
          to={`/${link}/${product.itemId}`}
          replace
          onClick={scrollToTop}
        >
          <img
            className={classes.photo}
            src={`${BASE_URL_IMG}${product.image}`}
            alt="Product preview"
          />
        </Link>

        <h3 className={classes.header}>{product.name}</h3>
      </div>

      <div>
        <p className={classes.price}>
          <span className={classes.actual}>{`$${product.price}`}</span>
          <span className={classes.preliminary}>{`$${product.fullPrice}`}</span>
        </p>

        <div className={classes.line} />

        <div className={classes.information}>
          <p className={classes.block}>
            <span className={classes.text}>Screen</span>
            <span className={classes.value}>{product.screen}</span>
          </p>

          <p className={classes.block}>
            <span className={classes.text}>Capacity</span>
            <span className={classes.value}>{product.capacity}</span>
          </p>

          <p className={classes.block}>
            <span className={classes.text}>RAM</span>
            <span className={classes.value}>{product.ram}</span>
          </p>
        </div>

        <div className={classes.block}>
          <div className={classes.button}>
            <PrimaryButton
              isActive={isButtonActive}
              defaultAction={handleAddToCart}
              activeAction={handleDeleteFromCart}
              defaultTitle="Add to cart"
              activeTitle="Added"
            />
          </div>
          <IconButton
            isActive={isIconActive}
            defaultAction={handleAddToLikes}
            activeAction={handleDeleteFromLikes}
          />
        </div>
      </div>
    </article>
  );
};
