import { getData } from '../helpers/fetchClient';
import { ServerResponce } from '../types/ServerResponse';
import { TabletDetails } from '../types/TabletDetails';

export const getAllTablets = () => getData<ServerResponce>('/tablets');
export const getAllTabletsWithParams = (searchParams: string) => getData<ServerResponce>(`/tablets?${searchParams}`);
export const getTabletById = (itemId: string) => getData<TabletDetails>(`/tablets/${itemId}`);
