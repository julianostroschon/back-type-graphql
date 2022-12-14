// eslint-disable-next-line node/no-unpublished-import
import { ExpressContext } from 'apollo-server-express';
import { Logger } from 'pino';
import hyperid from 'hyperid';
import { Context } from './../../contracts';
import { buildConnector } from './database';

type IContext = (ctx: ExpressContext) => Context;

interface IContextFactory {
  logger: Logger;
  controller: AbortController;
}

export function buildContext(args: IContextFactory): IContext {
  return function init(ctx: ExpressContext) {
    const instance = hyperid();

    const logger = args.logger.child({
      traceID: instance(),
      // origin: ctx.req.headers,
    });

    const loadDb = buildConnector(logger, args.controller);

    return {
      database: loadDb.getKnex('postgres'),
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
