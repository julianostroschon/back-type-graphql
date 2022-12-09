import { Knex } from 'knex';

/**
 * Function that inserts into a table in the database
 * @param {Knex} database
 * @param {string} table
 * @param {any} data:{data:any}
 * @returns {any}
 */
export function applyInsert(database: Knex, table: string, data: { data: any }) {
  return database(table).insert(data);
}

/**
 * Function that modifies a table in the database
 * @param {Knex} database
 * @param {string} table
 * @param {string} where
 * @param {any} data:{data:any}
 * @returns {any}
 */
export function applyUpdate(database: Knex, table: string, where: string, data: { data: any }) {
  return database(table).update(data).where(where).returning(table);
}

/**
 * Function that deletes a table in the database
 * @param {Knex} database
 * @param {string} table
 * @param {string} where
 * @returns {any}
 */
export function applyDelete(database: Knex, table: string, where: string) {
  return database(table).where(where).delete();
}
