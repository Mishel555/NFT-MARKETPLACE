import { useDeviceManage } from '@hooks';
import { ILightRGB } from '@constants/types';
import { copyObject } from '@utils';
import CollapseMenu from './CollapseMenu';

import style from './style.module.scss';

interface IScriptsType {
  values: number[];
  intensity?: number;
  type?: string;
  temperature?: string;
  color?: ILightRGB;
  name?: string;
}

const ScriptTab = () => {
  const deviceManager = useDeviceManage();
  const effects = deviceManager.devices ? deviceManager.devices[0].data : null;
  const lights = deviceManager.devices ? deviceManager.devices[1].data : null;
  const lightScripts: IScriptsType[] = [];

  lights?.forEach(light => {
    const temp = copyObject(light);
    temp.scripts.forEach((script: IScriptsType) => script.name = light.title);

    lightScripts.push(...temp.scripts);
  });

  return (
    <div className={style.root}>
      {effects?.map(({
        title,
        scripts,
      }, index) => (
        <CollapseMenu key={index} title={title} scripts={scripts} />
      ))}
      {lights?.length ? (
        <CollapseMenu title="Lights" scripts={lightScripts} />
      ) : null}
    </div>
  );
};

export default ScriptTab;
