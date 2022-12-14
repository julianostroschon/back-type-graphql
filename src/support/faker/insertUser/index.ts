import { faker } from '@faker-js/faker/locale/pt_BR';
import { database } from '../../../infra/database/index';
import { hashPassword } from '../../../server/resolvers/domains/user';
import { passwordUser } from '../../../support/constants/index';
import { applyInsert } from '../../../helpers';
import { User } from '../../../Entities/User';

export function createRandomUser(): User {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashPassword(passwordUser),
    status: true
  };
}
export function insertRandomUsers(quantity: number = 40): void {
  Array.from({ length: quantity }).forEach(async () => {
    await applyInsert(database, 'users', createRandomUser(), ['*']);
  });
}
