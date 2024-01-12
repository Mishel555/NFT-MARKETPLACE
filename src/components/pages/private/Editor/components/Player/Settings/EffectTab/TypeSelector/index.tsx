import { useEffect, useRef, useState } from 'react';
import { useDeviceManage } from '@hooks';
import classNames from 'classnames';
import { CaretArrowIcon } from '@components/icons';

import style from './style.module.scss';

const TypeSelector = () => {
  const deviceManager = useDeviceManage();

  const data = deviceManager.devices;
  const [deviceId, scriptId, valueId] = deviceManager.selectedActuation || [];
  const currentDevice = data ? data[deviceId]?.data[scriptId]?.scripts[valueId] : undefined;

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const [selectedType, setSelectedType] = useState<string>(currentDevice?.type || '');
  const [types, setTypes] = useState<{ id: number; title: string }[] | null | undefined>(null);

  const selectType = (id: number, type: string) => {
    if (data && currentDevice) {
      currentDevice.typeId = id;
      currentDevice.type = type;

      setSelectedType(type);
      setIsHidden(true);
    }
  };

  useEffect(() => {
    if (data) {
      setTypes(data[deviceId].data[scriptId].typeList);
    }
  }, [data, deviceId, scriptId]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Element)) {
        setIsHidden(true);
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  return (
    <div className={style.root} ref={boxRef}>
      <div className={style.controller} onClick={() => setIsHidden(!isHidden)}>
        <label>{selectedType.length && selectedType || 'Choose'}</label>
        <button className={classNames(style.controller__button, !isHidden && style.controller__button_active)}>
          <CaretArrowIcon />
        </button>
      </div>
      {!isHidden && types?.length ? (
        <div className={style.menu}>
          <ul>
            {types.map(({
              title,
              id,
            }, index) => (
              <li key={index} onClick={() => selectType(id, title)}>
                {title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default TypeSelector;
