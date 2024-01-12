import { forwardRef, useMemo } from 'react';
import { Chart, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { copyObject } from '@utils';
import { IDashboardChart } from '@constants/types';
import { dashboardConfig } from '@constants/charts';
import ChartActions from '../ChartActions';

import styles from './style.module.scss';

interface IProps {
  data: ChartData<'line' | 'bar', IDashboardChart[]>;
  dateMode: string;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const lineColors: string[] = ['#FFBD00', '#76448A', '#5DADE2', '#E74C3C', '#58D68D', '#BCFFAD', '#FFB8D7', '#B8C2FF', '#DDFFB8', '#B8FFFB'];

const LineChart = forwardRef<Chart<'line', IDashboardChart[]> | undefined, IProps>(({
  data,
  dateMode,
  zoomOut,
  zoomIn,
  resetZoom,
}, forwardedRef) => {
  const dateFormat = useMemo(() => {
    if (dateMode === 'year') {
      return 'YYYY';
    }

    if (dateMode === 'month') {
      return 'MM';
    }

    if (dateMode === 'day') {
      return 'DD';
    }
  }, [dateMode]);
  const memoizedData = useMemo<ChartData<'line', IDashboardChart[]>>(() => {
    const duplicatedData: ChartData<'line', IDashboardChart[]> = copyObject(data);

    return {
      labels: duplicatedData.labels?.map(label => moment(label as string).format(dateFormat)),
      datasets: duplicatedData.datasets.map((dataset, index) => {
        dataset.data = dataset.data.map(data => ({
          ...data,
          date: moment(data.date).format(dateFormat),
        }));

        return {
          ...dataset,
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'amount',
          },
          tension: 0.4,
          fill: false,
          borderColor: lineColors[index],
          backgroundColor: lineColors[index],
        };
      }),
    };
  }, [data, dateFormat]);

  return (
    <div className={styles.root}>
      <Line
        ref={forwardedRef}
        data={memoizedData}
        options={dashboardConfig.line}
      />
      <ChartActions zoomIn={zoomIn} zoomOut={zoomOut} reset={resetZoom} />
    </div>
  );
});

export default LineChart;
