import { promisify } from 'util';

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export const sleep = promisify(setTimeout);
