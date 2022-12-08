import { buildTypeDefs } from './buildTypeDefs';
import { buildResolvers } from './buildResolvers';
import { createContext } from '../infra/context';
import { buildSchema } from 'type-graphql';
import path from 'path';

/**
 * It takes a schema location and resolvers, and returns a schema
 * @param {string} schemaLocation - This is the location where the schema will be saved.
 * @param {any} resolvers - This is the resolvers object that we created earlier.
 * @returns A promise that resolves to a GraphQLSchema object.
 */
async function loadSchema(schemaLocation: string, resolvers: any) {
  const emitSchemaFile = path.resolve(__dirname, schemaLocation);
  return buildSchema({ resolvers, emitSchemaFile });
}

/**
 * It creates a GraphQL server with a schema, context, and type definitions
 * @param {string} [schemaLocation=./schema/schema.graphql] - The location of the schema file.
 * @returns An object with the following properties:
 *   schema: The GraphQL schema
 *   context: The context object
 *   typeDefs: The type definitions
 */
export async function createConfigServer(schemaLocation: string = './schema/typeDefs.graphql') {
  const [schema, context, typeDefs] = await Promise.all([
    await loadSchema(schemaLocation, await buildResolvers()),
    await createContext(),
    await buildTypeDefs()
  ]);
  return {
    typeDefs,
    context,
    schema
  };
}
