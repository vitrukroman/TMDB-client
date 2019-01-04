import React from "react";
import Query from "react-apollo/Query";
import { gql } from "apollo-boost";


const query = gql`
{
    movie (id: 426426) {
        id
        original_title
        adult
        status
        genres {
            id
            name
        }
        budget
        homepage
        imdb_id
        original_language
        overview
        popularity
        keywords {
            id
            name
        }
        similarMovies {
            id
            title
        }
    }
}
`;
export default () => {

  return <Query
    query={query}
  >
    {(loading: boolean, error, data) => {
      if (loading) {
        return <p>Loading...</p>
      }

      if (error) {
        return <p>Error</p>
      }

      return <div>
        The movie
        {data}
      </div>
    }}
  </Query>;
};
