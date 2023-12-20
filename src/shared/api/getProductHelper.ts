import { getData } from '../helpers/fetchClient';
import { Product, ProductDetails } from '../types/Product';
import { getAccById } from './accessories';
import { getPhoneById } from './phones';
import { getTabletById } from './tablets';

export const getDetailsHelper = (path: string) => {
  const itemType = path.split('/').at(1);
  const itemId = path.split('/').at(2);

  return getData<ProductDetails>(`/${itemType}/details/${itemId}`);
};

export const getProductById = (productType: string, productId: string) => {
  switch (productType) {
    case 'ipad':
      return getTabletById(productId);
    case 'watch':
      return getAccById(productId);
    case 'iphone':
    default:
      return getPhoneById(productId);
  }
};

export const getNewestProducts = () => getData<Product[]>('/new');
export const getDiscountProducts = () => getData<Product[]>('/discount');
export const getSuggestedProducts = () => getData<Product[]>('/recommended');
