import React, { useContext, useEffect, useState } from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';
import { BackButton } from '../../shared/ui/BackButton';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { Loader } from '../../widgets/Loader';
import { Product } from '../../shared/types/Product';
import { getProductById } from '../../shared/api/getProductHelper';
import { FetchError } from '../../shared/ui/FetchError/FetchError';

export const CartPage: React.FC = () => {
  const { cart } = useContext(GlobalContext);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

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
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();

    if (cart.length > 0) {
      fetchCartProducts();
    } else {
      setCartProducts([]);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleRetry = () => {
    setError(false);
    fetchCartProducts();
  };

  return (
    <div className={styles.cart_page__container}>
      <div className={styles.cart_page__topbar}>
        <div className={styles.cart_page__back}>
          <BackButton />
        </div>

        <h1 className={styles.cart_page__title}>Cart</h1>
      </div>

      {error && (
        <div className={styles.cart_page__fetcherror}>
          <FetchError onClick={handleRetry} />
        </div>
      )}

      {isLoading && <Loader />}

      {!error && !isLoading && (
        <OrderCard phones={cartProducts} />
      )}
    </div>
  );
};
