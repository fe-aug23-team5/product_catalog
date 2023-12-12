import React from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
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
  return (
    <aside
      className={classNames(styles.aside, {
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

        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <Link
          onClick={() => setIsShownMenu(false)}
          className={styles.close_icon}
          to=""
        >
          <img
            className={styles.icon}
            src={closeIcon}
            alt="Close icon"
          />
        </Link>
      </div>

      <div className={styles.wrapper}>
        <NavBar />

        <div className={styles.aside__bottom}>
          <NavLink className={styles.bottom__link} to="/favourites">
            <img
              className={styles.icon}
              src={heartLikeIcon}
              alt="Heart like icon"
            />
          </NavLink>

          <NavLink className={styles.bottom__link} to="/carts">
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
