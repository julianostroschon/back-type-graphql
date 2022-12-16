import { Context, UserCtx } from '../../src/contracts';
import { buildDbMock } from '../../src/support/database';
import logger from '../../src/support/logger/service';

interface BaseMock {
  ctx: Context;
  queries: any;
}
function createCtxUser(toBeUSer: UserCtx | undefined): UserCtx {
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
  userToInjectInCtx?: UserCtx | undefined
): BaseMock {
  const { database, queries } = buildDbMock(value);

  const ctx = {
    database,
    logger,
    user: createCtxUser(userToInjectInCtx),
  };

  return { ctx, queries };
}
