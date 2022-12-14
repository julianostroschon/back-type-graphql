import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('notebook', function (table) {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('notebook');
}
