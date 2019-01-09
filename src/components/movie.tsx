import Chip from "@material-ui/core/Chip/Chip";
import { green, red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import FaceIcon from "@material-ui/icons/Face";
import numeral from "numeral";
import React from "react";
import Query from "react-apollo/Query";
import getMovie from "../graphql/queries/getMovie";
import { GetMovie } from "../graphql/types/getMovie";
import Actor from "../models/actor";

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

      const cast = <Grid container justify="flex-start">{movie.cast.slice(0, 10).sort((person1, person2) => {
        return person1.order < person2.order ? -1 : person1.order > person2.order ? 1 : 0;
      }).map((person) => {
        const actor = new Actor(person);
        let color: "primary" | "secondary" = "primary";

        if (actor.isFemale) {
          color = "secondary";
        }

        return <Chip label={actor.name} icon={<FaceIcon/>} color={color} variant="outlined"/>;
      })}</Grid>;

      const budgetRevenueDifference = movie.revenue - movie.budget;
      const budgetRevenueSign = budgetRevenueDifference > 0 ? "+" : "-";

      return <section style={{
        padding: 8,
      }}>
        <header>
          <Typography variant="h1">{movie.title}</Typography>
          <Typography variant="subtitle1">{movie.tagline}</Typography>
        </header>
        <main>
          <Typography>Budget: {numeral(movie.budget).format("$0,0")}</Typography>
          <div>
            <Typography style={{
              display: "inline",
            }}>Revenue: {numeral(movie.revenue).format("$0,0")} </Typography>
            <Typography style={{
              display: "inline",
              ...(budgetRevenueDifference > 0 && {
                color: green[400],
              }),
              ...(budgetRevenueDifference <= 0 && {
                color: red[400],
              }),
            }}>
              ({budgetRevenueSign}{numeral(budgetRevenueDifference).format("$0,0")})
            </Typography>
          </div>
          <Typography style={{
            display: "",
          }}>Genres: </Typography>{genreChips}
          <Typography>Cast: </Typography>{cast}
          <Typography>{movie.overview}</Typography>
          <Typography>Production countries: </Typography>{productionCountries}
          <Typography>Vote average: {movie.vote_average}</Typography>
          <Typography>Vote count: {movie.vote_count}</Typography>

        </main>
      </section>;
    }}
  </GetMovieQuery>;
};
