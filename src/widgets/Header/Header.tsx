import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../temporary_img/Logo.svg';
import { ReactComponent as Favorites } from '../../temporary_img/Favourites (Heart Like).svg'
import { ReactComponent as Cart } from '../../temporary_img/Shopping bag (Cart).svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__leftSide}>
        <a href="#" className={styles.header__logo}>
          <Logo />
        </a>
        <nav className={styles.nav}>
          <a href="#" className={styles.nav__item__active}>Home</a>
          <a href="#" className={styles.nav__item}>Phones</a>
          <a href="#" className={styles.nav__item}>Tablets</a>
          <a href="#" className={styles.nav__item}>Accessories</a>
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
