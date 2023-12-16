import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../../shared/types/ModalProps';
import styles from './ModalWindow.module.scss';

export const ModalWindow: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.modal__backdrop}
      onClick={handleBackdropClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={styles.modal__content}>{children}</div>
    </div>,
    modalRoot,
  );
};
