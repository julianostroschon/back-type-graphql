/* eslint-disable node/no-missing-require */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable @typescript-eslint/no-var-requires */
require('ts-node').register();
const path = require('node:path');
const { getKnexConfig } = require('./src/infra/database/config');

/**
 *
 * @param {string} dest - destination path
 * @returns
 */
function absolute(dest) {
  return path.join(__dirname, dest);
}

module.exports = () => {
  const dbname = process.env.DB_NAME ?? 'postgres';

  const extra = {
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: absolute('./src/database/knex/migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: absolute('./src/database/knex/seeds'),
    },
  };

  return getKnexConfig(dbname, extra);
};
