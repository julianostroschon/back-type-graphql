import { sleep } from './utils';

const INTERNAL_ERROR = 1;
const SUCCESS_EXIT_CODE = 0;

type Listener =
  | [(err: Error | null, signal: string) => void]
  | [...Array<(err: Error | null, signal: string) => void>];

const listeners: Listener = [];

type OnStopCallback =
  | ((err: Error | null, signal: string) => Promise<void>)
  | ((err: Error | null, signal: string) => void);

export function onStop(listener: OnStopCallback): void {
  listeners.push(listener);
}

const fireListeners = (err: Error | null, signal: string) => {
  return Promise.all(listeners.map(fn => fn(err, signal)));
};

const handler = async (err: Error | null, signal: string) => {
  let localError = null;
  try {
    await Promise.race([fireListeners(err, signal), sleep(6000)]);
  } catch (e) {
    if (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    localError = e;
  } finally {
    process.exit(localError || err ? INTERNAL_ERROR : SUCCESS_EXIT_CODE);
  }
};

process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', err => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));
