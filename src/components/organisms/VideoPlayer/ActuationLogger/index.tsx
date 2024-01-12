import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormatSeconds } from '@hooks';
import { convertBack, copyObject, objectEquals } from '@utils';
import api from '@services/api';
import { IActuationType, IData, IDevicesType, ILightRGB, IScriptType } from '@constants/types';
import devices, { smellTypes } from '@constants/devices';

import styles from './style.module.scss';

interface IProps {
  currentTime: number;
  actuations: IActuationType[] | IDevicesType[];
  actuationType: 'back' | 'front';
  sendToDevices?: boolean;
  isPlayed?: boolean;
}

interface ITempLog extends IScriptType {
  id: number;
  type: string;
  name: string;
  state: 'on' | 'off';
  value?: number;
}

interface ITempDevice extends IScriptType {
  id: number;
  type: string;
  name: string;
}

interface IConfigedInfo {
  id: number;
  name: string;
  type: string;
  color?: ILightRGB;
  value?: number;
  state?: string;
}

const ActuationLogger = ({
  isPlayed,
  actuations,
  currentTime,
  actuationType,
  sendToDevices,
}: IProps) => {
  const tempLog = useRef<ITempLog[]>([]);
  const [runDevices, setRunDevices] = useState<string[]>([]);

  const sendData = useCallback((data: unknown) => {
    api.devices.updateDevice(data);
  }, []);

  const offAllDevices = useCallback((initial: boolean): void => {
    const tempDevices: ITempLog[] = [];

    devices.forEach(deviceGroup => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      deviceGroup.data.forEach(device => tempDevices.push({
        id: device.id,
        name: device.name,
        type: device.type,
        state: 'off',
      }));
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    smellTypes.forEach(smell => tempDevices.push({
      id: smell.id,
      name: 'Fragrances',
      type: 'smell',
      state: 'off',
    }));

    if (initial) {
      sendData(tempDevices);
    } else {
      sendData(tempDevices);
    }

    tempLog.current = [];
    setRunDevices([]);
  }, [sendData]);

  const detectDevice = useCallback(() => {
    const tempActuations: ITempDevice[] = [];
    let temp: string[] = [];

    if (actuationType === 'back') {
      convertBack(actuations as unknown as Array<IData>).forEach(deviceGroup => {
        deviceGroup.data.forEach(device => {
          device.scripts.forEach(script => {
            tempActuations.push({
              ...(device.name === 'Fragrances' && script.typeId ? {
                id: script.typeId,
              } : {
                id: device.id,
              }),
              type: device.type,
              name: device.name,
              ...script,
            });
          });
        });
      });
    } else {
      actuations.forEach(deviceGroup => {
        const group = deviceGroup as IDevicesType;

        group.data.forEach(device => {
          device.scripts.forEach((script: IScriptType) => {
            const updatedScript = copyObject(script);
            tempActuations.push({
              ...(device.name === 'Fragrances' && script.typeId ? {
                id: script.typeId,
              } : {
                id: device.id,
              }),
              type: device.type,
              name: device.name,
              ...updatedScript,
            });
          });
        });
      });
    }

    if (isPlayed) {
      tempActuations.forEach(actuation => {
        if (actuation.values[0] < currentTime && actuation.values[1] > currentTime) {
          temp.push(actuation.name);
        }
      });
    } else {
      temp = [];
    }

    const data: ITempLog[] = [];
    if (sendToDevices && isPlayed) {
      tempActuations.forEach(actuation => {
        if (actuation.values[0] < currentTime && actuation.values[1] > currentTime) {
          const logIndex = tempLog.current.findIndex(log => log.name === actuation.name);
          const log: ITempLog = {
            ...actuation,
            state: 'on',
          };

          if (logIndex > -1) {
            const offIndex = tempLog.current.findIndex(log => log.name === actuation.name && log.state === 'off');

            if (offIndex > -1) {
              tempLog.current.splice(logIndex, 1, log);
              data.push(log);
            }
          } else {
            tempLog.current.push(log);
            data.push(log);
          }
        } else {
          const log: ITempLog = {
            ...actuation,
            state: 'off',
          };
          const onIndex = tempLog.current.findIndex(log => log.name === actuation.name && log.state === 'on' && log.id === actuation.id);

          if (onIndex > -1) {
            if (tempLog.current[onIndex].values[0] > currentTime || tempLog.current[onIndex].values[1] < currentTime) {
              tempLog.current.splice(onIndex, 1, log);
              data.push(log);
            }
          }
        }
      });
    }

    if (!objectEquals(temp, runDevices)) {
      setRunDevices([...temp]);

      if (sendToDevices) {
        const configedData: IConfigedInfo[] = [];

        data.forEach(data => {
          const info: IConfigedInfo = {
            name: data.name,
            type: data.type,
            state: data.state,
            ...(data.color && {
              color: data.color,
            }),
            ...(data.value && {
              value: data.value,
            }),
            ...(data.name === 'Fragrances' && data.typeId ? {
              id: data.typeId,
            } : {
              id: data.id,
            }),
          };

          configedData.push(info);
        });

        if (configedData.length) {
          sendData(configedData);
        }
      }
    }
  }, [actuationType, actuations, currentTime, sendToDevices, isPlayed, runDevices, sendData]);

  useEffect(() => {
    detectDevice();
  }, [currentTime, detectDevice]);

  useEffect(() => () => {
    if (sendToDevices && !isPlayed) {
      offAllDevices(false);
    }
  }, [offAllDevices, sendToDevices, isPlayed]);

  useEffect(() => {
    if (sendToDevices) {
      offAllDevices(true);
    }
  }, [sendToDevices, offAllDevices]);

  return (
    <div className={styles.root}>
      <div className={styles.seconds_block}>
        <label className={styles.seconds_block__title}>
          Log:
        </label>
        <span className={styles.seconds_block__seconds}>
          {useFormatSeconds(currentTime)}
        </span>
      </div>
      <div>
        {runDevices.map((device, index) => (
          <div key={index} className={styles.log_block}>
            <label className={styles.log_block__device_name}>
              {device}:
            </label>
            <span className={styles.log_block__device_status}>
              Run
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActuationLogger;
