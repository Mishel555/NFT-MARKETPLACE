import { ReactNode, useRef, useMemo, useCallback, useState } from 'react';
import { DeviceManageContext } from '@contexts/DeviceManageContext';
import { copyObject, convertFront, convertBack, mergeDeep } from '@utils';
import { IDevicesType } from '@constants/types';
import DEFAULT_DEVICES from '@constants/devices';
import api from '@services/api';

interface IPropTypes {
  children?: ReactNode;
}

const DeviceManageProvider = ({ children }: IPropTypes) => {
  const devices = useRef<IDevicesType[]>(copyObject(DEFAULT_DEVICES));
  const [selectedDevice, setSelectedDevice] = useState<number[] | null>(null);
  const [renderState, setRenderState] = useState<number>(0);
  const [selectedActuation, setSelectedActuation] = useState<number[] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadSuccess = (): void => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  };

  const selectDevice = useCallback((scriptId?: number, deviceId?: number, valueId?: number): void => {
    if (scriptId !== undefined && deviceId !== undefined) {
      const preview = [scriptId, deviceId];

      // valueId cannot be a float, example valueId between 0 and 1 is 0.5 (this is empty area)
      if (valueId !== undefined && valueId % 1 === 0) {
        preview.push(valueId);
      }
      setSelectedDevice(preview);
    } else {
      setSelectedDevice(null);
    }
  }, []);

  const selectActuation = useCallback((scriptId: number, deviceId: number, valueId?: number): void => {
    if (valueId !== undefined) {
      setSelectedActuation([scriptId, deviceId, valueId]);
    } else {
      setSelectedActuation(null);
    }
  }, []);

  const saveDevices = useCallback(() => {
    if (devices.current) {
      return convertFront(devices.current);
    }
  }, []);

  const revertData = useCallback(() => {
    devices.current = DEFAULT_DEVICES;
    setSelectedDevice(null);
    setSelectedActuation(null);
    setRenderState(prevState => prevState + 1);
    setIsLoaded(false);
  }, []);

  const loadData = useCallback(async (artId: string) => {
    try {
      const { data } = await api.art.getSingle(artId);

      if (data.actuations.length) {
        devices.current =
          mergeDeep(
            { data: copyObject(DEFAULT_DEVICES) },
            { data: convertBack(data.actuations) },
          ).data as IDevicesType[];

        setRenderState(prevState => prevState + 1);
      }

      loadSuccess();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const contextValue = useMemo(() => ({
    devices: devices.current,
    selectedDevice,
    selectedActuation,
    isLoaded,
    setSelectedDevice: selectDevice,
    setSelectedActuation: selectActuation,
    saveDevices,
    revertValues: revertData,
    renderState,
    loadData,
  }), [
    devices,
    selectedDevice,
    selectedActuation,
    isLoaded,
    selectDevice,
    selectActuation,
    saveDevices,
    revertData,
    renderState,
    loadData,
  ]);

  return (
    <DeviceManageContext.Provider value={contextValue}>
      {children}
    </DeviceManageContext.Provider>
  );
};

export default DeviceManageProvider;
