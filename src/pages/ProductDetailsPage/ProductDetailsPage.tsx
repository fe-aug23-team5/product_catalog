import React, { useEffect, useState } from 'react';
import { getPhoneById } from '../../shared/api/phones';
import { PhoneDetails } from '../../shared/types/PhoneDetails';

export const ProductDetailsPage: React.FC = () => {
  const [productDetail, setProductDetail] = useState<PhoneDetails | null>(null);

  // eslint-disable-next-line no-console
  console.log(productDetail);

  useEffect(() => {
    getPhoneById('apple-iphone-7-32gb-black')
      .then((data) => setProductDetail(data));
  }, []);

  return (
    <h1>ProductDetailsPage</h1>
  );
};
