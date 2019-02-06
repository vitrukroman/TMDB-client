import Query from "react-apollo/Query";
import gql from "graphql-tag";


const similarMoviesQuery = gql`
  query SimilarMovies($id: Int!, language: Language!) {
    similarMovies(id: $id, language: $language) {
      title
      release_date
  		popularity
      vote_average
      poster_path
    }
  }
`

class SimilarMovies extends Query {}

const SimilarMovies = (props) => {
  return <div
}