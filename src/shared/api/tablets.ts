import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { Tablet } from '../types/Tablet';
import { TabletDetails } from '../types/TabletDetails';

export const getAllTablets = () => getData<ServerResponce>('/tablets');
export const getAllTabletsWithParams = (searchParams: string) => getData<ServerResponce>(`/tablets?${searchParams}`);
export const getTabletById = (itemId: string) => getData<Tablet>(`/tablets/${itemId}`);
export const getTabletDetailsById = (itemId: string) => getData<TabletDetails>(`/tablets/details/${itemId}`);
