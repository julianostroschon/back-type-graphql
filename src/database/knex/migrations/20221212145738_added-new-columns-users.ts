import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('users', function (table) {
    table.boolean('status').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('users', function (table) {
    table.dropColumn('status');
  });
}
