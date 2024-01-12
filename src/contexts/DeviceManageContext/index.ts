import { createContext } from 'react';
import { IDeviceContext } from '@constants/types';

export const DeviceManageContext = createContext<IDeviceContext>({
  selectedDevice: null,
  selectedActuation: null,
  isLoaded: false,
  renderState: 0,
  devices: [{
    title: 'Initial',
    data: [
      {
        id: 0,
        name: 'InitialScript',
        options: ['type'],
        type: 'initial',
        title: 'initial',
        minDuration: 1,
        scripts: [{
          values: [0, 0],
          value: 1,
        }],
      },
    ],
  }],
  setSelectedDevice: () => {},
  setSelectedActuation: () => {},
  saveDevices: () => {},
  revertValues: () => {},
  loadData: () => {},
});
