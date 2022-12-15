/* eslint-disable @typescript-eslint/unbound-method */
import { Knex } from 'knex';
import { Logger } from 'pino';
import { UserResolver } from '../../../src/resolvers/user';

describe('Resolver getUser', () => {
  describe('SUCESSO', () => {
    test('Deve retornar usuário com o id 3 `pong`', async () => {
      const { getUser } = new UserResolver();

      const RESULT = { id: '3', name: 'Jesualdo', email: 'arrobinha@dosguri' };

      const query = Object.assign(Promise.resolve(RESULT), {
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnThis(),
      });

      const database = jest.fn(() => query);

      const logger = {
        warn: jest.fn(),
      };

      const user = {
        id: '323',
        name: 'Juliano',
        email: 'arrobinha',
        password: '123456',
      };

      const ctx = {
        database: database as unknown as Knex,
        logger: logger as unknown as Logger,
        user,
      };

      const id = '3';

      await expect(getUser({}, id, ctx)).resolves.toEqual({
        id: '3',
        name: 'Jesualdo',
        email: 'arrobinha@dosguri',
      });

      expect(database).toHaveBeenCalledTimes(1);
      expect(database).toHaveBeenCalledWith('users');

      expect(query.where).toHaveBeenCalledTimes(1);
      expect(query.where).toHaveBeenCalledWith({ id: '3' });

      expect(query.first).toHaveBeenCalledTimes(1);
      expect(query.first).toHaveBeenCalledWith();
    });
  });

  describe('ERRO', () => {
    test('Deve retornar erro ao tentar buscar usuário com id 999', async () => {
      const { getUser } = new UserResolver();

      const RESULT = undefined;

      const query = Object.assign(Promise.resolve(RESULT), {
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnThis(),
      });

      const database = jest.fn(() => query);

      const logger = {
        warn: jest.fn(),
      };

      const user = {
        id: '323',
        name: 'Juliano',
        email: 'arrobinha',
        password: '123456',
      };

      const ctx = {
        database: database as unknown as Knex,
        logger: logger as unknown as Logger,
        user,
      };

      const id = '3';

      await expect(getUser({}, id, ctx)).rejects.toThrow('invalid user');

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith('User with id 3 not found');
    });
  });
});
