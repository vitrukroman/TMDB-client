import { gql } from "apollo-boost";

export default gql`
  query GetMovie ($id: Int!) {
    movie (id: $id) {
        id
        original_title
        title
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
        production_countries {
          iso_3166_1
          name
        }
        vote_average
        vote_count
        revenue
        tagline
    }
}
`;
