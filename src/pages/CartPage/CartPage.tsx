import React, { useContext, useEffect, useState } from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';
import { BackButton } from '../../shared/ui/BackButton';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { Loader } from '../../widgets/Loader';
import { Product } from '../../shared/types/Product';
import { getProductById } from '../../shared/api/getProductHelper';

export const CartPage: React.FC = () => {
  const { cart } = useContext(GlobalContext);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const detailedProducts = await Promise.all(
          cart.map(async (item) => {
            const productType = item.itemId.split('-').at(1) || 'iphone';
            const productDetails
              = await getProductById(productType, item.itemId);

            return productDetails;
          }),
        );

        setCartProducts(detailedProducts);
      } catch (error) {
        throw new Error(`Error fetching phone details: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchCartProducts();
    } else {
      setCartProducts([]);
      setIsLoading(false);
    }
  }, [cart]);

  return (
    <div className={styles.cart_page__container}>
      <div className={styles.cart_page__topbar}>
        <div className={styles.cart_page__back}>
          <BackButton />
        </div>

        <h1 className={styles.cart_page__title}>Cart</h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <OrderCard phones={cartProducts} />
      )}
    </div>
  );
};
