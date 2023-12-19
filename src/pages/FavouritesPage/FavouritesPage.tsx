import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FavouritesPage.module.scss';
import { GlobalContext } from '../../shared/utils/GlobalProvider';
import { ProductCard } from '../../entities/ProductCard';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import favoriteIcon from '../../shared/static/favorite.png';
import { ProductDetails } from '../../shared/types/Product';
import { getProductById } from '../../shared/api/getProductHelper';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(GlobalContext);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const [favorProducts, setFavorProducts] = useState<ProductDetails[]>([]);
  const [setIsLoading] = useState<boolean>(true);

  // console.log('favorProducts', favorProducts);

  useEffect(() => {
    const fetchFavorProducts = async () => {
      try {
        const detailedProducts = await Promise.all(
          favourites.map(async (item) => {
            const productType = item.itemId.split('-').at(1) || 'iphone';
            // eslint-disable-next-line max-len
            const productDetails = await getProductById(productType, item.itemId);

            return productDetails;
          }),
        );

        setFavorProducts(detailedProducts);
      } catch (error) {
        throw new Error(`Error fetching phone details: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (favourites.length > 0) {
      fetchFavorProducts();
    } else {
      setFavorProducts([]);
      setIsLoading(false);
    }
  }, [favourites]);

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

      {favourites.length
        ? (
          favorProducts.map(item => {
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
