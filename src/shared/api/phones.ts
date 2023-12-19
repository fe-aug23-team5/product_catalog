import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { PhoneDetails } from '../types/PhoneDetails';
import { Phone } from '../types/Phone';

export const getAllPhones = () => getData<ServerResponce>('/phones');
export const getAll = () => getData<Phone[]>('/phones');
export const getAllPhonesWithParams = (searchParams: string) => getData<ServerResponce>(`/phones?${searchParams}`);
export const getPhoneById = (itemId: string) => getData<Phone>(`/phones/${itemId}`);
export const getPhoneDetailsById = (itemId: string) => getData<PhoneDetails>(`/phones/details/${itemId}`);
