import { ChangeEvent, useState } from 'react';
import { useDeviceManage } from '@hooks';
import style from './style.module.scss';

const TempSelector = () => {
  const deviceManager = useDeviceManage();
  const data = deviceManager.devices;
  const [deviceId, scriptId, valueId] = deviceManager.selectedActuation || [];
  const currentDevice = data ? data[deviceId]?.data[scriptId]?.scripts[valueId] : undefined;

  const [temperature, setTemperature] = useState<string>(currentDevice?.temperature || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTemperature(e.target.value);
    if (currentDevice) {
      currentDevice.temperature = e.target.value;
    }
  };

  return (
    <div className={style.root}>
      <div>
        <input id="1" type="radio" value="cold" onChange={handleChange} checked={temperature === 'cold'} />
        <label htmlFor="1">Cold</label>
      </div>
      <div>
        <input id="2" type="radio" value="hot" onChange={handleChange} checked={temperature === 'hot'} />
        <label htmlFor="2">Hot</label>
      </div>
    </div>
  );
};

export default TempSelector;
