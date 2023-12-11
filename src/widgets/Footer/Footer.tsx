import React from 'react';
import logo from '../../img/icons/Logo.svg';
import rightArrowIcon from '../../img/icons/right_arrow.svg';
import styles from './Footer.module.scss'; 

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles.logo} href="#home">
        <img
          className={styles.logo__icon}
          src={logo}
          alt="Nice Gadgets logo"
        />
      </a>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <a
              className={styles.nav__link}
              href="github"
            >
              Github
            </a>
          </li>

          <li className={styles.nav__item}>
            <a
              className={styles.nav__link}
              href="contacts"
            >
              Contacts
            </a>
          </li>

          <li className={styles.nav__item}>
            <a
              className={styles.nav__link}
              href="rights"
            >
              Rights
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.back_to_top}>
        <p className={styles.back_to_top__discription}>
          Back to top
        </p>

        <a className={styles.back_to_top__icon} href="#home">
          <img
            className={styles.footer__icon}
            src={rightArrowIcon}
            alt="Back to top button"
          />
        </a>
      </div>
    </footer>
  );
};
