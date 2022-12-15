import { Knex } from 'knex';
import { NOTES, NOTEBOOKS, USERS } from '../../../support/constants';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(NOTES, function (table) {
    table.increments('id').primary().unsigned();
    table.string('title').notNullable();
    table.string('text').notNullable();
    table.integer('author_id').unsigned();
    table
      .foreign('author_id')
      .references(USERS + '.id')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
    table.integer('caderno_id').unsigned();
    table
      .foreign('caderno_id')
      .references(NOTEBOOKS + '.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(NOTES);
}
