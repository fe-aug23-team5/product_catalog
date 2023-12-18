import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { ProductCard } from '../../entities/ProductCard';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import favorites from '../../shared/static/favorite.png';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(GlobalContext);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.favpage_container}>
      <div className={styles.favpage_container__top}>
        <div className={styles.favpage_container__path}>
          <Breadcrumbs />
        </div>

        <h1 className={styles.favpage_container__title}>
          Favourites
        </h1>
      </div>

      {favourites.length
        ? (
          favourites.map(item => {
            return (
              <ProductCard
                key={item.itemId}
                product={item}
                link={item.category}
              />
            );
          })
        )
        : (
          <>
            <div className={styles.block}>
              <div className={styles.icon}>
                <img
                  src={favorites}
                  alt="Favorites"
                  className={styles.icon_favorites}
                />
              </div>

              <p className={styles.title_first}>
                Favorites is empty here
              </p>

              <p className={styles.title_secondary}>
                {'But it\'s never too late to fix it :)'}
              </p>

              <div className={styles.button}>
                <PrimaryButton
                  defaultTitle="Go to Home"
                  defaultAction={navigateToHome}
                />
              </div>
            </div>
          </>
        )}
    </div>
  );
};
