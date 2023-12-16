import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../shared/static/logo.svg';
import {
  ReactComponent as Favorites,
} from '../../shared/static/icons/heart-outlined.svg';
import {
  ReactComponent as Cart,
} from '../../shared/static/icons/cart.svg';
import menuIcon from '../../shared/static/icons/menu.svg';
import { NavBar } from '../../features/NavBar';
import { BurgerMenu } from '../BurgerMenu';

export const Header: React.FC = () => {
  const [isShownMenu, setIsShownMenu] = useState(false);

  const isActiveIcon = ({ isActive }: { isActive: boolean }) => {
    return cn(styles.icon__item, { [styles.icon__item_active]: isActive });
  };

  const openMenu = (value: boolean) => {
    const body = document.querySelector('body') as HTMLElement;

    if (value) {
      body.classList.add(styles.disable_scroll);
    } else {
      body.classList.remove(styles.disable_scroll);
    }

    setIsShownMenu(value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__leftSide}>
        <NavLink to="/" className={styles.header__logo}>
          <Logo />
        </NavLink>

        <div className={styles.header__nav_wrap}>
          <NavBar openMenu={setIsShownMenu} />
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
          openMenu(true);
        }}
        type="button"
      >
        <img
          src={menuIcon}
          alt="Menu icon"
        />
      </button>

      <BurgerMenu
        isShownMenu={isShownMenu}
        openMenu={openMenu}
      />
    </header>
  );
};
