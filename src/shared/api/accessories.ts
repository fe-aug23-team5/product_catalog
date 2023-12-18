import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { PhoneDetails } from '../types/PhoneDetails';

export const getAllAcc = () => getData<ServerResponce>('/accessories');
export const getAllAccWithParams = (searchParams: string) => getData<ServerResponce>(`/accessories?${searchParams}`);
export const getAccById = (itemId: string) => getData<PhoneDetails>(`/accessories/${itemId}`);
