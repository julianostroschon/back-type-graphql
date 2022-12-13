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
  return (await database(table)
    .where(where)
    .update(data, returning)) as ReturnType[];
}

export async function applyDelete(
  database: Knex,
  table: string,
  where: DefaultObject
): Promise<boolean> {
  return await database(table).where(where).delete();
}

export async function findOne<ReturnType>(
  database: Knex,
  table: string,
  select: string[],
  where: DefaultObject
): Promise<ReturnType | undefined> {
  return (await database(table).select(select).where(where).first()) as
    | ReturnType
    | undefined;
}

export async function findAll(
  database: Knex,
  table: string,
  select: string[] = ['*'],
  where: DefaultObject
): Promise<DefaultObject[]> {
  return await database(table).where(where).select(select);
}
