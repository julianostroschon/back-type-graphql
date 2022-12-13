import 'reflect-metadata';
import './env';
import { buildServer } from './server';
import logger from './support/logger/service';

buildServer({ logger })
  .then(async server => {
    return await server.listen(process.env.PORT ?? 4000);
  })
  .then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`);
    return null;
  })
  .catch((err: Error) => {
    logger.error(
      { errorData: err },
      `❌ Ocurred an error in server start ${err.message}`
    );
  });
