import React, { useContext } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import logo from '../../shared/static/logo.svg';
import closeIcon from '../../shared/static/icons/close-icon.svg';
import { ReactComponent as Favorites }
  from '../../shared/static/icons/heart-outlined.svg';
import { ReactComponent as Cart } from '../../shared/static/icons/cart.svg';
import { NavBar } from '../../features/NavBar';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { IconWithCounter } from '../../features/IconWithCounter';

type Props = {
  isShownMenu: boolean;
  openMenu: (value: boolean) => void;
};

export const BurgerMenu: React.FC<Props> = ({ isShownMenu, openMenu }) => {
  const { cart, favourites } = useContext(GlobalContext);

  return (
    <aside
      id="menu"
      className={cn(styles.aside, {
        [styles.active]: isShownMenu,
      })}
    >
      <div className={styles.aside__top}>
        <NavLink className={styles.logo} to="/">
          <img className={styles.icon} src={logo} alt="Nice Gadgets logo" />
        </NavLink>

        <button
          onClick={() => openMenu(false)}
          className={styles.close_menu_button}
          type="button"
        >
          <img className={styles.icon} src={closeIcon} alt="Close icon" />
        </button>
      </div>

      <div className={styles.wrapper}>
        <NavBar openMenu={openMenu} />

        <div className={styles.aside__bottom}>
          <IconWithCounter
            to="/favourites"
            icon={Favorites}
            count={favourites.length}
            onClick={() => openMenu(false)}
          />
          <IconWithCounter
            to="/cart"
            icon={Cart}
            count={cart.length}
            onClick={() => openMenu(false)}
          />
        </div>
      </div>
    </aside>
  );
};
