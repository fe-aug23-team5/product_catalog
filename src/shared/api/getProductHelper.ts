/* eslint-disable max-len */
import { getData } from '../helpers/fetchClient';
import { Product } from '../types/Product';
import { getAccById, getAccDetailsById } from './accessories';
import { getPhoneById, getPhoneDetailsById } from './phones';
import { getTabletById, getTabletDetailsById } from './tablets';

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

export const getProductDetailsById = (productType: string, productId: string) => {
  switch (productType) {
    case 'iphone':
      return getPhoneDetailsById(productId);
    case 'ipad':
      return getTabletDetailsById(productId);
    case 'watch':
      return getAccDetailsById(productId);
    default:
      return getPhoneDetailsById(productId);
  }
};

export const getNewestProducts = () => getData<Product[]>('/new');
export const getDiscountProducts = () => getData<Product[]>('/discount');
export const getSuggestedProducts = () => getData<Product[]>('/recommended');
