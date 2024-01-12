import { useEffect, useRef, useState } from 'react';
import { useDeviceManage } from '@hooks';
import { IDeviceData } from '@constants/types';
import { CaretArrowIcon } from '@components/icons';
import classNames from 'classnames';
import Line from './Line';

import style from './style.module.scss';

interface IPropTypes {
  id: number;
  title: string;
  renderState: number;
  data: IDeviceData[] | null;
  detectRootHeight: () => void;
  forceRender: () => void;
}

const DeviceBox = ({
  id,
  title,
  data,
  detectRootHeight,
  renderState,
  forceRender,
}: IPropTypes) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const deviceManager = useDeviceManage();

  useEffect(() => {
    detectRootHeight();
  }, [isHidden, detectRootHeight]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if ((e.target as Element).contains(boxRef.current)) {
        if (deviceManager.selectedDevice) {
          deviceManager.setSelectedDevice(deviceManager.selectedDevice[0], deviceManager.selectedDevice[1]);
        }
      }
    };

    document.addEventListener('click', listener, false);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [deviceManager]);

  return (
    <div className={style.device_box} ref={boxRef}>
      <button
        className={classNames(style.hide_button, !isHidden && style.active_button)}
        onClick={() => setIsHidden(!isHidden)}
      >
        <span>
          {title}
        </span>
        <CaretArrowIcon />
      </button>
      {!isHidden ? (
        <div>
          {data?.map(({
            title,
            scripts,
          }, index) => (
            <Line
              key={index}
              id={index}
              parentId={id}
              title={title}
              defaultValues={scripts}
              renderState={renderState}
              forceRender={forceRender}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DeviceBox;
