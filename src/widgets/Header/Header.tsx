/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../img/icons/Logo.svg';
import { ReactComponent as Favorites } from '../../img/icons/Favourites (Heart Like).svg';
import { ReactComponent as Cart } from '../../img/icons/Shopping bag (Cart).svg';

export const Header: React.FC = () => {
  const isActiveItem = ({ isActive }: { isActive: boolean }) => {
    return cn(styles.nav__item, { [styles.nav__item_active]: isActive });
  };

  const isActiveIcon = ({ isActive }: { isActive: boolean }) => {
    return cn(styles.icon__item, { [styles.icon__item_active]: isActive });
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__leftSide}>
        <NavLink to="/" className={styles.header__logo}>
          <Logo />
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" className={isActiveItem}>
            Home
          </NavLink>
          <NavLink to="/phones" className={isActiveItem}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={isActiveItem}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={isActiveItem}>
            Accessories
          </NavLink>
        </nav>
      </div>
      <div className={styles.header__rightSide}>
        <NavLink to="/favourites" className={isActiveIcon}>
          <Favorites />
        </NavLink>
        <NavLink to="/cart" className={isActiveIcon}>
          <Cart />
        </NavLink>
      </div>
    </header>
  );
};
