import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDashboardChartConfig, INameValue, IProfileArtType, IUser } from '@constants/types';
import { AxiosError } from 'axios';
import api from '@services/api';
import { useAuth } from '@hooks';
import Selector from '../Selector';
import ViewSelector from '../ViewSelector';
import DateSelector from '../DateSelector';
import LabelController from '../LabelController';
import ListEditor from '../ListEditor';

import styles from './style.module.scss';

interface IProps {
  charts: string[];
  chartConfig: IDashboardChartConfig;
  dateModes: string[];
  viewModes: string[];
  hiddenItems: number[];
  selectedViewMode: number;
  labels?: string[];
  changeChart: (index: number) => void;
  changeDateMode: (index: number) => void;
  changeViewMode: (index: number) => void;
  changeChartItems: (id: string[]) => void;
  toggleDataVisibility: (index: number) => void;
}

const ChartToolBar = ({
  charts,
  chartConfig,
  dateModes,
  viewModes,
  labels,
  hiddenItems,
  selectedViewMode,
  changeChart,
  changeDateMode,
  changeViewMode,
  changeChartItems,
  toggleDataVisibility,
}: IProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { chart, dateMode, loadItems } = useMemo(() => chartConfig, [chartConfig]);

  const [selectorItems, setSelectorItems] = useState<INameValue[]>([]);

  const loadList = useCallback(async () => {
    try {
      if (!user) return;

      // arts
      if (chart === 0) {
        const { data } = await api.users.getUserArt(user['_id'], { sold: true });
        const items = data.arts.map((art: IProfileArtType) => ({ name: art.title, value: art['_id'] }));

        if (!loadItems) {
          changeChartItems([...items].splice(0, 10).map(item => item.value));
        }

        setSelectorItems(items);
        return;
      }

      // users artists/galleries
      const { data } = await api.users.getAll({
        role: chart === 1 ? 'artist' : 'gallery',
        approved: true,
        pagination: false,
        ...(user.role.name === 'gallery' && ({
          gallery: user['_id'],
        })),
      });

      const items = data.users.map((user: IUser) => ({
        name: user.full,
        value: user['_id'],
      }));

      if (!loadItems) {
        changeChartItems([...items].splice(0, 10).map(item => item.value));
      }

      setSelectorItems(items);
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  }, [user, chart, loadItems, changeChartItems, navigate]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <Selector data={charts} selectedData={chart} changeData={changeChart} />
        <div className={styles.root__wrapper}>
          <ViewSelector views={viewModes} selectedView={selectedViewMode} changeViewMode={changeViewMode} />
          <DateSelector dateModes={dateModes} selectedDateMode={dateMode} changeDateMode={changeDateMode} />
        </div>
      </div>
      {labels && (
        <div className={styles.root__bottom}>
          <LabelController labels={labels} hiddenItems={hiddenItems} toggleDataVisibility={toggleDataVisibility} />
          <ListEditor
            name={chart === 0 ? 'Arts' : chart === 1 ? 'Artists' : 'Galleries'}
            items={selectorItems}
            applyItems={changeChartItems}
            defaultItems={loadItems}
          />
        </div>
      )}
    </div>
  );
};

export default ChartToolBar;
