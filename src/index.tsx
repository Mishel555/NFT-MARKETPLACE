import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { combineProviders } from 'react-combine-providers';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { goerli, polygonMumbai } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  AuthProvider,
  PopupProvider,
  VideoManageProvider,
  DeviceManageProvider,
  NotificationProvider,
  CurrencyProvider,
} from '@providers';
import './polyfill';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

import '@fontsource/manrope/200.css';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';

import './styles/default.scss';

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, polygonMumbai],
  [publicProvider()],
);

const connector = new MetaMaskConnector({
  chains,
});

const wagmiClient = createClient({
  provider,
  webSocketProvider,
  connectors: [connector],
  autoConnect: true,
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

const providers = [
  AuthProvider,
  PopupProvider,
  VideoManageProvider,
  NotificationProvider,
  DeviceManageProvider,
  CurrencyProvider,
];

const combinedProviders = combineProviders();
providers.forEach(provider => combinedProviders.push(provider));
const MasterProvider = combinedProviders.master();

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <WagmiConfig client={wagmiClient}>
    <MasterProvider>
      <Router>
        <App />
      </Router>
    </MasterProvider>
  </WagmiConfig>,
);
