import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';
import { PhoneDetails } from '../types/PhoneDetails';

export const getAllPhones = () => getData<Phone[]>('/phones');
// to access detailed phone data use phoneId object field
// (smth like that apple-iphone-7-32gb-black)
export const getPhoneById = (phoneId: string) => getData<PhoneDetails>(`/phones/${phoneId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/suggested');
