import { Context } from '../../contracts';
import { User } from '../../Entities/User';
import { buildDbMock } from '../database';
import logger from '../logger/service';

interface BaseMock {
  ctx: Context;
  queries: any;
}
function createCtxUser(toBeUSer: User | undefined): User {
  if (!toBeUSer) {
    return {
      id: '1',
      name: 'Joãozinho testadô',
      email: 'jestMakerGalaxysDik@bol.as',
    };
  }
  return toBeUSer;
}

export function buildCtxMock(
  value: any,
  userToInjectInCtx?: User | undefined
): BaseMock {
  const { database, queries } = buildDbMock(value);

  const ctx = {
    database,
    logger,
    user: createCtxUser(userToInjectInCtx),
  };

  return { ctx, queries };
}
