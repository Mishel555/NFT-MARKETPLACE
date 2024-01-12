import { ChartOptions } from 'chart.js';
import { IDashboardChart } from '@constants/types';

interface IDashboardConfig {
  line: ChartOptions<'line'>;
  bar: ChartOptions<'bar'>;
}

export const dashboardConfig: IDashboardConfig = {
  line: {
    responsive: true,
    scales: {
      x: {
        grid: {
          borderDash: [7],
          drawBorder: false,
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        display: false,
      },
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: 'easeOutCubic',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        titleColor: '#000',
        bodyColor: '#5D5D5B',
        backgroundColor: '#F7F9F9',
        padding: 10,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: () => '',
          // art/artist/gallery name
          beforeLabel: (tooltipItem) => {
            const data = (tooltipItem.dataset.data[tooltipItem.dataIndex] ?? {}) as unknown as IDashboardChart;

            return data.label.toUpperCase();
          },
          // actions
          label: (tooltipItem) => {
            const data = (tooltipItem.dataset.data[tooltipItem.dataIndex] ?? {}) as unknown as IDashboardChart;

            return [
              ` Sold: ${data.sold} Copy`,
              ` Resold: ${data.resold} Copy`,
              ` Total sells: ${data.total} Copy`,
              ` Value: ${data.amount} USD`,
              '',
            ];
          },
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.001,
          },
          drag: {
            enabled: true,
            borderWidth: 1,
            borderColor: 'rgba(235, 64, 52,0.3)',
            backgroundColor: 'rgba(235, 64, 52,0.3)',
          },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
    },
  },
  bar: {
    responsive: true,
    scales: {
      x: {
        grid: {
          borderDash: [7],
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: 'easeOutCubic',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleColor: '#000',
        bodyColor: '#5D5D5B',
        backgroundColor: '#F7F9F9',
        padding: 10,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: () => '',
          // art/artist/gallery name
          beforeLabel: (tooltipItem) => {
            const data = (tooltipItem.dataset.data[tooltipItem.dataIndex] ?? {}) as unknown as IDashboardChart;

            return data.label.toUpperCase();
          },
          // actions
          label: (tooltipItem) => {
            const data = (tooltipItem.dataset.data[tooltipItem.dataIndex] ?? {}) as unknown as IDashboardChart;

            return [
              ` Sold: ${data.sold} Copy`,
              ` Resold: ${data.resold} Copy`,
              ` Total sells: ${data.total} Copy`,
              ` Value: ${data.amount} USD`,
              '',
            ];
          },
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.001,
          },
          drag: {
            enabled: true,
            borderWidth: 1,
            borderColor: 'rgba(235, 64, 52,0.3)',
            backgroundColor: 'rgba(235, 64, 52,0.3)',
          },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
    },
  },
};
