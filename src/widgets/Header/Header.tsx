import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../img/icons/Logo.svg';
import {
  ReactComponent as Favorites,
} from '../../img/icons/Favourites (Heart Like).svg';
import {
  ReactComponent as Cart,
} from '../../img/icons/Shopping bag (Cart).svg';
import menuIcon from '../../img/icons/Menu.svg';
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
          <NavBar setIsShownMenu={setIsShownMenu} />
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

      <button
        className={styles.header__menu_button}
        onClick={() => {
          setIsShownMenu(true);
        }}
        type="button"
      >
        <img
          src={menuIcon}
          alt="Menu icon"
          // className={styles.open_menu_button}
        />
      </button>

      <BurgerMenu
        isShownMenu={isShownMenu}
        setIsShownMenu={setIsShownMenu}
      />
    </header>
  );
};
