import { useRef, useState } from 'react';
import { useDeviceManage } from '@hooks';
import FrameLine from './FrameLine';
import DeviceBox from './DeviceBox';

import style from './style.module.scss';

interface IPropTypes {
  forceRender: () => void;
  renderState: number;
}

const Timeline = ({
  forceRender,
  renderState,
}: IPropTypes) => {
  const deviceManager = useDeviceManage();
  const data = deviceManager.devices;
  const deviceRootRef = useRef<HTMLDivElement | null>(null);

  const [frameThumbHeight, setFrameThumbHeight] = useState<number>(900);

  const detectDeviceRootHeight = (): void => {
    if (deviceRootRef.current) {
      setFrameThumbHeight(deviceRootRef.current.clientHeight + 50);
    }
  };

  return (
    <div className={style.root}>
      <FrameLine thumbHeight={frameThumbHeight} />
      <div ref={deviceRootRef}>
        {data?.map(({
          title,
          data,
        }, index) => (
          <DeviceBox
            key={index}
            id={index}
            renderState={renderState}
            title={title}
            data={data}
            detectRootHeight={detectDeviceRootHeight}
            forceRender={forceRender}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
