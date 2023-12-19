import { ProductDetails } from '../types/Product';
import { TechSpecsAccessory, TechSpecsPhoneTablet } from '../types/TechSpecs';

export const convertTechDetails = (value: string) => {
  if (value === 'ram') {
    return 'RAM';
  }

  if (value === 'capacity') {
    return 'Built in memory';
  }

  return value.replace(value[0], value[0].toUpperCase());
};

export const isTechSpecKey = (key: string): key is keyof ProductDetails => (
  Object.values(TechSpecsPhoneTablet).includes(key as TechSpecsPhoneTablet)
  || Object.values(TechSpecsAccessory).includes(key as TechSpecsAccessory)
);
