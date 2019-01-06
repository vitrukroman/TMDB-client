import React from "react";
import Query from "react-apollo/Query";
import getMovie from "../graphql/queries/getMovie";
import { GetMovie } from "../graphql/types/getMovie";

class GetMovieQuery extends Query<GetMovie> {}

export default () => {
  return <GetMovieQuery
    query={getMovie}
  >
    {(result) => {
      if (result.loading) {
        return <span>loading...</span>;
      }

      if (result.error) {
        return <span>error...</span>;
      }

      return <span>{JSON.stringify(result.data!.movie, null, 2)}</span>;
    }}
  </GetMovieQuery>;
};
