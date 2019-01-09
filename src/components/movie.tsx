import Chip from "@material-ui/core/Chip/Chip";
import Typography from "@material-ui/core/Typography/Typography";
import numeral from "numeral";
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

      const genreChips = movie.genres.map((genre) => {
        return <Chip label={genre.name} key={genre.id}/>;
      });

      const productionCountries = movie.production_countries.map((productionCountry) => {
        return <Chip label={productionCountry.name} key={productionCountry.iso_3166_1}/>;
      });
      return <section>
        <header>
          <Typography variant="h1">{movie.title}</Typography>
          <Typography variant="caption">{movie.tagline}</Typography>
        </header>
        <main>
          <Typography>Budget: {numeral(movie.budget).format("$0,0")}</Typography>
          <Typography>Revenue: {numeral(movie.revenue).format("$0,0")}</Typography>
          <Typography>Genres: </Typography>{genreChips}
          <Typography>{movie.overview}</Typography>
          <Typography>Popularity: {movie.popularity}</Typography>
          <Typography>Production countries: </Typography>{productionCountries}
          <Typography>Vote average: {movie.vote_average}</Typography>
          <Typography>Vote count: {movie.vote_count}</Typography>

        </main>
      </section>;
    }}
  </GetMovieQuery>;
};
