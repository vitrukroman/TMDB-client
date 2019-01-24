import gql from "graphql-tag";

export default gql`
  query GetMovie ($id: Int!) {
    movie (id: $id) {
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
    }
    configuration {
      images {
        base_url,
        poster_sizes
      }
    }
}
`;
