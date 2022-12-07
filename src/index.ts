import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { pingResolver } from './schema/resolvers/ping';
import { userResolver } from './schema/resolvers/user';

import { getPort } from './helpers';

const PORT = getPort();

async function runServer() {
  const schema = await buildSchema({
    resolvers: [pingResolver, userResolver]
  });
  const user = { name: 'Juliano', password: 'senhazinha' };

  const server = new ApolloServer({ schema, context: user });

  const { url } = await server.listen(PORT);
  console.log(`Server is running at: => ${url}`);
}

runServer();
