/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../img/icons/Logo.svg';
import { ReactComponent as Favorites } from '../../img/icons/Favourites (Heart Like).svg';
import { ReactComponent as Cart } from '../../img/icons/Shopping bag (Cart).svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__leftSide}>
        <a href="#" className={styles.header__logo}>
          <Logo />
        </a>
        <nav className={styles.nav}>
          <a href="#" className={styles.nav__item__active}>
            Home
          </a>
          <a href="#" className={styles.nav__item}>
            Phones
          </a>
          <a href="#" className={styles.nav__item}>
            Tablets
          </a>
          <a href="#" className={styles.nav__item}>
            Accessories
          </a>
        </nav>
      </div>
      <div className={styles.header__rightSide}>
        <a href="#" className={styles.icon__item}>
          <Favorites />
        </a>
        <a href="#" className={styles.icon__item}>
          <Cart />
        </a>
      </div>
    </header>
  );
};
