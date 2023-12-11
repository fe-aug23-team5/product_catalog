export interface PhoneDetails {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: string;
  priceDiscount: string;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: PhoneDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

interface PhoneDescription {
  title: string;
  text: string[];
}
