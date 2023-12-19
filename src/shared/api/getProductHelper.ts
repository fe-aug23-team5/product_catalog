import { getData } from '../helpers/fetchClient';
import { Product } from '../types/Product';
import { getAccById, getAccDetailsById } from './accessories';
import { getPhoneById, getPhoneDetailsById } from './phones';
import { getTabletById, getTabletDetailsById } from './tablets';

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

export const getProductDetailsById = (
  productType: string,
  productId: string,
) => {
  switch (productType) {
    case 'ipad':
      return getTabletDetailsById(productId);
    case 'watch':
      return getAccDetailsById(productId);
    case 'iphone':
    default:
      return getPhoneDetailsById(productId);
  }
};

export const getNewestProducts = () => getData<Product[]>('/new');
export const getDiscountProducts = () => getData<Product[]>('/discount');
export const getSuggestedProducts = () => getData<Product[]>('/recommended');
