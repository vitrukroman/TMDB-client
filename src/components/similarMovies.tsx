import Typography from "@material-ui/core/Typography/Typography";
import { capitalize } from "@material-ui/core/utils/helpers";
import gql from "graphql-tag";
import React from "react";
import Query from "react-apollo/Query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Language } from "../graphql/types/globalTypes";
import { SimilarMovies, SimilarMoviesVariables } from "../graphql/types/SimilarMovies";
import Movie from "../models/movie";
import RatingBadge from "./ratingBadge";

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
      vote_count
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
  const [t] = useTranslation();

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
          {capitalize(t("similar movies"))}:
        </Typography>
        <div style={{
          display: "flex",
          overflow: "scroll",
        }}>
          {result.data!.similarMovies.map((mov) => {
            const movie = new Movie(mov);
            const src = [
              result.data!.configuration.images.base_url,
              "w92",
              movie.poster_path,
            ].join("");
            return <div key={movie.id} style={{
              margin: "8px 8px 0 0",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
              }}>
                <RatingBadge movie={movie}/>
              </div>
              <Link to={`/movie/${movie.id}`} style={{
                textDecoration: "none",
              }}>
                <img src={src}/>
                <Typography>
                  {movie.title} ({movie.releaseYear})
                </Typography>
              </Link>
            </div>;
          })}
        </div>
      </div>;
    }}
  </SimilarMoviesQuery>;
};
