import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { AccessoryDetails } from '../types/AccessoryDetails';

export const getAllAcc = () => getData<ServerResponce>('/accessories');
export const getAllAccWithParams = (searchParams: string) => getData<ServerResponce>(`/accessories?${searchParams}`);
export const getAccById = (itemId: string) => getData<AccessoryDetails>(`/accessories/${itemId}`);
export const getAccDetailsById = (itemId: string) => getData<AccessoryDetails>(`/accessories/details/${itemId}`);
