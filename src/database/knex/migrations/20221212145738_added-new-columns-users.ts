import { Knex } from 'knex';
import { USERS } from '../../../support/constants';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable(USERS, function (table) {
    table.boolean('status').notNullable();
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable(USERS, function (table) {
    table.dropColumn('status');
  });
}
