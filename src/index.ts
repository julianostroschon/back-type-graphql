import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import { createConfigServer } from './server/config';
import { getPort } from './helpers';

const PORT = getPort();

/**
 * We create a new ApolloServer instance, passing in the result of calling createConfigServer() as the
 * configuration object
 */
async function runServer() {
  const server = new ApolloServer(await createConfigServer());

  const { url } = await server.listen(PORT);
  console.log(`🚀\nServer ready at ${url}`);
}

runServer();
