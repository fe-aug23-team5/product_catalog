import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../shared/static/logo.svg';
import upArrow from '../../shared/static/icons/up-arrow-black.svg';
import styles from './Footer.module.scss';

enum NavTitle {
  GITHUB = 'github',
  CONTACTS = 'contacts',
  RIGHTS = 'rights',
}

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

          <button
            className={styles.back_to_top__icon}
            type="button"
            onClick={scrollToTop}
          >
            <img
              className={styles.footer__icon}
              src={upArrow}
              alt="Back to top button"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
