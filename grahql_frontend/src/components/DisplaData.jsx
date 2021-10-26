import { useQuery, gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
const QUERY_ALL_USERS = gql`
  query getAllUsers {
    Users {
      id
      username
      name
      nationality
      friends {
        name
        age
      }
    }
  }
`;
const QUERY_ALL_MOVIES = gql`
  query getAllMovies {
    Movies {
      name
    }
  }
`;
const GET_MOVIE_BY_NAME = gql`
  query getMovieByName($name: String!) {
    Movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;
const DisplaData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const {
    data: movies,
    loading: movieLoading,
    error: movieErrors,
  } = useQuery(QUERY_ALL_MOVIES);
  const [FetchMovieByName, { data: searchedMovie, error: searchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);
  console.log(data);
  if (loading || movieLoading) return "Loading ... ";
  if (error || movieErrors || searchError) {
    console.log(searchError);
  }

  return (
    <div>
      <h1>LIST OF USER</h1>
      {data &&
        data.Users.map((user) => {
          return <div>{user.name}</div>;
        })}
      <h1>LIST OF Movies</h1>
      {data &&
        movies.Movies.map((movie) => {
          return <div>{movie.name}</div>;
        })}
      <div>
        <input
          type="text"
          placeholder="Movie name here"
          onChange={(e) => setMovieSearched(e.target.value)}
        ></input>
        <button
          onClick={async () => {
            await FetchMovieByName({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch Data
        </button>
        {searchedMovie && (
          <h3>
            {searchedMovie.Movie.name} -{searchedMovie.Movie.yearOfPublication}
          </h3>
        )}
      </div>
      {searchError && <div>Movie searched Error</div>}
    </div>
  );
};

export default DisplaData;
