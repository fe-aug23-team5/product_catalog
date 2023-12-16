import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import logo from '../../shared/static/logo.svg';
import closeIcon from '../../shared/static/icons/close-icon.svg';
import heartLikeIcon from '../../shared/static/icons/heart-outlined.svg';
import basketIcon from '../../shared/static/icons/cart.svg';
import { NavBar } from '../../features/NavBar';

type Props = {
  isShownMenu: boolean;
  openMenu: (value: boolean) => void;
};

export const BurgerMenu: React.FC<Props> = ({
  isShownMenu,
  openMenu,
}) => {
  const isActiveIcon = ({ isActive }: { isActive: boolean }) => {
    return cn(styles.bottom__link, { [styles.bottom__link_active]: isActive });
  };

  return (
    <aside
      id="menu"
      className={cn(styles.aside, {
        [styles.active]: isShownMenu,
      })}
    >
      <div className={styles.aside__top}>
        <NavLink className={styles.logo} to="/">
          <img
            className={styles.icon}
            src={logo}
            alt="Nice Gadgets logo"
          />
        </NavLink>

        <button
          onClick={() => openMenu(false)}
          className={styles.close_menu_button}
          type="button"
        >
          <img
            className={styles.icon}
            src={closeIcon}
            alt="Close icon"
          />
        </button>
      </div>

      <div className={styles.wrapper}>
        <NavBar openMenu={openMenu} />

        <div className={styles.aside__bottom}>
          <NavLink className={isActiveIcon} to="/favourites">
            <img
              className={styles.icon}
              src={heartLikeIcon}
              alt="Heart like icon"
            />
          </NavLink>

          <NavLink className={isActiveIcon} to="/cart">
            <img
              className={styles.icon}
              src={basketIcon}
              alt="Basket icon"
            />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
