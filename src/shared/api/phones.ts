import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { PhoneDetails } from '../types/PhoneDetails';

export const getAllPhones = () => getData<ServerResponce>('/phones');
export const getAllPhonesWithParams = (searchParams: string) => getData<ServerResponce>(`/phones?${searchParams}`);
// export const getPhonesWithParams = (searchParams: SearchParams) => getData<ServerResponce>(`/phones?${searchParams}`);
export const getPhoneById = (phoneId: string) => getData<PhoneDetails>(`/phones/${phoneId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getDiscountPhones = () => getData<Phone[]>('/phones/discount');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/recommended');

// type SearchParams = {
//   sortBy: string;
//   page: number;
//   perPage: number;
// };
