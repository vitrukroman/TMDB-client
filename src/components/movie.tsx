import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import Query from "react-apollo/Query";
import getMovie from "../graphql/queries/getMovie";
import { GetMovie } from "../graphql/types/getMovie";

class GetMovieQuery extends Query<GetMovie> {}

interface IComponentProps {
  id: string;
}

export default (props: IComponentProps) => {
  return <GetMovieQuery
    query={getMovie}
    variables={{
      id: Number(props.id),
    }}
  >
    {(result) => {
      if (result.loading) {
        return <span>loading...</span>;
      }

      if (result.error) {
        return <span>error...</span>;
      }

      if (!result.data || !result.data.movie) {
        return <span>movie not found</span>;
      }

      const movie = result.data.movie;
      return <section>
        <header>
          <Typography variant="h1">{movie.original_title}</Typography>
        </header>
      </section>;
    }}
  </GetMovieQuery>;
};
