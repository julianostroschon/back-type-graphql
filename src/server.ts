import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

const PORT: number = 4004

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  context: ({req}) => {
    return {
      headers: req,
    }
  }
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, (): void =>
  console.log(`🚀\nGraphQL is now running on http://localhost:${PORT}/graphql`)
);
