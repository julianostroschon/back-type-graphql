import { Knex } from 'knex';
import { DefaultObject } from '../contracts/general';

export async function applyInsert<InsertType, ReturnType>(
  database: Knex,
  table: string,
  data: InsertType,
  returning: string[] = ['*']
): Promise<ReturnType[]> {
  return (await database(table)
    .insert(data)
    .returning(returning)) as ReturnType[];
}

export async function applyUpdate<UpdateType, ReturnType>(
  database: Knex,
  table: string,
  data: UpdateType,
  where: {},
  returning: string[] = ['*']
): Promise<ReturnType[]> {
  console.log(where);
  return (await database(table)
    .where(where)
    .update(data, returning)) as ReturnType[];
}

export async function applyDelete(
  database: Knex,
  table: string,
  id: string
): Promise<boolean> {
  return await database(table).where({ id }).delete();
}

export async function findOne<ReturnType>(
  database: Knex,
  table: string,
  id: string
): Promise<ReturnType | undefined> {
  return database(table).where({ id }).first() as ReturnType | undefined;
}

export async function findAll<ReturnType>(
  database: Knex,
  table: string
): Promise<ReturnType[]> {
  return database(table);
}
