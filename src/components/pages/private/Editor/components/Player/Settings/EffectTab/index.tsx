import { ChangeEvent, useState } from 'react';
import { useDeviceManage, useFormatSeconds, useVideoManage } from '@hooks';
import { CloseIcon } from '@components/icons';
import IntensityRange from './IntensityRange';
import TempSelector from './TempSelector';
import TypeSelector from './TypeSelector';
import ColorPicker from './ColorPicker';

import style from './style.module.scss';

interface IPropTypes {
  forceRender: () => void;
}

const EffectTab = ({ forceRender }: IPropTypes) => {
  const videoManager = useVideoManage();
  const duration: number = videoManager.duration;

  const deviceManager = useDeviceManage();
  const [deviceId, scriptId, valueId] = deviceManager.selectedActuation || [];
  const data = deviceManager.devices;
  const currentDevice = data ? data[deviceId]?.data[scriptId] : undefined;
  const currentScript = data ? data[deviceId]?.data[scriptId]?.scripts[valueId] : undefined;

  const [startTime, setStartTime] = useState<number>(currentScript?.values[0] || 0);
  const [endTime, setEndTime] = useState<number>(currentScript?.values[1] || 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value;
    const name = e.target.name;
    const timeType = name[0] === 'h' ? 'HH' : `${name[0]}${name[0]}`;

    if (isNaN(value)) {
      e.target.value = useFormatSeconds(startTime, timeType);
    }
  };

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;
    const timeType = name[0] === 'h' ? 'HH' : `${name[0]}${name[0]}`;
    const miniSecondIndex = useFormatSeconds(startTime).lastIndexOf(':');

    const tempTime: { [key: string]: number } = {
      hours: parseInt(useFormatSeconds(startTime, 'HH'), 10) * 3600,
      minutes: parseInt(useFormatSeconds(startTime, 'mm'), 10) * 60,
      seconds: parseInt(useFormatSeconds(startTime, 'ss'), 10),
      miniSeconds: parseInt(useFormatSeconds(startTime).slice(miniSecondIndex).replaceAll(':', ''), 10) / 10,
    };

    tempTime[name] = name === 'hours' ? value * 3600 : name === 'minutes' ? value * 60 : name === 'seconds' ? value : value / 10;

    if (currentScript && data) {
      const seconds = Object.values(tempTime).map(val => val).reduce((partialSum, a) => partialSum + a, 0);
      const minDuration = data[deviceId]?.data[scriptId].minDuration;

      if (seconds < endTime) {
        if (endTime - seconds >= minDuration) {
          setStartTime(seconds);

          setErrorMessage(null);
          currentScript.values[0] = seconds;
          forceRender();
        } else {
          setErrorMessage(`The minimal duration for this actuation is ${minDuration} second`);
          e.target.value = useFormatSeconds(startTime, timeType);
        }
      } else {
        e.target.value = useFormatSeconds(startTime, timeType);
      }
    }
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;
    const timeType = name[0] === 'h' ? 'HH' : `${name[0]}${name[0]}`;
    const miniSecondIndex = useFormatSeconds(startTime).lastIndexOf(':');

    const tempTime: { [key: string]: number } = {
      hours: parseInt(useFormatSeconds(endTime, 'HH'), 10) * 3600,
      minutes: parseInt(useFormatSeconds(endTime, 'mm'), 10) * 60,
      seconds: parseInt(useFormatSeconds(endTime, 'ss'), 10),
      miniSeconds: parseInt(useFormatSeconds(startTime).slice(miniSecondIndex).replaceAll(':', ''), 10) / 10,
    };

    tempTime[name] = name === 'hours' ? value * 3600 : name === 'minutes' ? value * 60 : name === 'seconds' ? value : value / 10;

    if (currentScript && data) {
      const seconds = Object.values(tempTime).map(val => val).reduce((partialSum, a) => partialSum + a, 0);
      const minDuration = data[deviceId]?.data[scriptId].minDuration;

      if (seconds < duration) {
        if (seconds - startTime >= minDuration) {
          setEndTime(seconds);

          currentScript.values[1] = seconds;
          setErrorMessage(null);
          forceRender();
        } else {
          setErrorMessage(`The minimal duration for this actuation is ${minDuration} second`);
          e.target.value = useFormatSeconds(endTime, timeType);
        }
      } else {
        e.target.value = useFormatSeconds(endTime, timeType);
        setErrorMessage('The maximum duration for actuation cannot be set longer than the duration of the video');
      }
    }
  };

  const removeEffect = (): void => {
    if (data && currentDevice) {
      currentDevice.scripts.splice(valueId, 1);
      forceRender();
    }
  };

  return (
    <div className={style.root} key={startTime + endTime}>
      <div className={style.input_group}>
        <label>Start time</label>
        <div className={style.time_input_group}>
          <input
            className={style.time_input}
            type="text"
            name="hours"
            onChange={validateInput}
            onBlur={handleStartChange}
            defaultValue={useFormatSeconds(startTime, 'HH')}
            disabled={!currentDevice}
            maxLength={2}
          />
          :
          <input
            className={style.time_input}
            type="text"
            name="minutes"
            onChange={validateInput}
            onBlur={handleStartChange}
            defaultValue={useFormatSeconds(startTime, 'mm')}
            disabled={!currentDevice}
            maxLength={2}
          />
          :
          <input
            className={style.time_input}
            type="text"
            name="seconds"
            onChange={validateInput}
            onBlur={handleStartChange}
            defaultValue={useFormatSeconds(startTime, 'ss')}
            disabled={!currentDevice}
            maxLength={2}
          />
          :
          <input
            className={style.time_input}
            type="text"
            name="miniSeconds"
            onChange={validateInput}
            onBlur={handleStartChange}
            defaultValue={(
              useFormatSeconds(startTime).slice(useFormatSeconds(startTime).lastIndexOf(':')).replaceAll(':', '')
            )}
            disabled={!currentDevice}
            maxLength={2}
          />
        </div>
      </div>
      <div className={style.input_group}>
        <label>End time</label>
        <div className={style.time_input_group}>
          <input
            className={style.time_input}
            type="text"
            name="hours"
            onChange={validateInput}
            onBlur={handleEndChange}
            defaultValue={useFormatSeconds(endTime, 'HH')}
            disabled={!currentDevice || currentDevice.name === 'Fragrances'}
            maxLength={2}
          />
          :
          <input
            className={style.time_input}
            type="text"
            name="minutes"
            onChange={validateInput}
            onBlur={handleEndChange}
            defaultValue={useFormatSeconds(endTime, 'mm')}
            disabled={!currentDevice || currentDevice.name === 'Fragrances'}
            maxLength={2}
          />
          :
          <input
            className={style.time_input}
            type="text"
            name="seconds"
            onChange={validateInput}
            onBlur={handleEndChange}
            defaultValue={useFormatSeconds(endTime, 'ss')}
            disabled={!currentDevice || currentDevice.name === 'Fragrances'}
            maxLength={2}
          />
          :
          <input
            className={style.time_input}
            type="text"
            name="miniSeconds"
            onChange={validateInput}
            onBlur={handleEndChange}
            defaultValue={(
              useFormatSeconds(endTime).slice(useFormatSeconds(endTime).lastIndexOf(':')).replaceAll(':', '')
            )}
            disabled={!currentDevice || currentDevice.name === 'Fragrances'}
            maxLength={2}
          />
        </div>
      </div>
      {errorMessage ? (
        <span className={style.error_message}>
          {errorMessage}
        </span>
      ) : null}
      {currentDevice?.options?.includes('sliderIntensity') ? (
        <div className={style.input_group}>
          <label>Intensity</label>
          <IntensityRange type="slider" forceRender={forceRender} />
        </div>
      ) : null}
      {currentDevice?.options?.includes('markIntensity') ? (
        <div className={style.input_group}>
          <label>Intensity</label>
          <IntensityRange type="marker" forceRender={forceRender} />
        </div>
      ) : null}
      {currentDevice?.options?.includes('temperature') ? (
        <div className={style.input_group}>
          <label>Temperature</label>
          <TempSelector />
        </div>
      ) : null}
      {currentDevice?.options?.includes('type') ? (
        <div className={style.input_group}>
          <label>Type of fragrance</label>
          <TypeSelector />
        </div>
      ) : null}
      {currentDevice?.options?.includes('color') ? (
        <div className={style.input_group}>
          <ColorPicker />
        </div>
      ) : null}
      {currentDevice?.preview && (
        <div className={style.root__preview}>
          <label>Preview</label>
          <video
            autoPlay
            muted
            loop
            controls={false}
            className={style.root__preview_video}
          >
            <source src={currentDevice.preview} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {currentScript ? (
        <button className={style.remove_button} onClick={removeEffect}>
          <CloseIcon />
          <span>Remove</span>
        </button>
      ) : null}
    </div>
  );
};

export default EffectTab;
