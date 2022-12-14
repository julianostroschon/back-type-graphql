import 'reflect-metadata';
import './env';
import { buildServer } from './server';
import logger from './support/logger/service';
import { onStop } from './support/signal';

buildServer({ logger })
  .then(async server => {
    onStop(async (err, signal) => {
      logger.fatal(
        {
          err,
        },
        `🔥 Server stopped by ${signal} signal`
      );

      logger.flush();

      await server.stop();
    });

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
