import React, { useContext, useEffect, useState } from 'react';
import { OrderCard } from '../../entities/OrderCard';
import styles from './CartPage.module.scss';
import { BackButton } from '../../shared/ui/BackButton';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { getPhoneById } from '../../shared/api/phones';
import { PhoneDetails } from '../../shared/types/PhoneDetails';

export const CartPage: React.FC = () => {
  const { cart } = useContext(GlobalContext);
  const [cartPhones, setCartPhones] = useState<PhoneDetails[]>([]);

  useEffect(() => {
    const fetchCartPhones = async () => {
      try {
        const detailedPhones = await Promise.all(
          cart.map(async (item) => {
            const phoneDetails = await getPhoneById(item.phoneId);

            return phoneDetails;
          }),
        );

        setCartPhones(detailedPhones);
      } catch (error) {
        throw new Error(`Error fetching phone details: ${error}`);
      }
    };

    if (cart.length > 0) {
      fetchCartPhones();
    } else {
      setCartPhones([]);
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

      <OrderCard phones={cartPhones} />
    </div>
  );
};
