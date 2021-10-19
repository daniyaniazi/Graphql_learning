const { UserList, MovieList } = require("../fakeData");
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
    // MOVIE RESOLVERS
    Movies: () => {
      // api call to db
      return MovieList;
    },
    Movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, {
        name: name,
      });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 200 && movie.yearOfPublication <= 2010
      );
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastID = UserList[UserList.length - 1].id;
      console.log(user);
      user.id = lastID + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = {
  resolvers,
};
