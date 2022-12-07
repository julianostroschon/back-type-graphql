import 'reflect-metadata';

import { pingResolver } from './schema/resolvers/ping';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { getPort } from './helpers';

const PORT = getPort();

async function runServer() {
  const schema = await buildSchema({
    resolvers: [pingResolver]
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(PORT);
  console.log(`Server is running at: => ${url}`);
}

runServer();
