import { Phone } from '../types/Phone';
import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';

export const getAllPhones = () => getData<ServerResponce>('/phones');
export const getAllPhonesWithParams = (searchParams:string) => getData<ServerResponce>(`/phones?${searchParams}`);
// to access detailed phone data use phoneId object field
// (smth like that apple-iphone-7-32gb-black)
export const getPhoneById = (phoneId: string) => getData<Phone>(`/phones/${phoneId}`);
export const getNewestPhones = () => getData<Phone[]>('/phones/new');
export const getSuggestedPhones = () => getData<Phone[]>('/phones/suggested');
