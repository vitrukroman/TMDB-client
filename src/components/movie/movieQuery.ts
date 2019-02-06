import gql from "graphql-tag";
import Query from "react-apollo/Query";
import { GetMovie, GetMovieVariables } from "../../graphql/types/GetMovie";

export const movieQuery = gql`
  query GetMovie ($id: Int!, $language: Language!) {
    movie (id: $id, language: $language) {
        id
        original_title
        title
        genres {
            id
            name
        }
        budget
        imdb_id
        overview
        keywords {
            id
            name
        }
        similarMovies {
            id
            title
        }
        production_countries {
          iso_3166_1
          name
        }
        vote_average
        vote_count
        revenue
        tagline
        poster_path
        cast {
          name
          order
          character
          gender
        }
        images {
          backdrops {
            aspect_ratio
            file_path
            height
            width
          }
          posters {
            aspect_ratio
            file_path
            height
            width
          }
        }
    }
    configuration {
      images {
        base_url,
        poster_sizes
      }
    }
}
`;

export class MovieQuery extends Query<GetMovie, GetMovieVariables> {}
