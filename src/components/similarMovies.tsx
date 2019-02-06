import Query from "react-apollo/Query";
import gql from "graphql-tag";
import React from "react"
import Typography from "@material-ui/core/Typography/Typography";

const similarMoviesQuery = gql`
  query SimilarMovies($id: Int!, $language: Language!) {
    similarMovies(id: $id, language: $language) {
      title
      release_date
  		popularity
      vote_average
      poster_path
    }
  }
`;

class SimilarMoviesQuery extends Query {}

interface IComponentProps {
  id: number;
}

export default (props: IComponentProps) => {
  return <SimilarMoviesQuery
    query={similarMoviesQuery}
  >
    {(result) => {
      if (result.loading) {
        return <Typography>
          loading...
        </Typography>
      }

      return props.id;

    }}
  </SimilarMoviesQuery>
}