import { gql } from "apollo-boost";

export default gql`
  query GetMovie {
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
