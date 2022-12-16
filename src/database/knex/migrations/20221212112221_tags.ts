import { Knex } from 'knex';
import { TAGS } from '../../../support/constants';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(TAGS, function (table) {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(TAGS);
}
