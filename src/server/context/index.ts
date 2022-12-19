// eslint-disable-next-line node/no-unpublished-import
import { ExpressContext } from 'apollo-server-express';
import { Logger } from 'pino';
import hyperid from 'hyperid';

import { Context } from './../../contracts';
import { buildConnector } from './database';
import { getToken, loadUser } from './user';

type IContext = (ctx: ExpressContext) => Promise<Context>;
// type IContext = (ctx: ExpressContext) => Context;

interface IContextFactory {
  logger: Logger;
  controller: AbortController;
}

export function buildContext(args: IContextFactory): IContext {
  return async function init(_ctx: ExpressContext) {
    const instance = hyperid();

    const logger = args.logger.child({
      traceID: instance(),
    });

    const loadDb = buildConnector(logger, args.controller).getKnex(
      process.env.DB_NAME ?? 'postgres'
    );

    const token = getToken(_ctx);

    const vuser = token ? await loadUser(logger, loadDb, token) : null;
    console.log(vuser);

    return {
      database: loadDb,
      logger,
      user: {
        id: 'sasas',
        name: 'Juliano',
        password: '',
        email: 'ssaa',
      },
    };
  };
}
