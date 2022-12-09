import { UserInput } from 'Entities/UserInput';
import { Knex } from 'knex';
import { DefaultObject } from '../contracts/general';

export async function applyInsert(
  database: Knex,
  table: string,
  data: DefaultObject | UserInput,
  returning: string[]
): Promise<Array<DefaultObject>> {
  return database(table).insert(data, returning);
}

export async function applyUpdate(
  database: Knex,
  table: string,
  where: DefaultObject,
  data: DefaultObject | Array<string>,
  returning: string[]
): Promise<DefaultObject> {
  return database(table).where(where).update(data, returning);
}

export async function applyDelete(
  database: Knex,
  table: string,
  where: DefaultObject
): Promise<boolean> {
  return database(table).where(where).delete();
}

export async function findOne(
  database: Knex,
  table: string,
  select = ['*'],
  where: DefaultObject
): Promise<DefaultObject> {
  return database(table).select(select).where(where).first();
}

export async function findAll(
  database: Knex,
  table: string,
  select: string[],
  where: DefaultObject
): Promise<DefaultObject> {
  return database(table).where(where).select(select);
}
