import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('publications', function (table) {
    table.increments('id').primary().unsigned();
    table.string('title').notNullable();
    table.string('text').notNullable();
    table.integer('author_id').unsigned();
    table.foreign('author_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('caderno_id').unsigned();
    table.foreign('caderno_id').references('cadernos.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('publications');
}
