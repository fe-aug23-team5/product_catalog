import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../shared/static/logo.svg';
import { ReactComponent as Favorites }
  from '../../shared/static/icons/heart-outlined.svg';
import { ReactComponent as Cart } from '../../shared/static/icons/cart.svg';
import menuIcon from '../../shared/static/icons/menu.svg';
import { NavBar } from '../../features/NavBar';
import { BurgerMenu } from '../BurgerMenu';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { IconWithCounter } from '../../features/IconWithCounter';

export const Header: React.FC = () => {
  const [isShownMenu, setIsShownMenu] = useState(false);

  const { cart, favourites } = useContext(GlobalContext);

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
        <IconWithCounter
          to="/favourites"
          icon={Favorites}
          count={favourites.length}
        />
        <IconWithCounter
          to="/cart"
          icon={Cart}
          count={cart.length}
        />
      </div>

      <button
        className={styles.header__menu_button}
        onClick={() => {
          openMenu(true);
        }}
        type="button"
      >
        <img src={menuIcon} alt="Menu icon" />
      </button>

      <BurgerMenu isShownMenu={isShownMenu} openMenu={openMenu} />
    </header>
  );
};
