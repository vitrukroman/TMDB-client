import gql from "graphql-tag";
import Query from "react-apollo/Query";
import { Movie, MovieVariables } from "../../graphql/types/Movie";

export const movieQuery = gql`
  query Movie ($id: Int!, $language: Language!) {
    movie (id: $id, language: $language){
        id
        original_title
        title
        lang @client {
          value
        }
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
    }
    configuration {
      images {
        base_url,
        poster_sizes
      }
    }
}
`;

export class MovieQuery extends Query<Movie, MovieVariables> {}
