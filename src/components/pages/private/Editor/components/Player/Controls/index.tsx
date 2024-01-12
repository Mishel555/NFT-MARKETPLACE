import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDeviceManage, useVideoManage } from '@hooks';
import { initialOptions } from '@components/pages/private/Editor';
import { Mark, StopAndPlay } from '@components/icons';
import TimeInput from '@components/organisms/VideoPlayer/Controls/Buttons/TimeInput';
import SpeedSelector from '@components/organisms/VideoPlayer/Controls/Buttons/SpeedSelector';
import Thumbs from '@components/organisms/VideoPlayer/Controls/Thumbs';
import Progress from './Progress';
import TempLine from './TempLine';

import prevIcon from '@assets/icons/seekPrev.svg';
import nextIcon from '@assets/icons/seekNext.svg';

import style from './style.module.scss';

interface propTypes {
  duration: number;
  progress: number;
  toggle: () => void;
  seekTo: (seconds: number) => void;
  forceRender: () => void;
}

const Controls = ({
  duration,
  progress,
  toggle,
  seekTo,
  forceRender,
}: propTypes) => {
  const videoManager = useVideoManage();
  const currentTime = videoManager.currentTime;
  const playSpeed = videoManager.speed;

  const deviceManager = useDeviceManage();
  const devices = deviceManager.devices;
  const selectedTrack = deviceManager.selectedDevice;
  const editableDevice = deviceManager.selectedActuation;
  const [deviceId, scriptId, valueId] = editableDevice || selectedTrack || [];
  const currentDevice = devices ? devices[deviceId]?.data[scriptId] : null;

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [value, setValue] = useState<number[]>([0, 1]);

  // set updated values to store
  const updateDeviceValues = (value: number[], onEnd: boolean): void => {
    if (devices) {
      const currentDevice = devices[deviceId].data[scriptId];

      if (value.length) {
        if (currentDevice.scripts.length) {
          for (let i = 0; i < value.length; i++) {
            if (onEnd) {
              const currentIndex = currentDevice.scripts.findIndex(script => (
                script?.values.length < 2
              ));

              const currentScript = currentDevice.scripts[currentIndex];
              currentScript.values.push(value[0]);
            } else {
              const middleIndex = currentDevice.scripts.findIndex((script, index) => (
                script?.values[1] < value[0] && value[0] < currentDevice.scripts[index + 1]?.values[0]
              ));

              if (middleIndex > -1) {
                currentDevice.scripts.splice(middleIndex + 1, 0, {
                  values: value,
                  ...initialOptions(currentDevice),
                });
              } else {
                const isFromEnd = currentDevice.scripts.find(script => (
                  value[0] > script.values[1]
                ));

                if (isFromEnd) {
                  currentDevice.scripts.push({
                    values: value,
                    ...initialOptions(currentDevice),
                  });
                } else {
                  currentDevice.scripts.unshift({
                    values: value,
                    ...initialOptions(currentDevice),
                  });
                }
              }
            }
          }
        } else {
          // create initial script
          currentDevice.scripts.push({
            values: value,
            ...initialOptions(currentDevice),
          });
        }
      } else {
        currentDevice.scripts = [];
      }
    }

    forceRender();
  };

  const changeValue = (updatedValue: number[]): void => {
    if (currentDevice) {
      if (currentDevice.name !== 'Fragrances') {
        setValue(updatedValue.filter(val => !isNaN(val)));
      }
    }
  };

  const afterValueChange = (): void => {
    if (devices) {
      if (editableDevice) {
        devices[deviceId].data[scriptId].scripts[valueId].values = value;
        forceRender();
      }
    }
  };

  const setStart = (): void => {
    if (!value.length && devices) {
      const currentDevice = devices[deviceId].data[scriptId];
      const currentScripts = currentDevice.scripts;
      const values: number[][] = [];

      currentScripts.forEach((script) => {
        values.push(script.values);
      });

      const problem = progress >= duration - 2 * currentDevice.minDuration || values.some(([first, second]) => (
        first <= progress && progress <= second
      ));

      if (problem) {
        return;
      }

      if (currentDevice.name === 'Fragrances') {
        if (progress + currentDevice.minDuration < duration + 1) {
          setValue([progress, progress + currentDevice.minDuration]);
          updateDeviceValues([progress, progress + currentDevice.minDuration], true);
        }
      } else {
        setValue([progress]);
        updateDeviceValues([progress], false);
      }
    }
  };

  const setEnd = (): void => {
    if (value.length === 1 && devices) {
      const currentDevice = devices[deviceId].data[scriptId];
      const currentScripts = currentDevice.scripts;
      const values: number[][] = [];

      currentScripts.forEach((script) => {
        values.push(script.values);
      });

      const problem = progress >= duration - currentDevice.minDuration || values.some(([first, second]) => (
        first <= progress && progress <= second
      ));

      if (problem) {
        return;
      }


      setValue([progress]);
      updateDeviceValues([progress], true);
      setValue([]);
    }
  };

  const seekVideo = (seconds: number) => {
    videoManager.seekTo(currentTime + seconds);
  };

  const changeVideoSpeed = (speed: number): void => {
    videoManager.setSpeed(speed);
  };

  useEffect(() => {
    if (devices && selectedTrack) {
      if (!editableDevice) {
        setValue([]);
        setIsEnabled(true);
      } else {
        setValue(devices[deviceId]?.data[scriptId]?.scripts[valueId]?.values || []);
      }
    } else {
      setValue([]);
      setIsEnabled(false);
    }
  }, [devices, selectedTrack, editableDevice, deviceId, scriptId, valueId]);

  useEffect(() => {
    if (devices) {
      const values: number[] = [];
      const currentScripts = devices[deviceId]?.data[scriptId].scripts;

      currentScripts?.forEach(script => {
        values.push(...script.values);
      });

      if (values && values.length % 2 !== 0) {
        setValue([values[values.length - 1]]);
      }
    }
  }, [deviceId, devices, scriptId, selectedTrack]);

  return (
    <div className={style.root}>
      <div className={style.lines_root}>
        <Progress duration={duration} current={progress} seekTo={seekTo} />
        {editableDevice || isEnabled ? (
          <TempLine
            key={value.length}
            value={value}
            duration={duration}
            changeValue={changeValue}
            afterValueChange={afterValueChange}
          />
        ) : null}
      </div>
      <Thumbs duration={duration} />
      <div className={style.buttons_group}>
        <button className={style.controls__button} onClick={() => seekVideo(-0.1)}>
          <img alt="icon" src={prevIcon} />
        </button>
        <button
          className={classNames(style.controls__button, !isEnabled && style.controls__button_disabled)}
          disabled={!isEnabled}
          onClick={setStart}
        >
          <Mark type="right" fill={!isEnabled ? '#6D6663' : '#fff'} />
        </button>
        <button className={style.controls__button} onClick={toggle}>
          <StopAndPlay />
        </button>
        <button
          className={classNames(style.controls__button, !isEnabled && style.controls__button_disabled)}
          disabled={!isEnabled}
          onClick={setEnd}
        >
          <Mark type="left" fill={!isEnabled ? '#6D6663' : '#fff'} />
        </button>
        <button className={style.controls__button} onClick={() => seekVideo(0.1)}>
          <img alt="icon" src={nextIcon} />
        </button>
      </div>
      <div className={style.input_group}>
        <TimeInput progress={currentTime} duration={duration} seek={seekVideo} />
        <SpeedSelector speed={playSpeed} selectVideoSpeed={changeVideoSpeed} />
      </div>
    </div>
  );
};

export default Controls;
