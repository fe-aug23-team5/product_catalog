import React from 'react';
import classes from './ProductCard.module.scss';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Phone } from '../../shared/types/Phone';
// import { GlobalContext } from '../../shared/utils/GlobalProvider';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  // const { addCartItem, deleteCartItem } = useContext(GlobalContext);

  // const handleAddToButton = () => {
  //   addCartItem(phone);
  // };

  // const handleRemoveButton = () => {
  //   deleteCartItem(phone.phoneId);
  // };

  return (
    <article className={classes.card}>
      <div>
        <img
          className={classes.photo}
          src={`${BASE_URL_IMG}${phone.image}`}
          alt="Phone card"
        />

        <h3 className={classes.header}>
          {phone.name}
        </h3>
      </div>

      <div>
        <p className={classes.price}>
          <span className={classes.actual}>{`$${phone.fullPrice}`}</span>
          <span className={classes.preliminary}>{`$${phone.price}`}</span>
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

        <p className={classes.block}>
          <div className={classes.button}>
            <PrimaryButton />
          </div>
          <IconButton />
        </p>
      </div>
    </article>
  );
};
