require('dotenv/config');

export function getConfig(configName: string, fallback: string): string {
  return process.env[configName] ?? fallback;
}
