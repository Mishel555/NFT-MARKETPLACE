import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import EffectTab from './EffectTab';
import ScriptTab from './ScriptTab';
import style from './style.module.scss';

interface IPropTypes {
  forceRender: () => void;
}

const Settings = ({ forceRender }: IPropTypes) => {
  const tabs: ReactNode[] = [
    <EffectTab key={0} forceRender={forceRender} />,
    <ScriptTab key={1} />,
  ];

  const [tab, setTab] = useState<number>(0);

  return (
    <div className={style.root}>
      <div className={style.tabs}>
        <button
          className={classNames(style.tabs__change_button, tab === 0 && style.active_change_button)}
          onClick={() => setTab(0)}
        >
          Effect settings
        </button>
        <button
          className={classNames(style.tabs__change_button, tab === 1 && style.active_change_button)}
          onClick={() => setTab(1)}
        >
          Script timeline
        </button>
      </div>
      <div className={style.tabs_content}>
        {tabs[tab]}
      </div>
    </div>
  );
};

export default Settings;
