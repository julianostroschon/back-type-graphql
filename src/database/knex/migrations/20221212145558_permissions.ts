import { Knex } from 'knex';
import { PERMISSIONS } from '../../../support/constants';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(PERMISSIONS, function (table) {
    table.increments('id').primary().unsigned();
    table.string('description').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(PERMISSIONS);
}
