import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { PhoneDetails } from '../types/PhoneDetails';

export const getAllPhones = () => getData<ServerResponce>('/phones');
export const getAllPhonesWithParams = (searchParams: string) => getData<ServerResponce>(`/phones?${searchParams}`);
export const getPhoneById = (itemId: string) => getData<PhoneDetails>(`/phones/${itemId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getDiscountPhones = () => getData<Phone[]>('/phones/discount');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/recommended');
