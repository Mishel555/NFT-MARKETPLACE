import { IDevicesType } from './types';

import FragranceSrc from '@assets/videos/effects/fragrances.mp4';
import FogSrc from '@assets/videos/effects/fog.mp4';
import WindSrc from '@assets/videos/effects/wind.mp4';
import FrontRSrc from '@assets/videos/effects/frontR.mp4';
import FrontLSrc from '@assets/videos/effects/frontL.mp4';
import BackLSrc from '@assets/videos/effects/backL.mp4';
import BackRSrc from '@assets/videos/effects/backR.mp4';
import RgbTopSrc from '@assets/videos/effects/rgbTop.mp4';
import RgbBottomSrc from '@assets/videos/effects/rgbBottom.mp4';

export const devicePreviewSources = {
  Fragrances: FragranceSrc,
  Wind: WindSrc,
  Fog: FogSrc,
  RGBBottom: RgbBottomSrc,
  RGBTop: RgbTopSrc,
  FrontR: FrontRSrc,
  FrontL: FrontLSrc,
  BackR: BackRSrc,
  BackL: BackLSrc,
};

export const smellTypes: { id: number; title: string }[] = [
  {
    id: 300,
    title: 'Hypnotic',
  },
  {
    id: 301,
    title: 'Peace',
  },
  {
    id: 302,
    title: 'Smoke',
  },
  {
    id: 303,
    title: 'Ethanol',
  },
  {
    id: 304,
    title: 'Disgust',
  },
  {
    id: 305,
    title: 'Joy',
  },
  {
    id: 306,
    title: 'Energy',
  },
  {
    id: 307,
    title: 'Seduction',
  },
  {
    id: 308,
    title: 'Curiosity',
  },
  {
    id: 309,
    title: 'Flowery',
  },
  {
    id: 310,
    title: 'Bloody',
  },
  {
    id: 311,
    title: 'Yuzu',
  },
  {
    id: 312,
    title: 'Ecstasy',
  },
  {
    id: 313,
    title: 'Caramelized',
  },
  {
    id: 314,
    title: 'Mould',
  },
  {
    id: 315,
    title: 'Talc',
  },
  {
    id: 316,
    title: 'Marine',
  },
  {
    id: 317,
    title: 'Candy',
  },
  {
    id: 318,
    title: 'Mountain',
  },
  {
    id: 319,
    title: 'Forest',
  },
  {
    id: 320,
    title: 'Custom 1',
  },
  {
    id: 321,
    title: 'Custom 2',
  },
  {
    id: 322,
    title: 'Custom 3',
  },
  {
    id: 323,
    title: 'Custom 4',
  },
  {
    id: 324,
    title: 'Custom 5',
  },
  {
    id: 325,
    title: 'Custom 6',
  },
  {
    id: 326,
    title: 'Custom 7',
  },
  {
    id: 327,
    title: 'Custom 8',
  },
  {
    id: 328,
    title: 'Custom 9',
  },
  {
    id: 329,
    title: 'Custom 10',
  },
  {
    id: 330,
    title: 'Custom 11',
  },
  {
    id: 331,
    title: 'Custom 12',
  },
  {
    id: 332,
    title: 'Custom 13',
  },
  {
    id: 333,
    title: 'Custom 14',
  },
  {
    id: 334,
    title: 'Custom 15',
  },
  {
    id: 335,
    title: 'Custom 16',
  },
  {
    id: 336,
    title: 'Custom 17',
  },
  {
    id: 337,
    title: 'Custom 18',
  },
  {
    id: 338,
    title: 'Custom 19',
  },
  {
    id: 339,
    title: 'Custom 20',
  },
  {
    id: 340,
    title: 'Custom 21',
  },
  {
    id: 341,
    title: 'Custom 22',
  },
  {
    id: 342,
    title: 'Custom 23',
  },
  {
    id: 343,
    title: 'Custom 24',
  },
  {
    id: 344,
    title: 'Custom 25',
  },
  {
    id: 345,
    title: 'Custom 26',
  },
  {
    id: 346,
    title: 'Custom 27',
  },
  {
    id: 347,
    title: 'Custom 28',
  },
  {
    id: 348,
    title: 'Custom 29',
  },
  {
    id: 349,
    title: 'Custom 30',
  },
];

const devices: IDevicesType[] = [
  {
    title: 'Effects',
    data: [
      {
        id: 300,
        name: 'Fragrances',
        type: 'smell',
        title: 'Fragrances',
        options: ['type'],
        typeList: smellTypes,
        minDuration: 10,
        scripts: [],
        preview: devicePreviewSources.Fragrances,
      },
      {
        id: 150,
        name: 'Wind',
        type: 'wind',
        title: 'Wind',
        options: ['markIntensity', 'temperature'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.Wind,
      },
      {
        id: 100,
        name: 'Fog',
        type: 'smoke',
        title: 'Fog',
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.Fog,
      },
      {
        id: 250,
        name: 'RGBTop',
        type: 'light',
        title: 'RGB Top',
        options: ['sliderIntensity', 'color'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.RGBTop,
      },
      {
        id: 251,
        name: 'RGBBottom',
        type: 'light',
        title: 'RGB Bottom',
        options: ['sliderIntensity', 'color'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.RGBBottom,
      },
    ],
  },
  {
    title: 'Lights',
    data: [
      {
        id: 200,
        name: 'Front R',
        type: 'light',
        title: 'Front R',
        options: ['sliderIntensity', 'color'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.FrontR,
      },
      {
        id: 201,
        name: 'Front L',
        type: 'light',
        title: 'Front L',
        options: ['sliderIntensity', 'color'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.FrontL,
      },
      {
        id: 202,
        name: 'Back R',
        type: 'light',
        title: 'Back R',
        options: ['sliderIntensity', 'color'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.BackR,
      },
      {
        id: 203,
        name: 'Back L',
        type: 'light',
        title: 'Back L',
        options: ['sliderIntensity', 'color'],
        minDuration: 1,
        scripts: [],
        preview: devicePreviewSources.BackL,
      },
    ],
  },
];

export default devices;
