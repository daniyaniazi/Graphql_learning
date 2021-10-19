const { UserList } = require("../fakeData");
const _ = require("lodash");
const resolvers = {
  // contain all of the resolvers function
  Query: {
    // sub queries resolver function
    Users: () => {
      // api call to db
      return UserList;
    },
    User: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, {
        id: Number(id),
      });
      return user;
    },
  },
};

module.exports = {
  resolvers,
};
