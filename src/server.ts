import express from "express"
import { ApolloServer } from "apollo-server-express"

const PORT = process.env.GRAPHQL_PORT || 4001

const app = express();

const typeDefs = `
    type Query{
        ping: String!
    }
`;
const resolvers = {
    Query: {
        ping: () => `Pong`,
    },
};
let apolloServer: any = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.get("/rest", function (req: any, res: any) {
  console.log(req)
    res.json({ data: "api working" });
});

app.listen(PORT, function (url: any) {
    console.log(`server running on port ${PORT}`);
    console.log(url);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});