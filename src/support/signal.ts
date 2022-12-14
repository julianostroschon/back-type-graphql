/* eslint-disable @typescript-eslint/no-misused-promises */
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

const fireListeners = async (
  err: Error | null,
  signal: string
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Promise<undefined[]> => {
  return (await Promise.all(
    listeners.map(fn => fn(err, signal))
  )) as undefined[];
};

const handler = async (err: Error | null, signal: string): Promise<never> => {
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
    // eslint-disable-next-line no-process-exit
    process.exit(localError || err ? INTERNAL_ERROR : SUCCESS_EXIT_CODE);
  }
};

process.on('beforeExit', async () => await handler(null, 'beforeExit'));
process.on('exit', async () => await handler(null, 'exit'));
process.on(
  'uncaughtException',
  async err => await handler(err, 'uncaughtException')
);
process.on('SIGINT', async () => await handler(null, 'SIGINT'));
process.on('SIGQUIT', async () => await handler(null, 'SIGQUIT'));
process.on('SIGTERM', async () => await handler(null, 'SIGTERM'));
