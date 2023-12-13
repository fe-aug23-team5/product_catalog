import React from 'react';
import classes from './ProductCard.module.scss';
import img from '../../img/phones/apple-iphone-7/silver/00.jpg';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { Phone } from '../../shared/types/Phone';
// import { GlobalContext } from '../../shared/utils/GlobalProvider';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  // const { addCartItem, deleteCartItem } = useContext(GlobalContext);
  // console.log(phone.image);
  // console.log(`../../${phone.image}`);

  // const handleAddToButton = () => {
  //   addCartItem(phone);
  // };

  // const handleRemoveButton = () => {
  //   deleteCartItem(phone.phoneId);
  // };

  return (
    <article className={classes.card}>
      {/* handle issue with images
      when passing {phone.image} it is not connecting img
      even the path is the same as  */}
      <div>
        <img
          className={classes.photo}
          src={img}
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
          {/* add props text on Default,
          text on active
          is active will be passed as a prop also
          functions on change default
          on change when active
          create container for button to handle it width (80% from containe) */}
          {/* <button
            type="button"
            onClick={handleAddToButton}
          >
            Addd to cart
          </button>

          <button
            type="button"
            onClick={handleRemoveButton}
          >
            delete from local storage
          </button> */}
          <div className={classes.button}>
            <PrimaryButton />
          </div>
          <IconButton />
        </p>
      </div>
    </article>
  );
};
