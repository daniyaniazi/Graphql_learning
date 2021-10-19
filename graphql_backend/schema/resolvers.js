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
};

module.exports = {
  resolvers,
};
