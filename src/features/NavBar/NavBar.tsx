import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './NavBar.module.scss';

enum NavTitles {
  HOME = 'home',
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
}

export const NavBar: React.FC = () => {
  const isActiveItem = ({ isActive } : { isActive: boolean }) => {
    return cn(styles.nav__link, { [styles.nav__link_active]: isActive });
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {Object.values(NavTitles).map(title => (
          <li className={styles.nav__item} key={title}>
            <NavLink
              to={title === NavTitles.HOME ? '/' : `/${title}`}
              className={isActiveItem}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
