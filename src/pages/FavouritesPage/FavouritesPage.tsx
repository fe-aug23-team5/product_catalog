import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { ProductCard } from '../../entities/ProductCard';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import favoriteIcon from '../../shared/static/favorite.png';
import { Product } from '../../shared/types/Product';
import { getProductById } from '../../shared/api/getProductHelper';
import { Loader } from '../../widgets/Loader';
import { FetchError } from '../../shared/ui/FetchError/FetchError';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(GlobalContext);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const [favorProducts, setFavorProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  const fetchFavorProducts = async () => {
    try {
      const detailedProducts = await Promise.all(
        favourites.map(async (item) => {
          const productType = item.itemId.split('-').at(1) || 'iphone';
          const productDetails
            = await getProductById(productType, item.itemId);

          return productDetails;
        }),
      );

      setFavorProducts(detailedProducts);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorProducts();

    if (favourites.length > 0) {
      fetchFavorProducts();
    } else {
      setFavorProducts([]);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  const handleRetry = () => {
    setError(false);
    fetchFavorProducts();
  };

  return (
    <div className={styles.favpage_container}>
      <div className={styles.favpage_container__top}>
        <div className={styles.favpage_container__path}>
          <Breadcrumbs />
        </div>

        <h1 className={styles.favpage_container__title}>
          Favorites
        </h1>
      </div>

      {error && (
        <div className={styles.favpage_container__error}>
          <FetchError onClick={handleRetry} />
        </div>
      )}

      {isLoading && <Loader />}

      {!error && favourites.length > 0 && (
        favorProducts.map(item => (
          <ProductCard
            key={item.itemId}
            product={item}
            link={item.category}
          />
        )))}

      {!error && !isLoading && favourites.length === 0 && (
        <div className={styles.block}>
          <div className={styles.icon}>
            <img
              src={favoriteIcon}
              alt="favorite icon"
              className={styles.icon_favorites}
            />
          </div>

          <p className={styles.title_first}>
            Favorites are empty here
          </p>

          <p className={styles.title_secondary}>
            {'But it\'s never too late to fix it :)'}
          </p>

          <div className={styles.button}>
            <PrimaryButton
              defaultTitle="Go to Home page"
              defaultAction={navigateToHome}
            />
          </div>
        </div>
      )}
    </div>
  );
};
