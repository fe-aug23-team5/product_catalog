import React, { useContext } from 'react';
import styles from './FavouritesPage.module.scss';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { ProductCard } from '../../entities/ProductCard';
import { PageTitle } from '../../shared/ui/PageTitle';
import favorites from '../../shared/static/favorite.png';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(GlobalContext);

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.favpage_container}>
      <div className={styles.favpage_container_title}>
        <PageTitle>Favourites</PageTitle>
      </div>

      {favourites.length
        ? (
          favourites.map(item => {
            return (<ProductCard key={item.phoneId} phone={item} />);
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
