import React, { useContext } from 'react';
import styles from './ProductPriceDetails.module.scss';
import { ProductDetails } from '../../shared/types/Product';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { IconButton } from '../../shared/ui/IconButton';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { TechSpecsPhoneTablet } from '../../shared/types/TechSpecs';
import {
  convertTechDetails, isTechSpecKey,
} from '../../shared/helpers/ConvertTechDetails';

type Props = {
  productDetail: ProductDetails | null;
};

export const ProductPriceDetails: React.FC<Props> = ({ productDetail }) => {
  const {
    cart,
    addCartItem,
    deleteCartItem,
    favourites,
    addFavouriteItem,
    deleteFavouriteItem,
  } = useContext(GlobalContext);

  const isProductInCart = productDetail
    ? cart.some((item) => item.itemId === productDetail.id)
    : false;

  const isProductInFavourites = productDetail
    ? favourites.some((item) => item.itemId === productDetail.id)
    : false;

  const handleAddToCart = () => {
    if (productDetail) {
      addCartItem(productDetail.id);
    }
  };

  const handleDeleteFromCart = () => {
    if (productDetail) {
      deleteCartItem(productDetail.id);
    }
  };

  const handleAddToFavourites = () => {
    if (productDetail) {
      addFavouriteItem(productDetail.id);
    }
  };

  const handleDeleteFromFavourites = () => {
    if (productDetail) {
      deleteFavouriteItem(productDetail.id);
    }
  };

  const TECH_SPECS = Object.values(TechSpecsPhoneTablet);

  return (
    <div className={styles.price}>
      <p className={styles.price__amount}>
        <span className={styles.price__discount}>
          {`$${productDetail?.priceDiscount}`}
        </span>

        <span className={styles.price__regular}>
          {`$${productDetail?.priceRegular}`}
        </span>
      </p>

      <div className={styles.price__buttons}>
        <PrimaryButton
          isActive={isProductInCart}
          defaultAction={handleAddToCart}
          activeAction={handleDeleteFromCart}
          defaultTitle="Add to cart"
          activeTitle="Added"
        />

        <IconButton
          isActive={isProductInFavourites}
          defaultAction={handleAddToFavourites}
          activeAction={handleDeleteFromFavourites}
        />
      </div>

      <div className={styles.details}>
        {TECH_SPECS.slice(0, 4).map((item) => {
          return (
            <p key={item} className={styles.details__text}>
              <span className={styles.details__key}>
                {convertTechDetails(item)}
              </span>

              <span className={styles.details__value}>
                {productDetail !== null && isTechSpecKey(item)
                && productDetail[item]}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
};
