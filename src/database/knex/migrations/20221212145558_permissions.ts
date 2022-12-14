import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('permissions', function (table) {
    table.increments('id').primary().unsigned();
    table.string('description').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('permissions');
}
