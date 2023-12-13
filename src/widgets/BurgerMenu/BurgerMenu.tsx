import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import logo from '../../img/icons/Logo.svg';
import closeIcon from '../../img/icons/close_icon.svg';
import heartLikeIcon from '../../img/icons/Favourites (Heart Like).svg';
import basketIcon from '../../img/icons/Shopping bag (Cart).svg';
import { NavBar } from '../../features/NavBar';

type Props = {
  isShownMenu: boolean;
  setIsShownMenu: (value: boolean) => void;
};

export const BurgerMenu: React.FC<Props> = ({
  isShownMenu,
  setIsShownMenu,
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
          onClick={() => setIsShownMenu(false)}
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
        <NavBar setIsShownMenu={setIsShownMenu} />

        <div className={styles.aside__bottom}>
          <NavLink className={isActiveIcon} to="/favourites">
            <img
              className={styles.icon}
              src={heartLikeIcon}
              alt="Heart like icon"
            />
          </NavLink>

          <NavLink className={isActiveIcon} to="/carts">
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
