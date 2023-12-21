import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import HomeIcon from '../../static/icons/home.svg';
import RightArrowIcon from '../../static/icons/right-arrow-grey.svg';

type Props = {
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productName = '' }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className={styles.breadcrumbs}>
      <span className={styles.breadcrumbs_link}>
        <Link to="/">
          <img src={HomeIcon} alt="Home" />
        </Link>
      </span>

      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={pathname} className={styles.breadcrumbs_link}>
            {!isLast ? (
              <>
                <img src={RightArrowIcon} alt="Right Arrow" />
                <Link to={routeTo}>
                  {pathname.replace(pathname[0], pathname[0].toUpperCase())}
                </Link>
              </>
            ) : (
              <div className={styles.breadcrumbs_last}>
                <img src={RightArrowIcon} alt="Right Arrow" />
                {productName || pathname}
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
};
