const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// resolver are function that deal with data , insert call to db

server.listen().then(({ url }) => {
  console.log("Your api is running at", url);
});
