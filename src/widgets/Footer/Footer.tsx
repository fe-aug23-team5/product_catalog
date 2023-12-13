import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/icons/Logo.svg';
import upArrow from '../../img/icons/up_arrow.svg';
import styles from './Footer.module.scss';

enum NavTitle {
  GITHUB = 'github',
  CONTACTS = 'contacts',
  RIGHTS = 'rights',
}

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a className={styles.logo} href="/">
          <img
            className={styles.logo__icon}
            src={logo}
            alt="Nice Gadgets logo"
          />
        </a>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {Object.values(NavTitle).map(title => (
              <li className={styles.nav__item} key={title}>
                <Link
                  className={styles.nav__link}
                  to={`/${title}`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.back_to_top}>
          <p className={styles.back_to_top__discription}>
            Back to top
          </p>

          <a className={styles.back_to_top__icon} href="/">
            <img
              className={styles.footer__icon}
              src={upArrow}
              alt="Back to top button"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
