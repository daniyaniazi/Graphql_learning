import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
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

const CREATE_USER_MUTATION = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
    }
  }
`;

const DisplaData = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    username: "",
    nationality: "",
  });
  const [movieSearched, setMovieSearched] = useState("");
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const {
    data: movies,
    loading: movieLoading,
    error: movieErrors,
  } = useQuery(QUERY_ALL_MOVIES);
  const [FetchMovieByName, { data: searchedMovie, error: searchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  if (loading || movieLoading) return "Loading ... ";
  if (error || movieErrors || searchError) {
    console.log(searchError);
  }
  const handleChange = (e) => {
    console.log(user);
    console.log(e.target.name, e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="section">
        <div>
          <h1>LIST OF USER</h1>
          {data &&
            data.Users.map((user) => {
              return <div>{user.name}</div>;
            })}
        </div>
        <div>
          <h1>CREATE USER</h1>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="age"
            name="age"
            onChange={handleChange}
          />
          <select
            name="nationality"
            value={user.nationality}
            onChange={handleChange}
          >
            <option value="BRAZIL">BRAZIL</option>
            <option value="CANADA">CANADA</option>
            <option value="INDIA">INDIA</option>
            <option value="GERMANY">GERMANY</option>
            <option value="CHILE">CHILE</option>
          </select>
          <br />
          <button
            onClick={async () => {
              await createUser({
                variables: {
                  input: {
                    name: user.name,
                    username: user.username,
                    age: Number(user.age),
                    nationality: user.nationality,
                  },
                },
              });
              refetch();
            }}
          >
            Create User
          </button>
        </div>
      </div>
      <div className="section">
        <div>
          <h1>LIST OF Movies</h1>
          {data &&
            movies.Movies.map((movie) => {
              return <div>{movie.name}</div>;
            })}
        </div>
      </div>
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
        {searchError && <div>Movie searched Error</div>}
      </div>
    </div>
  );
};

export default DisplaData;
