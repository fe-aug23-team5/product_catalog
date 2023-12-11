import React from 'react';
import styles from './BurgerMenu.module.scss';
import logo from '../../img/icons/Logo.svg';
import closeIcon from '../../img/icons/close_icon.svg';
import heartLikeIcon from '../../img/icons/Favourites (Heart Like).svg'
import basketIcon from '../../img/icons/Shopping bag (Cart).svg';

export const BurgerMenu: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.aside__top}>
        <a className={styles.logo} href='/home'>
          <img className={styles.icon} src={logo} alt='Nice Gadgets logo' />
        </a>

        <a className={styles.close_icon} href='/home'>
          <img className={styles.icon} src={closeIcon} alt='Close icon' />
        </a>
      </div>

      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a className={styles.nav__link} href='github'>
                Home
              </a>
            </li>

            <li className={styles.nav__item}>
              <a className={styles.nav__link} href='contacts'>
                Phones
              </a>
            </li>

            <li className={styles.nav__item}>
              <a className={styles.nav__link} href='rights'>
                Tablets
              </a>
            </li>

            <li className={styles.nav__item}>
              <a className={styles.nav__link} href='rights'>
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.aside__bottom}>
          <a className={styles.bottom__link} href='/favorite'>
            <img
              className={styles.icon}
              src={heartLikeIcon}
              alt='Heart like icon'
            />
          </a>

          <a className={styles.bottom__link} href='/bascet'>
            <img
              className={styles.icon}
              src={basketIcon}
              alt='Basket icon'
            />
          </a>
        </div>
      </div>
    </aside>
  );
};
