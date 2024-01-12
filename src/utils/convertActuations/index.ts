import DEFAULT_DEVICES from '@constants/devices';
import { IDevicesType, IData } from '@constants/types';
import { copyObject } from '../index';

interface DataType {
  actuations: {
    time: number;
    devices: {
      id: number;
      state: string;
      type: string;
      value?: number; // intensity 'value' more comfortable than 'intensity' for devices
    }[];
  }[];
}

// Convert front part data structure to back part structure.
export const convertFront = (actuations: IDevicesType[]) => {
  if (actuations) {
    let seconds: number[] = [];
    const data: DataType = {
      actuations: [],
    };

    actuations?.forEach((device: IDevicesType) => {
      const currentFilledDevice = device.data.filter(device => device.scripts.length !== 0);
      currentFilledDevice.forEach(device => {
        device.scripts.forEach(script => {
          seconds.push(...script.values);
        });
      });
    });
    seconds = Array.from(new Set(seconds)).sort();

    seconds.forEach(second => data.actuations.push({
      time: second,
      devices: [],
    }));

    seconds.forEach(second => {
      actuations?.forEach(device => {
        const currentFilledDevice = device.data.filter(device => device.scripts.length !== 0);
        currentFilledDevice.forEach(device => {
          device.scripts.forEach(script => {
            if (script.values[0] === second) {
              data.actuations.forEach(actuation => {
                if (actuation.time === second) {
                  const temp = copyObject(script);
                  delete temp.values;

                  if (device.name === 'Fragrances') {
                    actuation.devices.push({
                      id: script.typeId,
                      name: device.name,
                      state: 'on',
                      ...temp,
                    });
                  } else {
                    actuation.devices.push({
                      id: device.id,
                      name: device.name,
                      state: 'on',
                      ...temp,
                    });
                  }
                }
              });
            } else if (script.values[1] === second) {
              data.actuations.forEach(actuation => {
                if (actuation.time === second) {
                  const temp = copyObject(script);
                  delete temp.values;

                  if (device.name === 'Fragrances') {
                    actuation.devices.push({
                      id: script.typeId,
                      name: device.name,
                      state: 'off',
                      ...temp,
                    });
                  } else {
                    actuation.devices.push({
                      id: device.id,
                      name: device.name,
                      state: 'off',
                      ...temp,
                    });
                  }
                }
              });
            }
          });
        });
      });
    });

    return data;
  } else {
    return [];
  }
};

// Convert actuations back part structure to front part structure.
export const convertBack = (data: Array<IData>): Array<IDevicesType> => {
  const map = new Map();
  data.sort((a, b) => (
    a.time - b.time
  ));

  data.forEach((value) => {
    value.devices.forEach((device) => {
      if (!map.has(device.name)) {
        map.set(device.name, {
          title: '',
          data: [{
            id: device.name === 'Fragrances' ? 300 : device.id,
            type: device.type,
            name: device.name,
            scripts: [],
          }],
        });
      }

      if (device.state === 'on') {
        map.get(device.name)?.data[0].scripts.push({
          values: [value.time],
          ...(device.temperature && {
            temperature: device.temperature,
          }),
          ...(device.color && {
            color: device.color,
          }),
          // intensity ( 'value' more comfortable than 'intensity' for devices )
          ...(device.value && {
            value: device.value,
          }),
          ...(device.type && {
            type: device.type,
          }),
          ...(device.typeId && {
            typeId: device.typeId,
          }),
        });
      } else {
        const { data: [{ scripts }] } = map.get(device.name) as IDevicesType;

        scripts[scripts.length - 1].values.push(value.time);
      }
    });
  });

  const newData: Array<IDevicesType> = [
    {
      title: 'Effects',
      data: [],
    },
    {
      title: 'Lights',
      data: [],
    },
  ];

  DEFAULT_DEVICES.forEach((group, groupIndex) => {
    group.data.forEach((data) => {
      const device = map.get(data.name);
      newData[groupIndex].data.push(
        device?.data?.[0] ?? data,
      );
    });
  });

  return newData;
};
