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

import { buildTypeDefs } from './buildTypeDefs';
import { buildResolvers } from './buildResolvers';
import { createContext } from '../infra/context';
import { TypeResolvers } from './types';
import { isDevelopment } from '../support/utils';

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

interface IParamsBuildServer {
  logger: Logger;
}

interface IBuildServer {
  listen: (port: string | number) => Promise<{ url: string }>;
  stop: () => Promise<void>;
}

export async function buildServer(
  params: IParamsBuildServer
): Promise<IBuildServer> {
  const resolvers = await buildResolvers();

  const [schema, typeDefs] = await Promise.all([
    loadSchema('./schema/typeDefs.graphql', resolvers),
    buildTypeDefs(),
  ]);

  const server = new ApolloServer({
    typeDefs,
    schema,
    context: createContext(),
    plugins: [
      isDevelopment()
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginLandingPageDisabled(),
    ],
  });

  const controller = new AbortController();

  return {
    async listen(port) {
      await server.listen({ port, signal: controller.signal });

      return {
        url: `http://0.0.0.0:${port}/graphql`,
      };
    },
    async stop() {
      controller.abort();
      return await server.stop();
    },
  };
}
