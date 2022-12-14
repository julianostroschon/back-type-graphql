import { Knex } from 'knex';
import { USERS } from '../../../support/constants';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(USERS, function (table) {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(USERS);
}
