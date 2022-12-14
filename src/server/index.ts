import 'reflect-metadata';
import { Logger } from 'pino';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';

import { EventEmitter } from 'events';
import path from 'path';

import { buildContext } from './../server/context';
import { buildTypeDefs } from './buildTypeDefs';
import { buildResolvers } from './buildResolvers';
import { TypeResolvers } from './types';
import { isDevelopment } from '../support/utils';

import { promisify } from 'util';
const sleep = promisify(setTimeout);

interface IBuildServer {
  listen: (port: string | number) => Promise<{ url: string }>;
  stop: (controller: AbortController, server: ApolloServer) => Promise<void>;
}

async function stop(controller: AbortController, server: ApolloServer) {
  controller.abort();
  return await server.stop();
}

/**
 * It takes a schema location and resolvers, and returns a schema
 * @param {string} schemaLocation - This is the location where the schema will be saved.
 * @param {any} resolvers - This is the resolvers object that we created earlier.
 * @returns A promise that resolves to a GraphQLSchema object.
 */
async function loadSchema(
  schemaLocation: string,
  resolvers: TypeResolvers
): Promise<GraphQLSchema> {
  const emitSchemaFile = path.resolve(__dirname, schemaLocation);

  return await buildSchema({ resolvers, emitSchemaFile });
}

const emitter = new EventEmitter();

export async function buildServer(args: {
  logger: Logger;
}): Promise<IBuildServer> {
  const resolvers = await buildResolvers();

  const [schema, typeDefs] = await Promise.all([
    loadSchema('./schema/typeDefs.graphql', resolvers),
    buildTypeDefs(),
  ]);

  const controller = new AbortController();

  const server = new ApolloServer({
    typeDefs,
    schema,
    context: buildContext({ logger: args.logger, controller }),
    plugins: [
      isDevelopment()
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginLandingPageDisabled(),
    ],
  });

  emitter.on('onStop', async (err, signal) => {
    let localError = null;

    try {
      args.logger.info({ signal });
      args.logger.info('Stopping server...');
      args.logger.flush();

      await Promise.race([stop(controller, server), sleep(6000)]);
    } catch (e) {
      if (e) {
        // eslint-disable-next-line no-console
        args.logger.error({ e, signal });
      }
      localError = e;
    } finally {
      process.exit(localError || err ? 1 : 0);
    }
  });

  return {
    async listen(port) {
      await server.listen({ port, signal: controller.signal });

      return {
        url: `http://0.0.0.0:${port}/graphql`,
      };
    },
    stop,
  };
}

const handler = async (err: Error | null, signal: string) => {
  emitter.emit('onStop', err, signal);
};

process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', err => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));
