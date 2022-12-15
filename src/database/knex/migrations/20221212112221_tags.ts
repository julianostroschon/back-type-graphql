import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('tags', function (table) {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('tags');
}
