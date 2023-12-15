import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { PhoneDetails } from '../types/PhoneDetails';

export const getAllPhones = () => getData<ServerResponce>('/phones');
// to access detailed phone data use phoneId object field
// (smth like that apple-iphone-7-32gb-black)
export const getPhoneById = (phoneId: string) => getData<PhoneDetails>(`/phones/${phoneId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getDiscountPhones = () => getData<Phone[]>('/phones/discount');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/recommended');
