import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('user_permissions', function (table) {
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('permission_id').unsigned();
    table
      .foreign('permission_id')
      .references('permissions.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
    table.timestamp('deleted_at').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('user_permissions');
}
