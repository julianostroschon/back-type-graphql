import { Knex } from 'knex';
import { Logger } from 'pino';
import { connectKnex } from './../../infra/database';

interface IBuildConnector {
  getKnex: (datasource: string) => Knex;
}

export function buildConnector(
  logger: Logger,
  controller?: AbortController
): IBuildConnector {
  const cacheKnex = new Map<string, Knex>();

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (controller) {
    controller.signal.addEventListener('abort', () => {
      for (const [datasource, conn] of cacheKnex) {
        void conn
          .destroy()
          // eslint-disable-next-line promise/always-return
          .then(() => {
            logger.debug(`Connection ${datasource} destroyed [knex]`);
          });

        cacheKnex.delete(datasource);
      }

      logger.debug('Request aborted');
    });
  }

  return {
    getKnex(datasource): Knex {
      if (!cacheKnex.has(datasource)) {
        cacheKnex.set(datasource, connectKnex(datasource, logger));
      }

      logger.debug(`Connection ${datasource} retrieved from cache [knex]`);

      return cacheKnex.get(datasource) as Knex;
    },
  };
}
