import { knex, Knex } from 'knex';
import { Logger } from 'pino';
import { getKnexConfig } from './config';

export function connectKnex(database: string, logger: Logger): Knex {
  const extra: Partial<Knex.Config> = {
    pool: {
      afterCreate: (_: Knex, done: () => void) => {
        logger.info(`Connected to ${database} database with knex`);
        done();
      },
    },
  };

  return knex(getKnexConfig(database, extra));
}
