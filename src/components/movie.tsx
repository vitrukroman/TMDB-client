import { gql } from "apollo-boost";
import React from "react";
import Query from "react-apollo/Query";

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
    {((loading: boolean, error: any, data: any) => {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error</p>;
      }

      return <div>
        The movie
        {data}
      </div>;
    }) as any}
  </Query>;
};
