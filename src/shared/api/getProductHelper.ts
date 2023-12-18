import { getData } from '../helpers/fetchClient';
import { Product } from '../types/Product';
import { getAccById } from './accessories';
import { getPhoneById } from './phones';
import { getTabletById } from './tablets';

export const getProductById = (productType: string, productId: string) => {
  switch (productType) {
    case 'iphone':
      return getPhoneById(productId);
    case 'ipad':
      return getTabletById(productId);
    case 'watch':
      return getAccById(productId);
    default:
      return getPhoneById(productId);
  }
};

export const getNewestProducts = () => getData<Product[]>('/new');
export const getDiscountProducts = () => getData<Product[]>('/discount');
export const getSuggestedProducts = () => getData<Product[]>('/recommended');
