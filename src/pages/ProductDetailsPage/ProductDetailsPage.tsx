import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ProductDetails.module.scss';
import { getProductDetailsById } from '../../shared/api/getProductHelper';
import { BASE_URL_IMG } from '../../shared/helpers/fetchClient';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { Loader } from '../../widgets/Loader';
import { YouMayAlsoLike } from '../../widgets/YouMayAlsoLike';
import { BackButton } from '../../shared/ui/BackButton';
import { ProductDetails } from '../../shared/types/Product';
import { GalleryProductDetails } from '../../features/GalleryProductDetails';
import { ProductColorsDetails } from '../../features/ProductColorsDetails';
import { ProductCapacityDetails } from '../../features/ProductCapacityDetails';
import { ProductPriceDetails } from '../../features/ProductPriceDetails';
import { ProductTechDetails } from '../../features/ProductTechDetails';
import { ProductAboutDetails } from '../../features/ProductAboutDetails';

export const ProductDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [
    productDetail, setProductDetail,
  ] = useState<ProductDetails | null>(null);
  const [productImage, setProductImage] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [capacity, setCapacity] = useState(productDetail?.capacity);
  const [productColor, setProductColor] = useState(
    location.pathname.split('-').at(-1),
  );
  const [productType] = useState(
    location.pathname.split('-').at(1) || 'iphone',
  );

  useEffect(() => {
    setIsLoad(true);

    getProductDetailsById(productType, `${location.pathname.split('/')[2]}`)
      .then((data) => {
        setProductDetail(data);
        setProductImage(`${BASE_URL_IMG}${data.images[0]}`);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsLoad(false));
  }, [capacity, productColor, productType, location.pathname]);

  const changeProductColor = (color: string) => {
    if (color === productColor) {
      return;
    }

    const productId = location.pathname
      .split('/')[2]
      .split('-')
      .slice(0, -1)
      .join('-');

    setIsLoad(true);
    setProductColor(color);

    if (productType === 'iphone') {
      navigate(`/phones/${productId}-${color}`);
    } else if (productType === 'ipad') {
      navigate(`/tablets/${productId}-${color}`);
    } else if (productType === 'watch') {
      navigate(`/accessories/${productId}-${color}`);
    }
  };

  const changeCapacity = (value: string) => {
    if (value === capacity) {
      return;
    }

    const regex = /^[1-9]\d*(gb|tb|mm)$/i;
    const productId = location.pathname
      .split('/')[2]
      .split('-')
      .slice(0, -1)
      .join('-')
      .split('-')
      .map((item) => (regex.test(item) ? value : item))
      .join('-');

    setIsLoad(true);
    setCapacity(value);
    if (productType === 'iphone') {
      navigate(`/phones/${productId}-${location.pathname.split('-').at(-1)}`);
    } else if (productType === 'ipad') {
      navigate(`/tablets/${productId}-${location.pathname.split('-').at(-1)}`);
    } else if (productType === 'watch') {
      navigate(`/accessories/${productId}-${location.pathname.split('-').at(-1)}`);
    }
    // navigate(`/phones/${productId}-${location.pathname.split('-').at(-1)}`);
  };

  return isLoad ? (
    <Loader />
  ) : (
    <div className={styles.product_details}>
      <div className={styles.block_top}>
        <div className={styles.bread_crumbs}>
          <Breadcrumbs productName={productDetail?.name} />
        </div>

        <div className={styles.goback_button}>
          <BackButton />
        </div>

        <h1 className={styles.section_image__title}>{productDetail?.name}</h1>
      </div>

      <GalleryProductDetails
        productDetail={productDetail}
        productImage={productImage}
        setProductImage={setProductImage}
      />

      <section className={styles.block_info}>
        <article className={styles.block_info__information}>
          <ProductColorsDetails
            productDetail={productDetail}
            productColor={productColor}
            changeProductColor={changeProductColor}
          />

          <ProductCapacityDetails
            productDetail={productDetail}
            changeCapacity={changeCapacity}
          />

          <ProductPriceDetails productDetail={productDetail} />
        </article>
      </section>

      <section className={styles.block_about}>
        <ProductAboutDetails productDetail={productDetail} />
      </section>

      <section className={styles.block_tech}>
        <ProductTechDetails
          productDetail={productDetail}
          productType={productType}
        />
      </section>

      <section className={styles.recommended}>
        <YouMayAlsoLike />
      </section>
    </div>
  );
};
