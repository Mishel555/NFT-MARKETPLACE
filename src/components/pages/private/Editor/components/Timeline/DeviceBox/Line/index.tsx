import { forwardRef, useCallback, useEffect, useState, SyntheticEvent } from 'react';
import { Range } from 'react-range';
import { useVideoManage, useDeviceManage } from '@hooks';
import { ILightRGB } from '@constants/types';
import { copyObject } from '@utils';
import { initialOptions } from '@components/pages/private/Editor';
import { CloseIcon, Mark } from '@components/icons';
import ActuationRemove from '@components/popups/ActuationRemove';
import Track from './Track';
import Thumb from './Thumb';

import style from './style.module.scss';

interface IPropTypes {
  id: number;
  parentId: number;
  title: string;
  defaultValues: {
    values: number[];
    intensity?: number;
    type?: string;
    temperature?: string;
    color?: ILightRGB;
  }[];
  renderState: number;
  forceRender: () => void;
}

const STEP = .01;
const MIN = 0;

const defaultMatrix: [number, number][] = [];
for (let i = 0; i < 1; i += 0.02) {
  defaultMatrix.push([+i.toFixed(2), +(i + 0.01).toFixed(2)]);
}

const Line = forwardRef<HTMLDivElement, IPropTypes>(({
  id,
  parentId,
  title,
  defaultValues,
  renderState,
  forceRender,
}, ref) => {
  const videoManager = useVideoManage();
  const duration = videoManager.duration;
  const currentTime = videoManager.currentTime;

  const deviceManager = useDeviceManage();
  const devices = deviceManager.devices;
  const selectedDevice = deviceManager.selectedDevice;
  const [deviceId, scriptId] = selectedDevice ? selectedDevice : [];
  const currentDevice = devices ? devices[deviceId]?.data[scriptId] : null;

  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>([]);
  const [value, setValue] = useState<number[][]>(defaultMatrix);

  // select store device
  const selectDevice = useCallback((deviceId: number, scriptId: number, valueId?: number): void => {
    deviceManager.setSelectedDevice(deviceId, scriptId, valueId);
  }, [deviceManager]);

  // select current device for store update
  const selectCurrentActuation = useCallback((valueId?: number): void => {
    if (valueId !== undefined && valueId % 1 === 0) {
      selectDevice(parentId, id, valueId);
    } else {
      selectDevice(parentId, id, undefined);
    }
  }, [parentId, id, selectDevice]);

  // select editable device for settings box
  const selectEditableDevice = useCallback((valueId: number) => {
    deviceManager.setSelectedActuation(parentId, id, valueId);
  }, [deviceManager, parentId, id]);

  const addKeyFrame = () => {
    if (devices) {
      const currentDevice = devices[parentId].data[id];

      const problem = currentTime >= duration - currentDevice.minDuration || value.some(([first, second]) => (
        first <= currentTime && currentTime <= second
      ));

      if (problem) {
        return;
      }

      if (currentDevice.name === 'Fragrances') {
        if (currentTime + currentDevice.minDuration < duration + 1) {
          value.push([currentTime, currentTime + currentDevice.minDuration]);
        }
      } else {
        if (value.length === 0) {
          value.push([currentTime]);
        } else if (value.flat(1).length % 2 === 0) {
          // if it's lower than very first value, insert at start
          if (value[0][0] > currentTime) {
            value.unshift([currentTime]);
          } else if (value[value.length - 1][1] < currentTime) {
            value.push([currentTime]);
          } else {
            const middleIndex = value.findIndex(([, second], index) => (
              second < currentTime && currentTime < value[index + 1][0]
            )) + 1;

            if (middleIndex > -1) {
              value.splice(middleIndex, 0, [currentTime]);
            }
          }
        } else {
          const singleElement = value.find((item) => (
            item.length === 1
          )) as number[];

          singleElement.push(currentTime);
          singleElement.sort((a, b) => a - b);

          const problem = value.some((item) => {
            if (item === singleElement) {
              return false;
            }

            return item[0] >= singleElement[0] && item[1] <= singleElement[1];
          });

          if (problem) {
            if (singleElement[0] === currentTime) {
              singleElement.shift();
            } else {
              singleElement.pop();
            }
            return;
          }
        }
      }

      selectCurrentActuation();
      updateDeviceValues(value);
      setValue([...value]);
    }
  };

  const removeKeyFrame = (index: number): void => {
    const tempData = [...value];
    tempData.splice(Math.floor(index / 2), 1);

    setValue([...tempData]);
    updateDeviceValues(tempData);
  };

  const editActuation = (index: number): void => {
    selectEditableDevice(index / 2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    forceRender();
  };

  // set updated values to store
  const updateDeviceValues = (value: number[][]): void => {
    if (devices) {
      const currentDevice = devices[parentId].data[id];

      if (value.length) {
        if (currentDevice.scripts.length) {
          value.forEach((values, index) => {
            if (currentDevice.scripts[index]) {
              currentDevice.scripts[index].values = values;
            } else {
              currentDevice.scripts.push({
                values,
                ...initialOptions(currentDevice),
              });
            }
          });

          currentDevice.scripts.length = value.length;
        } else {
          // create initial script
          currentDevice.scripts.push({
            values: value[0],
            ...initialOptions(currentDevice),
          });
          deviceManager.setSelectedDevice();
        }
      } else {
        currentDevice.scripts = [];
        deviceManager.setSelectedDevice();
      }

      forceRender();
    }
  };

  const clearAllKeyFrames = () => {
    selectCurrentActuation();
    updateDeviceValues([]);
    setValue([]);
  };

  const onRangeRootClick = () => {
    if (deviceManager.selectedActuation !== null) {
      deviceManager.setSelectedActuation(0, 0);
    }

    if (value.flat(1).length && value.flat(1).length % 2 === 0) {
      return;
    }

    selectCurrentActuation();
  };

  const onLineClick = (e: SyntheticEvent) => {
    // close selected device if clicked line empty spaces
    if (e.target === e.currentTarget) {
      deviceManager.setSelectedDevice();
    }
  };

  const changeValue = (updatedValue: number[]): void => {
    if (currentDevice) {
      const temp: number[][] = [];

      for (let i = 0; i < updatedValue.filter(val => !isNaN(val)).length; i += 2) {
        temp.push(copyObject(updatedValue).filter((val: number) => !isNaN(val)).splice(i, 2));
      }
      const error = temp.length && temp.some(([first, second]) => second - first < currentDevice.minDuration)
        || temp.some(([, second], index) => temp[index + 1] && temp[index + 1][0] - second < currentDevice.minDuration);

      if (error) {
        return;
      }

      if (currentDevice.name !== 'Fragrances') {
        const newValues: number[] = updatedValue.filter(val => !isNaN(val));
        setValue((currentValues) => {
          let pointer = 0;

          return currentValues.map((item) => {
            if (item.length === 2) {
              return [newValues[pointer++], newValues[pointer++]];
            } else {
              return [newValues[pointer++]];
            }
          });
        });
      }
    }
  };

  const afterValueChange = () => {
    updateDeviceValues(value);
    forceRender();
  };

  useEffect(() => {
    const values: number[][] = defaultValues.map(data => data.values);

    setValue(values);
  }, [defaultValues, renderState]);

  useEffect(() => {
    const count = value.flat(1).length;
    const tempColors: string[] = ['rgba(0, 0, 0, 0)'];

    if (count !== 1) {
      value.forEach(([, second], i) => {
        if (!second) {
          tempColors.push('rgba(0, 0, 0, 0)');
          return;
        }

        if (devices && selectedDevice && JSON.stringify(selectedDevice) === JSON.stringify([parentId, id, i])) {
          tempColors.push('#7A52F4', 'rgba(0, 0, 0, 0)');
        } else {
          tempColors.push('#F1ECE899', 'rgba(0, 0, 0, 0)');
        }
      });
    } else {
      tempColors.push('rgba(0, 0, 0, 0)');
    }

    setColors(tempColors);
  }, [devices, value, selectedDevice, id, parentId]);

  return (
    <div className={style.line_root} onClick={onLineClick}>
      <div className={style.line_box}>
        <span className={style.line_name}>
          {title}
        </span>
        <div className={style.track_box} ref={ref}>
          <div
            className={style.range_root}
            onClick={onRangeRootClick}
          >
            <Range
              draggableTrack={!!value.length}
              values={value.flat(1)}
              step={STEP}
              min={MIN}
              max={duration}
              onChange={changeValue}
              onFinalChange={afterValueChange}
              renderTrack={({
                props,
                children,
              }) => (
                <Track
                  props={props}
                  value={value.flat(1)}
                  min={MIN}
                  max={duration}
                  colors={colors}
                  selectCurrentActuation={selectCurrentActuation}
                >
                  {value.length ? children : null}
                </Track>
              )}
              renderThumb={({
                props,
                isDragged,
                index,
                value: rangeValue,
              }) => (
                <Thumb
                  key={index}
                  index={index}
                  props={props}
                  values={value.find((item) => item[0] === rangeValue)}
                  showTime={value.some((item) => item[0] === rangeValue)}
                  selected={JSON.stringify(selectedDevice) === JSON.stringify([parentId, id, index / 2])}
                  isDragged={isDragged}
                  edit={editActuation}
                  remove={removeKeyFrame}
                />
              )}
            />
            {showRemoveModal ? (
              <ActuationRemove close={() => setShowRemoveModal(false)} remove={() => clearAllKeyFrames()} />
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <button className={style.line_root__button} onClick={addKeyFrame}>
          <Mark width={20} height={20} />
        </button>
        <button className={style.line_root__button} onClick={() => setShowRemoveModal(true)}>
          <CloseIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
});

export default Line;
