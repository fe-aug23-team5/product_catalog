import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../img/icons/Logo.svg';
import {
  ReactComponent as Favorites,
} from '../../img/icons/Favourites (Heart Like).svg';
import {
  ReactComponent as Cart,
} from '../../img/icons/Shopping bag (Cart).svg';
import { ReactComponent as MenuIcon } from '../../img/icons/Menu.svg';
import { NavBar } from '../../features/NavBar';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Header: React.FC = () => {
  const [isShownMenu, setIsShownMenu] = useState(false);
  const isActiveIcon = ({ isActive }: { isActive: boolean }) => {
    return cn(styles.icon__item, { [styles.icon__item_active]: isActive });
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__leftSide}>
        <NavLink to="/" className={styles.header__logo}>
          <Logo />
        </NavLink>

        <div className={styles.header__nav_wrap}>
          <NavBar />
        </div>
      </div>

      <div className={styles.header__rightSide}>
        <NavLink to="/favourites" className={isActiveIcon}>
          <Favorites />
        </NavLink>

        <NavLink to="/cart" className={isActiveIcon}>
          <Cart />
        </NavLink>
      </div>

      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <Link
        to=""
        className={styles.header__menu_button}
        onClick={() => {
          setIsShownMenu(!isShownMenu);
        }}
      >
        <MenuIcon />
      </Link>

      <BurgerMenu
        isShownMenu={isShownMenu}
        setIsShownMenu={setIsShownMenu}
      />
    </header>
  );
};
