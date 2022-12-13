import { Knex } from 'knex';

const buildQueryMock = (value: any) => {
  const query = value;
  Object.assign(query, {
    count: jest.fn().mockReturnThis(),
    del: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    join: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    max: jest.fn().mockReturnThis(),
    min: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    returning: jest.fn().mockReturnThis(),
    rightJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    toSQL: jest.fn().mockReturnThis(),
    transaction: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    whereNot: jest.fn().mockReturnThis(),
    whereIn: jest.fn().mockReturnThis(),
    whereNotIn: jest.fn().mockReturnThis(),
    whereNull: jest.fn().mockReturnThis(),
    whereNotNull: jest.fn().mockReturnThis(),
    whereBetween: jest.fn().mockReturnThis(),
    whereNotBetween: jest.fn().mockReturnThis(),
    whereRaw: jest.fn().mockReturnThis(),
  });

  return query;
};

export const buildDbMock = (...values: any[]) => {
  const database = jest.fn();

  const queries = [];
  for (const value of values) {
    const query = buildQueryMock(value);
    queries.push(query);
    database.mockReturnValueOnce(query);
  }
  return { database: database as unknown as Knex, queries };
};
