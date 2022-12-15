import 'reflect-metadata';
import { Logger } from 'pino';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';

import path from 'path';

import { buildContext } from './../server/context';
import { buildTypeDefs } from './buildTypeDefs';
import { buildResolvers } from './buildResolvers';
import { TypeResolvers } from './types';
import { isDevelopment } from '../support/utils';

interface IBuildServer {
  listen: (port: string | number) => Promise<{ url: string }>;
  stop: () => Promise<void>;
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

export async function buildServer(args: {
  logger: Logger;
}): Promise<IBuildServer> {
  const resolvers = await buildResolvers();

  const [schema, typeDefs] = await Promise.all([
    loadSchema('../schema/typeDefs.graphql', resolvers),
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

  return {
    async listen(port) {
      const { url } = await server.listen({ port, signal: controller.signal });

      return {
        url: `${url}graphql`,
      };
    },
    async stop() {
      controller.abort();
      return await server.stop();
    },
  };
}
