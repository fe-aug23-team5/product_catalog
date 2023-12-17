import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.scss';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Phone } from '../../shared/types/Phone';
import { GlobalContext } from '../../shared/utils/GlobalProvider';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
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
    const isPhoneInCart = cart.some((item) => item.phoneId === phone.phoneId);

    setIsButtonActive(isPhoneInCart);
    // eslint-disable-next-line
  }, [cart.length]);

  useEffect(() => {
    const isInLiked = favourites.some((item) => item.phoneId === phone.phoneId);

    setIsIconActive(isInLiked);
    // eslint-disable-next-line
  }, [favourites.length]);

  const handleAddToCart = () => {
    addCartItem(phone);
  };

  const handleDeleteFromCart = () => {
    deleteCartItem(phone.phoneId);
  };

  const handleAddToLikes = () => {
    addFavouriteItem(phone);
  };

  const handleDeleteFromLikes = () => {
    deleteFavouriteItem(phone.phoneId);
  };

  return (
    <article className={classes.card}>
      <Link to={`/phones/${phone.phoneId}`} replace>
        <div>
          <img
            className={classes.photo}
            src={`${BASE_URL_IMG}${phone.image}`}
            alt="Phone card"
          />
        </div>

        <h3 className={classes.header}>{phone.name}</h3>
      </Link>

      <div>
        <p className={classes.price}>
          <span className={classes.actual}>{`$${phone.price}`}</span>
          <span className={classes.preliminary}>{`$${phone.fullPrice}`}</span>
        </p>

        <div className={classes.line} />

        <div className={classes.information}>
          <p className={classes.block}>
            <span className={classes.text}>Screen</span>
            <span className={classes.value}>{phone.screen}</span>
          </p>

          <p className={classes.block}>
            <span className={classes.text}>Capacity</span>
            <span className={classes.value}>{phone.capacity}</span>
          </p>

          <p className={classes.block}>
            <span className={classes.text}>RAM</span>
            <span className={classes.value}>{phone.ram}</span>
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
