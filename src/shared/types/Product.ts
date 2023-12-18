import { Accessory } from './Accessory';
import { AccessoryDetails } from './AccessoryDetails';
import { Phone } from './Phone';
import { PhoneDetails } from './PhoneDetails';
import { Tablet } from './Tablet';
import { TabletDetails } from './TabletDetails';

export type Product = Phone | Tablet | Accessory;

export type ProductDetails = PhoneDetails | TabletDetails | AccessoryDetails;
