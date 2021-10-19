const { UserList } = require("../fakeData");
const resolvers = {
  // contain all of the resolvers function
  Query: {
    // sub queries resolver function
    Users() {
      // api call to db
      return UserList;
    },
  },
};

module.exports = {
  resolvers,
};
