import { Ref, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, ChartData } from 'chart.js';
import { AxiosError } from 'axios';
import moment from 'moment';
import { IDashboardChart, IDashboardChartConfig, UserRoles } from '@constants/types';
import { useAuth } from '@hooks';
import api from '@services/api';
import ChartToolBar from '../ChartToolBar';
import LineChart from '../LineChart';
import BarChart from '../BarChart';
import Loading from '../Loading';
import EmptyMessage from '../EmptyMessage';

import styles from './style.module.scss';

interface IProps {
  role: UserRoles;
}

type chartData = ChartData<'line' | 'bar', IDashboardChart[]> | null;

interface IParams {
  seller: string;
  from: string;
  to: string;
  groupBy: string;
  arts?: string;
  artists?: string;
  galleries?: string;
}

const AVAILABLE_MODES = ['day', 'month', 'year'];

const AVAILABLE_VIEWS = ['line', 'bar'];

const AVAILABLE_CHARTS = {
  admin: ['Sales', 'Top artists', 'Top Galleries'],
  artist: ['Sales'],
  gallery: ['Sales', 'Top artists'],
  user: [],
};

const generateDate = (dateMode: string) => {
  const currentDate = moment();
  const dateRange = { from: '', to: '' };

  if (dateMode === 'year') {
    dateRange.from = `01-01-${currentDate.year() - 5}`;
    dateRange.to = `01-01-${currentDate.year() + 5}`;
  } else if (dateMode === 'month') {
    dateRange.from = currentDate.startOf('year').format('MM-DD-YYYY');
    dateRange.to = currentDate.endOf('year').format('MM-DD-YYYY');
  } else {
    dateRange.from = currentDate.startOf('month').format('MM-DD-YYYY');
    dateRange.to = currentDate.endOf('month').format('MM-DD-YYYY');
  }

  return dateRange;
};

const INITIAL_CHART_CONFIG: IDashboardChartConfig = { chart: 0, dateMode: 2, loadItems: null };

const ChartBoard = ({ role }: IProps) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const chartRef = useRef<Chart<'line' | 'bar', IDashboardChart[]> | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [chartData, setChartData] = useState<chartData | null>(null);
  const [chartView, setChartView] = useState<number>(0);
  const [chartConfig, setChartConfig] = useState<IDashboardChartConfig>(INITIAL_CHART_CONFIG);
  const [hiddenItems, setHiddenItems] = useState<number[]>([]);

  const changeChart = useCallback((index: number) => {
    if (chartConfig.chart !== index) {
      setChartConfig(prevState => ({ ...prevState, loadItems: null, chart: index }));
    }
  }, [chartConfig]);

  const changeDateMode = useCallback((index: number) => {
    if (chartConfig.dateMode !== index) {
      setChartConfig(prevState => ({ ...prevState, dateMode: index }));
      setHiddenItems([]);
    }
  }, [chartConfig]);

  const changeChartItems = useCallback((values: string[]) => {
    setChartConfig(prevState => ({ ...prevState, loadItems: values }));
    setHiddenItems([]);
  }, []);

  const changeViewMode = useCallback((index: number) => {
    if (chartView !== index) {
      setChartView(index);
      setHiddenItems([]);
    }
  }, [chartView]);

  const toggleDataVisibility = useCallback((index: number) => {
    const chart = chartRef.current;
    const isShow = !hiddenItems.includes(index);

    if (!chart) return;

    if (isShow) {
      chart.hide(index);
      setHiddenItems(prevState => [...prevState, index]);
    } else {
      chart.show(index);
      setHiddenItems(prevState => prevState.filter(item => item !== index));
    }
  }, [hiddenItems]);

  const zoomIn = useCallback(() => {
    if (!chartRef.current) return;

    chartRef.current.zoom(1.1);
  }, []);

  const zoomOut = useCallback(() => {
    if (!chartRef.current) return;

    chartRef.current.zoom(0.9);
  }, []);

  const resetZoom = useCallback(() => {
    if (!chartRef.current) return;

    chartRef.current.resetZoom();
  }, []);

  const loadChart = useCallback(async () => {
    try {
      if (!user) return;

      setIsLoaded(false);

      const { chart, dateMode, loadItems } = chartConfig;

      const modeName = AVAILABLE_MODES[dateMode];
      const params: IParams = {
        ...generateDate(modeName),
        groupBy: modeName,
        seller: user['_id'],
      };

      if (loadItems?.length) {
        params[chart === 0 ? 'arts' : chart === 1 ? 'artists' : 'galleries'] = loadItems?.join(',');
      }

      const { data } = await api.stats.getSalesChart(params);
      if (chartConfig.loadItems === null || !chartConfig.loadItems.length) {
        setChartData({ labels: data.labels, datasets: [] });

        timer.current = setTimeout(() => {
          setIsLoaded(true);
        }, 2000);
        return;
      }

      setChartData(data);
      setIsLoaded(true);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  }, [chartConfig, user, navigate]);

  useEffect(() => {
    loadChart();
  }, [loadChart]);

  useEffect(() => () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  return (
    <div className={styles.root}>
      <ChartToolBar
        charts={AVAILABLE_CHARTS[role]}
        viewModes={AVAILABLE_VIEWS}
        dateModes={AVAILABLE_MODES}
        chartConfig={chartConfig}
        selectedViewMode={chartView}
        labels={chartData?.datasets.map(item => item.label ?? '')}
        hiddenItems={hiddenItems}
        changeChart={changeChart}
        changeDateMode={changeDateMode}
        changeViewMode={changeViewMode}
        changeChartItems={changeChartItems}
        toggleDataVisibility={toggleDataVisibility}
      />
      {(isLoaded && chartData) ? (() => {
        switch (AVAILABLE_VIEWS[chartView]) {
          case 'line':
            return (
              <LineChart
                ref={chartRef as unknown as Ref<Chart<'line', IDashboardChart[]>>}
                data={chartData}
                dateMode={AVAILABLE_MODES[chartConfig.dateMode]}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetZoom={resetZoom}
              />
            );
          case 'bar':
            return (
              <BarChart
                ref={chartRef as unknown as Ref<Chart<'bar', IDashboardChart[]>>}
                data={chartData}
                dateMode={AVAILABLE_MODES[chartConfig.dateMode]}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetZoom={resetZoom}
              />
            );
          default:
            return <EmptyMessage />;
        }
      })() : <Loading />}
    </div>
  );
};

export default ChartBoard;
