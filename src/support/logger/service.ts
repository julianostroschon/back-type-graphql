import { isEmpty } from 'lodash';
import pinoLogger from 'pino';
import { isDevelopment } from '../utils';

const logger = pinoLogger({
  name: 'parti-notes',
  messageKey: 'message',
  level: isDevelopment() ? 'debug' : 'info',
  transport: isDevelopment() ? { target: 'pino-pretty' } : undefined,
  formatters: {
    level: label => {
      return { level: label };
    },
  },
  base: {
    appVersion: isEmpty(process.env.APP_VERSION)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires, node/no-missing-require
        (require('../../../package.json').version as string)
      : process.env.APP_VERSION,
  },
});

export default logger;
