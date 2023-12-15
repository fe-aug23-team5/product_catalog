import React, { useContext } from 'react';
import styles from './FavouritesPage.module.scss';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { ProductCard } from '../../entities/ProductCard';
import { PageTitle } from '../../shared/ui/PageTitle';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(GlobalContext);

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
            <p className={styles.favpage_container_empty}>
              It is empty here
            </p>
          </>
        )}
    </div>
  );
};
