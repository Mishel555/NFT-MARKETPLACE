import { Fragment, useEffect, useState } from 'react';
import { IntensityRangeTypes } from '@constants/types';
import { useDeviceManage } from '@hooks';
import Slider from './Slider';
import Marker from './Marker';

interface IPropTypes {
  type: IntensityRangeTypes;
  forceRender: () => void;
}

const IntensityRange = ({
  type,
  forceRender,
}: IPropTypes) => {
  const deviceManager = useDeviceManage();
  const data = deviceManager.devices;
  const [deviceId, scriptId, valueId] = deviceManager.selectedActuation || [];
  const currentDevice = data ? data[deviceId]?.data[scriptId]?.scripts[valueId] : undefined;

  const [intensity, setIntensity] = useState<number>(1);

  const changeIntensity = (data: number[]): void => {
    setIntensity(data[0]);
  };

  const afterIntensityChange = (): void => {
    if (currentDevice) {
      if (currentDevice.value !== undefined) {
        currentDevice.value = intensity; // 'value' more comfortable than 'intensity' for devices
      } else if (currentDevice.color !== undefined) {
        currentDevice.color.value = intensity;
      }

      forceRender();
    }
  };

  useEffect(() => {
    if (currentDevice) {
      if (currentDevice.value !== undefined) {
        setIntensity(currentDevice.value);
      } else if (currentDevice.color !== undefined) {
        setIntensity(currentDevice.color.value);
      }
    }
  }, [currentDevice]);

  return (
    <Fragment>
      {(() => {
        switch (type) {
          case 'slider':
            return (
              <Slider
                intensity={intensity}
                changeIntensity={changeIntensity}
                afterIntensityChange={afterIntensityChange}
              />
            );
          case 'marker':
            return (
              <Marker
                intensity={intensity}
                changeIntensity={changeIntensity}
                afterIntensityChange={afterIntensityChange}
              />
            );
        }
      })()
      }
    </Fragment>
  );
};

export default IntensityRange;
