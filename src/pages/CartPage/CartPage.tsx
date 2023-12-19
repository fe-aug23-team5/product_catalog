import React, { useContext, useEffect, useState } from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';
import { BackButton } from '../../shared/ui/BackButton';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { getPhoneById } from '../../shared/api/phones';
import { PhoneDetails } from '../../shared/types/PhoneDetails';
import { Loader } from '../../widgets/Loader';

export const CartPage: React.FC = () => {
  const { cart } = useContext(GlobalContext);
  const [cartPhones, setCartPhones] = useState<PhoneDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartPhones = async () => {
      try {
        const detailedPhones = await Promise.all(
          cart.map(async (item) => {
            const phoneDetails = await getPhoneById(item.itemId);

            return phoneDetails;
          }),
        );

        setCartPhones(detailedPhones);
      } catch (error) {
        throw new Error(`Error fetching phone details: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchCartPhones();
    } else {
      setCartPhones([]);
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
        <OrderCard phones={cartPhones} />
      )}
    </div>
  );
};
