import { Buffer } from 'buffer';

// eslint-disable-next-line
(window as any).global = window;
global.Buffer = Buffer;
global.process = {
  env: { DEBUG: undefined },
  version: '',
  nextTick: require('next-tick'),
  // eslint-disable-next-line
} as any;
