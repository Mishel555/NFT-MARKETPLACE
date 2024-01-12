import { ILightRGB } from '@constants/types';

const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = (rgb: ILightRGB) =>
  componentToHex(rgb.red) + componentToHex(rgb.green) + componentToHex(rgb.blue);

export const hexToRgba = (hex: string, value: number) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
    value,
  } : {
    red: 0,
    green: 0,
    blue: 0,
    value,
  };
};
