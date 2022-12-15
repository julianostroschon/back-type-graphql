import { Knex } from 'knex';

const builders = {};

function buildDataloaders(conn: Knex): any {
  return new Proxy(
    {},
    {
      get(target, prop) {
        const old = target[prop];

        if (old) {
          return old;
        }

        target[prop] = builders[prop](conn);

        return target[prop];
      },
    }
  );
}

module.exports = { buildDataloaders };
