import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';

export const getAllPhones = () => getData<Phone[]>('/phones');
export const getPhoneById = (phoneId: number) => getData<Phone>(`/phones/${phoneId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/suggested');
