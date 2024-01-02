import React, { useContext, useState } from 'react';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { CartTotalProps } from '../../shared/types/CartTotalProps';
import styles from './CartTotal.module.scss';
import { ModalWindow } from '../../features/ModalWindow';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { removeScrollForBody } from '../../shared/helpers/removeScrollForBody';

export const CartTotal: React.FC<CartTotalProps> = ({
  calculateTotalPrice,
  calculateTotalItems,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { clearCart } = useContext(GlobalContext);

  const handleModalOpen = () => {
    removeScrollForBody(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    removeScrollForBody(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.cart__total_container}>
        <div className={styles.cart__total_box}>
          <p className={styles.cart__total_price}>
            {`$${calculateTotalPrice()}`}
          </p>

          <p className={styles.cart__total_items_length}>
            {`Total for ${calculateTotalItems()} items`}
          </p>
        </div>

        <div className={styles.cart__total_break_line} />

        <PrimaryButton
          defaultAction={handleModalOpen}
          defaultTitle="Checkout"
        />
      </div>

      {isModalOpen && (
        <ModalWindow onClose={closeModal}>
          <div className={styles.modal__wrapper}>
            <h2 className={styles.modal__text}>
              Checkout is not implemented yet.
              <br />
              Do you want to clear the Cart?
            </h2>
            <div className={styles.button__container}>
              <PrimaryButton
                defaultAction={clearCart}
                defaultTitle="Confirm"
                additionalStyles={{
                  height: '48px',
                }}
              />
              <PrimaryButton
                defaultAction={closeModal}
                defaultTitle="Cancel"
                additionalStyles={{
                  backgroundColor: '#89939a',
                  border: '1px solid #89939a',
                  height: '48px',
                }}
              />
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
};
