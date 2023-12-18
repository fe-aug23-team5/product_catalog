import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { PhoneDetails } from '../types/PhoneDetails';

export const getAllPhones = () => getData<ServerResponce>('/phones');
export const getAllPhonesWithParams = (searchParams: string) => getData<ServerResponce>(`/phones?${searchParams}`);
export const getPhoneById = (phoneId: string) => getData<PhoneDetails>(`/phones/${phoneId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getDiscountPhones = () => getData<Phone[]>('/phones/discount');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/recommended');

export const getAllTablets = () => getData<ServerResponce>('/tablets');
export const getTabletById = (itemId: string) => getData<PhoneDetails>(`/tablets/${itemId}`);

export const getAllAcc = () => getData<ServerResponce>('/accesories');
export const getAccById = (itemId: string) => getData<PhoneDetails>(`/accesories/${itemId}`);

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
