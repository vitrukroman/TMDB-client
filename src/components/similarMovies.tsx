import Typography from "@material-ui/core/Typography/Typography";
import gql from "graphql-tag";
import React from "react";
import Query from "react-apollo/Query";
import { Language } from "../graphql/types/globalTypes";
import { SimilarMovies, SimilarMoviesVariables } from "../graphql/types/SimilarMovies";

const similarMoviesQuery = gql`
  query SimilarMovies($id: Int!, $language: Language!) {
    configuration {
      images {
        base_url
      }
    }
    similarMovies(id: $id, language: $language) {
      id
      title
      release_date
  		popularity
      vote_average
      poster_path
    }
  }
`;

class SimilarMoviesQuery extends Query<SimilarMovies, SimilarMoviesVariables> {}

interface IComponentProps {
  id: number;
  language: Language;
}

export default (props: IComponentProps) => {
  return <SimilarMoviesQuery
    query={similarMoviesQuery}
    variables={{
      id: props.id,
      language: props.language,
    }}
  >
    {(result) => {
      if (result.loading) {
        return <Typography>
          loading...
        </Typography>;
      }

      if (result.error) {
        return <Typography>
          error...
        </Typography>;
      }
      return <div>
        <Typography>
        </Typography>
        <div style={{
          display: "flex",
          overflow: "scroll",
        }}>
          {result.data!.similarMovies.map((movie) => {
            const src = [
              result.data!.configuration.images.base_url,
              "w92",
              movie.poster_path,
            ].join("");
            return <div key={movie.id} style={{
              margin: "8px 8px 0 0",
            }}>
              <img src={src}/>
              <Typography>
                {movie.title}
              </Typography>
            </div>;
          })}
        </div>
      </div>;
    }}
  </SimilarMoviesQuery>;
};
